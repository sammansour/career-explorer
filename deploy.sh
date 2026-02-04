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

# Get bucket details from Terraform output
echo -e "${BLUE}📦 Getting deployment configuration...${NC}"
cd terraform

if [ ! -f "terraform.tfstate" ]; then
    echo -e "${RED}Terraform state not found. Please run 'terraform apply' first.${NC}"
    exit 1
fi

NAMESPACE=$(terraform output -raw namespace)
BUCKET_NAME=$(terraform output -raw bucket_name)
REGION=$(terraform output -raw region 2>/dev/null || echo "${OCI_REGION:-us-ashburn-1}")

cd ..

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

# Upload all files from dist directory
oci os object bulk-upload \
    --namespace "$NAMESPACE" \
    --bucket-name "$BUCKET_NAME" \
    --src-dir ./dist \
    --overwrite \
    --no-progress-bar

echo -e "${GREEN}✓ Upload completed successfully${NC}"

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
