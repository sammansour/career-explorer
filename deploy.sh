#!/bin/bash

# CareerExplorer Deployment Script for OCI Object Storage
# This script builds the React app and deploys it to OCI Object Storage

set -e  # Exit on error

echo "🚀 Starting deployment process..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if required commands exist
command -v npm >/dev/null 2>&1 || { echo -e "${RED}npm is required but not installed. Aborting.${NC}" >&2; exit 1; }
command -v oci >/dev/null 2>&1 || { echo -e "${RED}OCI CLI is required but not installed. Please install it first.${NC}" >&2; exit 1; }

# Get bucket details from Terraform output or environment / defaults
echo -e "${BLUE}📦 Getting deployment configuration...${NC}"

if [ -f "terraform/terraform.tfstate" ]; then
    cd terraform
    NAMESPACE=$(terraform output -raw namespace)
    BUCKET_NAME=$(terraform output -raw bucket_name)
    REGION=$(terraform output -raw region 2>/dev/null || echo "${OCI_REGION:-us-chicago-1}")
    cd ..
else
    echo -e "${BLUE}Terraform state not found. Using environment variables or OCI CLI...${NC}"
    NAMESPACE="${OCI_NAMESPACE:-$(oci os ns get --query data --raw-output 2>/dev/null)}"
    BUCKET_NAME="${OCI_BUCKET_NAME:-career-explorer-prod}"
    REGION="${OCI_REGION:-us-chicago-1}"

    if [ -z "$NAMESPACE" ]; then
        echo -e "${RED}Could not determine namespace. Set OCI_NAMESPACE or run 'terraform apply' first.${NC}"
        exit 1
    fi
fi

echo -e "${GREEN}✓ Namespace: $NAMESPACE${NC}"
echo -e "${GREEN}✓ Bucket: $BUCKET_NAME${NC}"
echo -e "${GREEN}✓ Region: $REGION${NC}"

# Build the React application
echo -e "${BLUE}🔨 Building React application...${NC}"
npm run build

if [ ! -d "dist" ]; then
    echo -e "${RED}Build failed - dist directory not found${NC}"
    exit 1
fi

echo -e "${GREEN}✓ Build completed successfully${NC}"

# Upload to Object Storage
echo -e "${BLUE}☁️  Uploading to OCI Object Storage...${NC}"

# Inject <base> tag so assets load from Object Storage when index.html is served via API Gateway
# Compute bucket base URL from Terraform outputs or construct it
BUCKET_BASE_URL=$(cd terraform && terraform output -raw bucket_url 2>/dev/null || echo "https://objectstorage.${REGION}.oraclecloud.com/n/${NAMESPACE}/b/${BUCKET_NAME}/o")
if [ -n "$BUCKET_BASE_URL" ] && [ -f "dist/index.html" ]; then
  # Ensure trailing slash
  if [[ "$BUCKET_BASE_URL" != */ ]]; then
    BUCKET_BASE_URL="$BUCKET_BASE_URL/"
  fi
  # Insert base tag after <head> if not already present
  if ! grep -q "<base href=\"" dist/index.html; then
    # macOS/BSD sed in-place edit
    sed -i '' "s#<head>#<head>\n    <base href=\"${BUCKET_BASE_URL}\">#" dist/index.html || true
    echo -e "${GREEN}✓ Injected <base> tag pointing to ${BUCKET_BASE_URL}${NC}"
  fi
fi

# Upload all files with correct Content-Type headers
# NOTE: We do NOT use bulk-upload because it sets all Content-Types to
# application/octet-stream, which causes HTML to download instead of render.
echo -e "${BLUE}☁️  Uploading files with correct MIME types...${NC}"

mime_for() {
  case "$1" in
    *.html) echo "text/html" ;;
    *.css) echo "text/css" ;;
    *.js) echo "application/javascript" ;;
    *.mjs) echo "application/javascript" ;;
    *.json) echo "application/json" ;;
    *.svg) echo "image/svg+xml" ;;
    *.png) echo "image/png" ;;
    *.jpg|*.jpeg) echo "image/jpeg" ;;
    *.gif) echo "image/gif" ;;
    *.ico) echo "image/x-icon" ;;
    *.woff) echo "font/woff" ;;
    *.woff2) echo "font/woff2" ;;
    *.ttf) echo "font/ttf" ;;
    *.eot) echo "application/vnd.ms-fontobject" ;;
    *.webp) echo "image/webp" ;;
    *.map) echo "application/json" ;;
    *.txt) echo "text/plain" ;;
    *.xml) echo "application/xml" ;;
    *) echo "application/octet-stream" ;;
  esac
}

UPLOAD_COUNT=0
FAIL_COUNT=0

find dist -type f | while IFS= read -r f; do
  key="${f#dist/}"
  mime=$(mime_for "$f")
  if oci os object put \
    --namespace "$NAMESPACE" \
    --bucket-name "$BUCKET_NAME" \
    --name "$key" \
    --file "$f" \
    --force \
    --content-type "$mime" >/dev/null 2>&1; then
    echo -e "${GREEN}✓ $key  ($mime)${NC}"
  else
    echo -e "${RED}✗ Failed: $key${NC}"
  fi
done

echo -e "${GREEN}✓ All files uploaded with correct Content-Types${NC}"

# Get the website URL
WEBSITE_URL="https://objectstorage.${REGION}.oraclecloud.com/n/${NAMESPACE}/b/${BUCKET_NAME}/o/index.html"

echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}🎉 Deployment Successful!${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "Your website is now available at:"
echo -e "${BLUE}$WEBSITE_URL${NC}"
echo ""
echo -e "Note: If you experience routing issues, you may need to configure"
echo -e "a custom domain with proper routing rules for your SPA."
echo ""

# Optional: Show PAR URL if available
if [ -f "terraform/terraform.tfstate" ]; then
    if cd terraform && terraform output deployment_par_url >/dev/null 2>&1; then
        PAR_URL=$(terraform output -raw deployment_par_url 2>/dev/null)
        if [ -n "$PAR_URL" ]; then
            echo -e "Deployment PAR URL (expires in 30 days):"
            echo -e "${BLUE}$PAR_URL${NC}"
            echo -e "Use this for authenticated uploads if needed."
            echo ""
        fi
    fi
    cd ..
fi
