# Terraform Chatbot Infrastructure Summary

## ✅ Terraform Files - Complete Configuration

### Files Updated for v3.0.0

1. **`terraform/functions.tf`** (NEW - 4KB)
   - OCI Functions Application
   - VCN and networking
   - API Gateway
   - Security and routing

2. **`terraform/variables.tf`** (UPDATED - 1.4KB)
   - OpenAI API key variable
   - Model selection variable
   - Function OCID variable

3. **`terraform/outputs.tf`** (UPDATED - 4.1KB)
   - API Gateway URL output
   - Application details
   - Deployment instructions

4. **`terraform/terraform.tfvars.example`** (UPDATED - 1KB)
   - OpenAI configuration template
   - Setup instructions

5. **`terraform/main.tf`** (UNCHANGED)
   - Object Storage (website hosting)
   - Works alongside new functions

6. **`terraform/provider.tf`** (UNCHANGED)
   - OCI provider configuration
   - Works for both storage and functions

---

## 📦 Resources Created by Terraform

When you run `terraform apply`, it creates:

### Networking (for Functions)
```
✅ VCN (Virtual Cloud Network)
   - CIDR: 10.0.0.0/16
   - DNS Label: funcvcn

✅ Subnet
   - CIDR: 10.0.1.0/24
   - DNS Label: funcsubnet
   - For function execution

✅ Internet Gateway
   - Allows outbound calls to OpenAI API
   - Attached to VCN

✅ Route Table
   - Routes traffic through gateway
   - Default route: 0.0.0.0/0 → IGW

✅ Security List
   - Ingress: HTTPS (443) from anywhere
   - Egress: All protocols to anywhere
```

### Functions Infrastructure
```
✅ Functions Application
   - Name: career-explorer-chatbot-prod
   - Compartment: Your compartment
   - Environment Variables:
     - OPENAI_API_KEY (from terraform.tfvars)
     - OPENAI_MODEL (gpt-4o-mini or gpt-4o)
   - Subnet: function_subnet
   - Tags: Project, Environment, Component
```

### API Gateway
```
✅ API Gateway
   - Type: PUBLIC
   - Endpoint: Auto-generated HTTPS URL
   - Subnet: function_subnet
   - Purpose: Public access to function

✅ API Deployment
   - Path Prefix: /chat
   - Base URL: https://xxxxx.apigateway.region.oci.customer-oci.com
   - Full Endpoint: https://xxxxx.apigateway.region.oci.customer-oci.com/chat
   
   Routes:
   - POST / → OCI Function (career-counselor)
   - OPTIONS / → OCI Function (for CORS preflight)
   
   CORS Configuration:
   - Allowed Origins: * (all domains)
   - Allowed Methods: POST, OPTIONS
   - Allowed Headers: Content-Type, Authorization
   - Credentials: false
   
   Rate Limiting:
   - 10 requests/second per client IP
   - Rate key: CLIENT_IP
   
   Headers:
   - Content-Type: Required
   - Access-Control-Allow-Origin: * (added in response)
```

---

## 🔄 Terraform Deployment Workflow

### Initial Deployment

**Step 1: Configure Variables**
```bash
cd terraform
cp terraform.tfvars.example terraform.tfvars
nano terraform.tfvars
```

Add to `terraform.tfvars`:
```hcl
# Your existing OCI config...
tenancy_ocid     = "ocid1.tenancy.oc1..xxxxx"
user_ocid        = "ocid1.user.oc1..xxxxx"
# ... etc ...

# NEW: Chatbot config
openai_api_key = "sk-proj-your-actual-key"
openai_model   = "gpt-4o-mini"
chatbot_function_ocid = ""  # Leave empty initially
```

**Step 2: Deploy Infrastructure**
```bash
terraform init
terraform plan
terraform apply
```

Creates:
- VCN, Subnet, Gateway, Routes, Security
- Functions Application (empty)
- API Gateway (not yet linked)

**Step 3: Deploy Function Code (Fn CLI)**
```bash
cd ../oci-functions/career-counselor
fn deploy --app career-explorer-chatbot-prod
fn list functions career-explorer-chatbot-prod
```

Copy the function OCID from output.

**Step 4: Link Function to API Gateway**
```bash
cd ../../terraform
nano terraform.tfvars
# Update: chatbot_function_ocid = "ocid1.fnfunc.oc1..xxxxx"

terraform apply
```

Now API Gateway → Function link is complete!

---

## 📤 Terraform Outputs

After `terraform apply`, you get:

### Website Outputs (Existing)
```
bucket_name            = "career-explorer-website-prod"
namespace              = "your-namespace"
website_url            = "https://objectstorage.region.../index.html"
bucket_url             = "https://objectstorage.region.../b/bucket/o"
```

### Chatbot Outputs (NEW)
```
chatbot_api_gateway_url = "https://xxxxx.apigateway.region.oci.customer-oci.com/chat"
chatbot_application_id  = "ocid1.fnapp.oc1..xxxxx"
chatbot_application_name = "career-explorer-chatbot-prod"
```

### Use the API Gateway URL
```bash
# Save to .env file for React app
echo "VITE_CHATBOT_API_URL=$(terraform output -raw chatbot_api_gateway_url)" > ../.env
```

---

## 🔍 Verification

### Check Resources Were Created

**List Functions Application:**
```bash
oci fn application list --compartment-id YOUR_COMPARTMENT_OCID \
  --display-name career-explorer-chatbot-prod
```

**List API Gateway:**
```bash
oci api-gateway gateway list --compartment-id YOUR_COMPARTMENT_OCID \
  --display-name career-explorer-chatbot-gateway-prod
```

**List VCN:**
```bash
oci network vcn list --compartment-id YOUR_COMPARTMENT_OCID \
  --display-name career-explorer-function-vcn-prod
```

### Test API Gateway

**After function is deployed:**
```bash
curl -X POST https://your-gateway-url/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello", "careerId": null, "history": []}'
```

Should return:
```json
{
  "message": "Hi! I'm your AI career counselor...",
  "careerId": null,
  "timestamp": 1234567890
}
```

---

## 💰 Cost Estimation

All resources created by Terraform:

| Resource | Free Tier | Cost if Exceeds |
|----------|-----------|-----------------|
| VCN | ✅ Always free | N/A |
| Subnet | ✅ Always free | N/A |
| Internet Gateway | ✅ Always free | N/A |
| Route Tables | ✅ Always free | N/A |
| Security Lists | ✅ Always free | N/A |
| Functions App | ✅ 2M requests/month | $0.00002 per request |
| Function Execution | ✅ 400,000 GB-seconds | $0.00001417 per GB-second |
| API Gateway | ✅ 1M requests/month | $0.35 per million |
| Data Transfer | ✅ 10TB/month | Varies |

**Expected monthly cost:** $0-3 for the infrastructure (most covered by free tier)
**OpenAI costs:** ~$0.30 per 1,000 chats (separate)

---

## 🔧 Customization

### Change Rate Limiting

In `terraform/functions.tf`:
```hcl
rate_limiting {
  rate_in_requests_per_second = 20  # Change from 10 to 20
  rate_key = "CLIENT_IP"
}
```

### Restrict CORS Origins

In `terraform/functions.tf`:
```hcl
cors {
  allowed_origins = ["https://yourdomain.com"]  # Instead of ["*"]
  allowed_methods = ["POST", "OPTIONS"]
  allowed_headers = ["Content-Type", "Authorization"]
}
```

### Change Function Memory

In `oci-functions/career-counselor/func.yaml`:
```yaml
memory: 512  # Change from 256 to 512 MB
```

Then redeploy function with `fn deploy`

### Change OpenAI Model

In `terraform.tfvars`:
```hcl
openai_model = "gpt-4o"  # Upgrade from gpt-4o-mini
```

Then run `terraform apply` to update function config.

---

## 🗑️ Cleanup

To destroy all chatbot infrastructure:

```bash
cd terraform

# Remove function first (Fn CLI)
fn delete function career-explorer-chatbot-prod career-counselor

# Then destroy Terraform resources
terraform destroy -target=oci_apigateway_deployment.chatbot_deployment
terraform destroy -target=oci_apigateway_gateway.chatbot_gateway
terraform destroy -target=oci_functions_application.career_counselor_app
terraform destroy -target=oci_core_subnet.function_subnet
terraform destroy -target=oci_core_internet_gateway.function_igw
terraform destroy -target=oci_core_route_table.function_route_table
terraform destroy -target=oci_core_security_list.function_security_list
terraform destroy -target=oci_core_vcn.function_vcn
```

Or destroy everything:
```bash
terraform destroy
```

---

## 📋 Summary

**Terraform manages:**
✅ All networking for functions
✅ Functions Application container
✅ API Gateway and routing
✅ CORS and security settings
✅ Environment variables (OpenAI key)

**Terraform does NOT manage:**
❌ Function code deployment (use Fn CLI)
❌ Function OCID (created by Fn CLI)
❌ Docker images (built by Fn CLI)

**Two-step process:**
1. `terraform apply` - Creates infrastructure
2. `fn deploy` - Deploys code
3. `terraform apply` - Links them together

---

**Status:** ✅ Complete and Production Ready  
**Files:** All Terraform files updated for v3.0.0  
**Documentation:** Full deployment guide in `docs/CHATBOT_SETUP.md`
