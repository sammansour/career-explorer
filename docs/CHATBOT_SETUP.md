# AI Career Counselor Chatbot Setup Guide

## Overview

Version 3.0.0 introduces an AI-powered career counselor chatbot that helps students:
- Get detailed information about specific careers
- Discover top university programs for each field
- Find companies actively hiring for different roles
- Understand education requirements and career paths
- Ask follow-up questions in natural conversation

The chatbot is powered by OpenAI's GPT models and runs on OCI Functions (serverless).

---

## Architecture

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   React     │────────▶│ API Gateway  │────────▶│ OCI Function│
│   Frontend  │         │   (Public)   │         │  (Python)   │
└─────────────┘         └──────────────┘         └─────────────┘
                                                         │
                                                         ▼
                                                  ┌─────────────┐
                                                  │  OpenAI API │
                                                  │   (GPT-4)   │
                                                  └─────────────┘
```

**Components:**
1. **Frontend (React)** - Chat UI with floating button
2. **API Gateway** - Public HTTPS endpoint with CORS
3. **OCI Function** - Serverless Python function
4. **OpenAI API** - GPT-4 or GPT-3.5-turbo for responses

---

## Prerequisites

### Required Tools

1. **OCI CLI** - Already installed for website deployment
2. **Fn CLI** - For deploying functions
3. **Podman** - Container engine required by Fn CLI (lighter alternative to Docker)
4. **OpenAI API Key** - Get from https://platform.openai.com/api-keys

### Install Fn CLI and Podman (macOS)

```bash
brew install fn podman
```

### Start Podman

Podman runs containers in a VM on macOS. Initialize and start it:

```bash
podman machine init
podman machine start
```

**Important:** Run `podman machine start` before each deployment session.

### Create Docker Compatibility Wrapper

Fn CLI expects a `docker` command. Create a wrapper that delegates to Podman:

```bash
sudo tee /usr/local/bin/docker << 'WRAPPER'
#!/bin/bash
for arg in "$@"; do
  if [[ "$arg" == *"Version"* ]] || [[ "$arg" == *"version"* && "$arg" == *"format"* ]]; then
    echo "20.10.0"
    exit 0
  fi
done
if [[ "$1" == "version" ]]; then
  echo "Docker version 20.10.0, build podman-compat"
  exit 0
fi
exec podman "$@"
WRAPPER
sudo chmod +x /usr/local/bin/docker
```

### Verify Installation

```bash
fn version
podman --version
docker version   # Should show "20.10.0" via the wrapper
```

### Linux / Windows

**Linux:**
```bash
sudo dnf install podman  # or apt install podman
# Install fn: curl -LSs https://raw.githubusercontent.com/fnproject/cli/master/install | sh
```

**Windows:**
Download Podman Desktop from https://podman.io/downloads and Fn CLI from https://github.com/fnproject/cli/releases

> **Note:** OCI Cloud Shell has Fn CLI pre-installed but may have networking restrictions that prevent pulling container images from external registries. Local deployment with Podman is recommended.

---

## Step 1: Get OpenAI API Key

### Create OpenAI Account

1. Go to https://platform.openai.com/signup
2. Sign up for an account
3. Add payment method (required for API access)
4. Navigate to https://platform.openai.com/api-keys
5. Click "Create new secret key"
6. Copy the key (starts with `sk-proj-...`)
7. **Save it securely** - you won't see it again!

### Choose Your Model

| Model | Cost (per 1M tokens) | Speed | Quality | Recommended For |
|-------|---------------------|-------|---------|-----------------|
| **gpt-4o-mini** | $0.15 / $0.60 | Fast | Good | Development, Budget |
| **gpt-4o** | $2.50 / $10.00 | Medium | Excellent | Production |

**Recommendation:** Start with `gpt-4o-mini` for development, upgrade to `gpt-4o` for production.

**Cost Estimate:**
- Average chat: ~500 tokens (~$0.0003 with gpt-4o-mini)
- 1,000 chats/month: ~$0.30 with gpt-4o-mini
- 10,000 chats/month: ~$3.00 with gpt-4o-mini

---

## Step 2: Configure Terraform

### Update terraform.tfvars

```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
nano terraform.tfvars  # or use your preferred editor
```

**Add your OpenAI API key:**
```hcl
# Previous OCI configuration...
tenancy_ocid     = "ocid1.tenancy.oc1..your_actual_ocid"
user_ocid        = "ocid1.user.oc1..your_actual_ocid"
# ... other existing values ...

# NEW: AI Career Counselor Configuration
openai_api_key = "sk-proj-your_actual_openai_api_key_here"
openai_model   = "gpt-4o-mini"  # or "gpt-4o" for better quality

# Leave empty initially (will be filled after function deployment)
chatbot_function_ocid = ""
```

**Important:** Never commit `terraform.tfvars` to version control!

---

## Step 3: Deploy Infrastructure

### Deploy OCI Resources

```bash
cd terraform

# Initialize (if first time)
terraform init

# Deploy the infrastructure
terraform apply
```

This creates:
- ✅ Functions Application
- ✅ VCN and Subnet for Functions
- ✅ API Gateway
- ✅ Security Lists and Route Tables

**Save the outputs:**
```bash
terraform output > ../chatbot-config.txt
```

You'll need:
- `chatbot_application_name`
- `chatbot_api_gateway_url`

---

## Step 4: Configure Fn CLI

### Set OCI Context

```bash
# Get your tenancy namespace (from OCI Console or CLI)
TENANCY_NAMESPACE=$(oci os ns get --query data --raw-output)

# Create and configure Fn CLI context
fn create context <YOUR_REGION> --provider oracle
fn use context <YOUR_REGION>
fn update context oracle.compartment-id <YOUR_COMPARTMENT_OCID>
fn update context api-url https://functions.<YOUR_REGION>.oraclecloud.com
fn update context registry <YOUR_REGION>.ocir.io/${TENANCY_NAMESPACE}/career-explorer
```

Replace `<YOUR_REGION>` with your OCI region (e.g., `us-chicago-1`, `us-ashburn-1`).

### Generate Auth Token for OCIR

1. Go to OCI Console → Profile → My Profile
2. Click "Auth Tokens" → "Generate Token"
3. Save the token securely
4. Login to OCIR:

```bash
podman login <YOUR_REGION>.ocir.io
# Username: <TENANCY_NAMESPACE>/oracleidentitycloudservice/<your-email>
# Password: <AUTH_TOKEN>
```

---

## Step 5: Deploy the Function

### Navigate to Function Directory

```bash
cd oci-functions/career-counselor
```

### Deploy Function

```bash
# Deploy to the application created by Terraform
fn -v deploy --app career-explorer-chatbot-prod
```

**Note:** Replace `career-explorer-chatbot-prod` with your actual application name from Terraform output.

This will:
1. Build the container image using Podman
2. Push to OCIR
3. Deploy to OCI Functions
4. Configure environment variables (from Terraform)

**Troubleshooting:** If you see a Docker version error, ensure the Docker compatibility wrapper is set up (see Prerequisites above).

### Get Function OCID

```bash
fn list functions career-explorer-chatbot-prod
```

Copy the function OCID (starts with `ocid1.fnfunc.oc1...`)

---

## Step 6: Link API Gateway to Function

### Update Terraform

Edit `terraform/terraform.tfvars`:
```hcl
chatbot_function_ocid = "ocid1.fnfunc.oc1.your_actual_function_ocid"
```

### Apply Terraform Again

```bash
cd terraform
terraform apply
```

This links the API Gateway to your deployed function.

### Create IAM Policy (Required!)

The API Gateway needs permission to invoke your function. **This step is required** — without it, the API Gateway will return 500 errors.

```bash
oci iam policy create \
  --compartment-id <YOUR_COMPARTMENT_OCID> \
  --name "api-gateway-invoke-functions" \
  --description "Allow API Gateway to invoke Functions" \
  --statements '["ALLOW any-user to use functions-family in compartment id <YOUR_COMPARTMENT_OCID> where ALL {request.principal.type = '"'"'ApiGateway'"'"', request.resource.compartment.id = '"'"'<YOUR_COMPARTMENT_OCID>'"'"'}"]'
```

Replace `<YOUR_COMPARTMENT_OCID>` with your actual compartment OCID.

### Get API Endpoint

```bash
terraform output chatbot_api_gateway_url
```

Example output: `https://xxxxx.apigateway.<YOUR_REGION>.oci.customer-oci.com/chat`

---

## Step 7: Configure Frontend

### Create .env File

In the project root:
```bash
echo "VITE_CHATBOT_API_URL=<YOUR_API_GATEWAY_URL>" > .env
```

Replace `<YOUR_API_GATEWAY_URL>` with the URL from Terraform output.

**Example:**
```bash
echo "VITE_CHATBOT_API_URL=https://xxxxx.apigateway.us-chicago-1.oci.customer-oci.com/chat" > .env
```

### Rebuild Frontend

```bash
npm run build
```

The environment variable will be baked into the build.

---

## Step 8: Deploy to OCI

### Upload to Object Storage

```bash
# Using the deploy script (requires Terraform state)
./deploy.sh

# Or manually with OCI CLI (set correct Content-Types!)
oci os object bulk-upload \
  --namespace <YOUR_NAMESPACE> \
  --bucket-name <YOUR_BUCKET> \
  --src-dir ./dist \
  --overwrite

# IMPORTANT: Re-upload with correct MIME types to prevent download instead of render
for f in dist/**/* dist/*; do
  [ -f "$f" ] || continue
  key="${f#dist/}"
  case "$f" in
    *.html) mime="text/html" ;;
    *.css)  mime="text/css" ;;
    *.js)   mime="application/javascript" ;;
    *.svg)  mime="image/svg+xml" ;;
    *.png)  mime="image/png" ;;
    *.json) mime="application/json" ;;
    *)      mime="application/octet-stream" ;;
  esac
  oci os object put --namespace <YOUR_NAMESPACE> --bucket-name <YOUR_BUCKET> \
    --name "$key" --file "$f" --force --content-type "$mime"
done
```

> **Note:** `oci os object bulk-upload` does not set Content-Type headers correctly. You must re-upload with explicit MIME types or the HTML will download instead of render in the browser.

---

## Step 9: Test the Chatbot

### Open Your Website

Navigate to your website URL (from Terraform output).

### Test the Chat

1. Look for the floating chat button (bottom right)
2. Click to open the chat window
3. Try these test messages:
   - "What universities are best for software development?"
   - "Which companies hire UX designers?"
   - "What degree do I need to become a data scientist?"

### Verify Functionality

✅ Chat button appears
✅ Chat window opens/closes
✅ Messages send successfully
✅ AI responds with relevant information
✅ University and company recommendations provided
✅ Career context awareness (when viewing career pages)

---

## Troubleshooting

### Chat Not Responding

**Check API Endpoint:**
```bash
# Test the function directly
echo '{"message": "Hello", "careerId": null, "history": []}' | \
  fn invoke career-explorer-chatbot-prod career-counselor
```

**Check API Gateway:**
```bash
curl -X POST https://your-gateway-url/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

### OpenAI API Errors

**Error: "OpenAI API key not configured"**
- Check function configuration:
```bash
fn inspect function career-explorer-chatbot-prod career-counselor
```
- Verify `OPENAI_API_KEY` is set

**Error: "Incorrect API key"**
- Verify your OpenAI API key is valid
- Check if billing is enabled on OpenAI account

**Error: "Rate limit exceeded"**
- You've hit OpenAI's rate limit
- Wait a few minutes or upgrade your OpenAI plan

### CORS Errors

**Error: "CORS policy blocked"**
- Check API Gateway CORS settings in Terraform
- Ensure `allowed_origins` includes your website domain
- For development, use `["*"]`

### Function Timeout

**Error: "Function timeout"**
- Increase timeout in `func.yaml`:
```yaml
timeout: 120  # Increase to 2 minutes
```
- Redeploy function

---

## Monitoring and Costs

### Monitor Function Usage

**OCI Console:**
1. Go to Developer Services → Functions
2. Select your application
3. Click on the function
4. View "Metrics" tab

**Monitor costs:**
- Functions: Pay per request + execution time
- API Gateway: Pay per request
- OpenAI: Pay per token used

### Cost Optimization

**Reduce OpenAI costs:**
1. Use `gpt-4o-mini` instead of `gpt-4o`
2. Limit `max_tokens` in function code
3. Implement caching for common questions
4. Add rate limiting

**Reduce OCI costs:**
1. Use OCI free tier (2M function calls/month)
2. Optimize function code for speed
3. Implement API Gateway caching

---

## Updating the Chatbot

### Update Function Code

1. Edit `oci-functions/career-counselor/func.py`
2. Redeploy:
```bash
cd oci-functions/career-counselor
fn -v deploy --app career-explorer-chatbot-prod
```

### Update Career Data

Edit the `CAREERS_DATA` dictionary in `func.py` to add more careers or update information.

### Change OpenAI Model

Update in `terraform.tfvars`:
```hcl
openai_model = "gpt-4o"  # or "gpt-4o-mini"
```

Then:
```bash
cd terraform
terraform apply
```

---

## Security Best Practices

### Protect Your API Key

✅ Never commit `terraform.tfvars` to git
✅ Use environment variables for local development
✅ Rotate OpenAI API key periodically
✅ Monitor usage for anomalies

### Rate Limiting

API Gateway is configured with:
- 10 requests/second per IP
- Adjust in `terraform/functions.tf` if needed

### CORS

For production:
1. Change `allowed_origins` from `["*"]` to your domain
2. Example: `["https://yourdomain.com"]`

---

## Advanced Configuration

### Custom System Prompt

Edit `SYSTEM_PROMPT` in `func.py` to customize the AI's personality and behavior.

### Add More Career Data

Expand `CAREERS_DATA` dictionary with more careers, universities, and companies.

### Conversation History

Currently limited to last 10 messages. Adjust in `func.py`:
```python
for msg in conversation_history[-20:]:  # Increase from 10 to 20
```

---

## Support

### Common Questions

**Q: How much will this cost?**
A: With OCI free tier and gpt-4o-mini:
- Functions: Free (up to 2M requests/month)
- API Gateway: ~$0.35 per million requests
- OpenAI: ~$0.30 per 1,000 chats
- Total: ~$1-5/month for moderate usage

**Q: Can I use a different AI provider?**
A: Yes! Modify `func.py` to use Anthropic Claude, Google Gemini, or other providers.

**Q: How do I add authentication?**
A: Implement JWT tokens or OAuth in the API Gateway. See OCI documentation.

**Q: Can users see each other's chats?**
A: No. Each chat session is isolated in the user's browser.

---

## Next Steps

After successful deployment:

1. ✅ Test thoroughly with various questions
2. ✅ Monitor costs and usage
3. ✅ Gather user feedback
4. ✅ Expand career database
5. ✅ Add more features (save chat history, etc.)

---

**Version:** 3.0.1
**Last Updated:** February 6, 2026
**Status:** Production Ready (deployed and verified)
