# Deployment Checklist for CareerExplorer

Use this checklist to ensure a smooth deployment to Oracle Cloud Infrastructure (OCI).

## Pre-Deployment Checklist

### OCI Account Setup
- [ ] Created OCI account (free tier is sufficient)
- [ ] Verified email address
- [ ] Logged into OCI Console
- [ ] Created a compartment for the project (or using root compartment)
- [ ] Noted down compartment OCID

### OCI CLI Installation
- [ ] Installed OCI CLI on your machine
- [ ] Ran `oci setup config` command
- [ ] Generated API key pair (or used existing)
- [ ] Added public key to OCI Console (Profile → API Keys)
- [ ] Noted down the following:
  - [ ] Tenancy OCID
  - [ ] User OCID
  - [ ] API key fingerprint
  - [ ] Region (e.g., us-chicago-1)
  - [ ] Private key path
- [ ] Verified OCI CLI works: `oci iam region list`

### Terraform Setup
- [ ] Installed Terraform (version 1.0+)
- [ ] Verified installation: `terraform --version`
- [ ] Copied `terraform/terraform.tfvars.example` to `terraform/terraform.tfvars`
- [ ] Updated all values in `terraform.tfvars`:
  - [ ] tenancy_ocid
  - [ ] user_ocid
  - [ ] fingerprint
  - [ ] private_key_path
  - [ ] region
  - [ ] compartment_ocid
  - [ ] project_name (optional)
  - [ ] environment (optional)

### Local Development
- [ ] Installed Node.js (18+)
- [ ] Installed npm
- [ ] Cloned/extracted project
- [ ] Ran `npm install` successfully
- [ ] Tested locally: `npm run dev`
- [ ] Application loads at `http://localhost:5173`
- [ ] All pages work correctly
- [ ] No console errors

## Deployment Process

### Step 1: Infrastructure Deployment
- [ ] Changed to terraform directory: `cd terraform`
- [ ] Ran `terraform init`
- [ ] No errors during initialization
- [ ] Ran `terraform plan`
- [ ] Reviewed the plan output
- [ ] Plan shows creation of:
  - [ ] Object Storage bucket
  - [ ] Build artifacts bucket
  - [ ] Pre-authenticated request
- [ ] Ran `terraform apply`
- [ ] Typed `yes` to confirm
- [ ] Deployment completed successfully
- [ ] Saved terraform outputs:
  ```bash
  terraform output > ../deployment-info.txt
  ```
- [ ] Noted the following from outputs:
  - [ ] namespace
  - [ ] bucket_name
  - [ ] website_url

### Step 2: Application Build
- [ ] Changed back to project root: `cd ..`
- [ ] Ran `npm run build`
- [ ] Build completed successfully
- [ ] `dist` folder created
- [ ] Checked dist folder contains:
  - [ ] index.html
  - [ ] assets folder
  - [ ] Other necessary files

### Step 3: Deployment to OCI
- [ ] Made deploy script executable: `chmod +x deploy.sh`
- [ ] Ran deployment script: `./deploy.sh`
- [ ] Script completed without errors
- [ ] Noted the website URL from output

### Step 4: Verification
- [ ] Opened website URL in browser
- [ ] Home page loads correctly
- [ ] Tested navigation:
  - [ ] Home → Explore Careers
  - [ ] Explore Careers → Career Detail
  - [ ] Take Quiz
  - [ ] Favorites page
- [ ] Tested functionality:
  - [ ] Career filtering works
  - [ ] Search works
  - [ ] Quiz completes successfully
  - [ ] Favorites can be added/removed
  - [ ] Career details display correctly
- [ ] Tested on different devices:
  - [ ] Desktop
  - [ ] Tablet
  - [ ] Mobile
- [ ] No console errors
- [ ] All images/assets load

## AI Career Counselor Chatbot Deployment (v3.0.0+)

### Prerequisites
- [ ] Installed Podman: `brew install podman`
- [ ] Installed Fn CLI: `brew install fn`
- [ ] Started Podman VM: `podman machine init && podman machine start`
- [ ] Created Docker compatibility wrapper (see `docs/CHATBOT_SETUP.md`)
- [ ] Verified wrapper works: `docker version` shows "20.10.0"
- [ ] Have OpenAI API key

### Step 1: Configure Fn CLI
- [ ] Created Fn CLI context: `fn create context <region> --provider oracle`
- [ ] Set context active: `fn use context <region>`
- [ ] Set compartment: `fn update context oracle.compartment-id <COMPARTMENT_OCID>`
- [ ] Set API URL: `fn update context api-url https://functions.<region>.oraclecloud.com`
- [ ] Set registry: `fn update context registry <region>.ocir.io/<namespace>/career-explorer`

### Step 2: Login to OCIR
- [ ] Generated Auth Token (OCI Console → Profile → Auth Tokens)
- [ ] Logged in: `podman login <region>.ocir.io`

### Step 3: Deploy Function
- [ ] Navigated to function directory: `cd oci-functions/career-counselor`
- [ ] Deployed: `fn -v deploy --app career-explorer-chatbot-prod`
- [ ] Deployment succeeded
- [ ] Got function OCID: `fn list functions career-explorer-chatbot-prod`

### Step 4: Link API Gateway
- [ ] Updated `terraform.tfvars` with function OCID
- [ ] Ran `terraform apply`
- [ ] API Gateway linked to function

### Step 5: Create IAM Policy (Required!)
- [ ] Created IAM policy allowing API Gateway to invoke functions:
  ```bash
  oci iam policy create \
    --compartment-id <COMPARTMENT_OCID> \
    --name "api-gateway-invoke-functions" \
    --description "Allow API Gateway to invoke Functions" \
    --statements '["ALLOW any-user to use functions-family in compartment id <COMPARTMENT_OCID> where ALL {request.principal.type = '"'"'ApiGateway'"'"', request.resource.compartment.id = '"'"'<COMPARTMENT_OCID>'"'"'}"]'
  ```

### Step 6: Configure Frontend
- [ ] Created `.env` with `VITE_CHATBOT_API_URL=<API_GATEWAY_URL>`
- [ ] Rebuilt frontend: `npm run build`

### Step 7: Redeploy Frontend
- [ ] Uploaded dist to Object Storage with correct MIME types
- [ ] Verified site renders (not downloads) in browser

### Step 8: Test Chatbot
- [ ] Chat button appears on the page
- [ ] Test via curl:
  ```bash
  curl -X POST <API_GATEWAY_URL> \
    -H "Content-Type: application/json" \
    -d '{"message": "Hello", "careerId": null, "history": []}'
  ```
- [ ] AI responds with career counselor greeting
- [ ] Chat works on the live site

## Post-Deployment

### Documentation
- [ ] Updated README with actual deployment URL
- [ ] Documented any issues encountered
- [ ] Created internal documentation if needed

### Optional Enhancements
- [ ] Set up custom domain
- [ ] Configure SSL/TLS
- [ ] Set up monitoring/analytics
- [ ] Configure CDN (if needed)
- [ ] Set up CI/CD pipeline

### Security
- [ ] Ensured `terraform.tfvars` is not committed to git
- [ ] Ensured `.env` files are not committed
- [ ] Ensured API keys are not exposed
- [ ] Added sensitive files to `.gitignore`
- [ ] Reviewed bucket permissions
- [ ] Configured appropriate access controls

## Known Issues & Solutions

**Issue: Fn CLI says "please upgrade Docker to 17.5.0"**
- Solution: Create a Docker compatibility wrapper script at `/usr/local/bin/docker` that intercepts version checks and returns a Docker-compatible version string. See `docs/CHATBOT_SETUP.md` for the wrapper script.

**Issue: API Gateway returns 500 Internal Server Error**
- Solution: Create an IAM policy allowing API Gateway to invoke functions (Step 5 above). Without this policy, API Gateway cannot call the function even though `fn invoke` works.

**Issue: HTML downloads instead of rendering**
- Solution: `oci os object bulk-upload` sets all Content-Types to `application/octet-stream`. Re-upload files with explicit `--content-type` per file extension, or use `./deploy.sh` which handles MIME types automatically.

**Issue: OCI Cloud Shell can't pull container images**
- Solution: Cloud Shell has networking restrictions. Deploy locally with Podman instead.

## Future Updates

For future deployments:
- [ ] Make code changes
- [ ] Test locally: `npm run dev`
- [ ] Rebuild: `npm run build`
- [ ] Deploy frontend: `./deploy.sh`
- [ ] If function code changed: `cd oci-functions/career-counselor && fn -v deploy --app career-explorer-chatbot-prod`
- [ ] Verify changes live

## Rollback Plan

If deployment fails:
1. [ ] Check terraform state: `cd terraform && terraform show`
2. [ ] Review OCI Console for bucket contents
3. [ ] If needed, destroy and recreate:
   ```bash
   terraform destroy
   terraform apply
   ```
4. [ ] Re-deploy application using deploy script

## Notes

Add any specific notes for your deployment:

```
Date: _______________
Deployed by: _______________
Notes:




```

---

## Completion

- [ ] All checklist items completed
- [ ] Application deployed successfully
- [ ] Website accessible and functioning
- [ ] Chatbot responding to queries
- [ ] Team notified (if applicable)
- [ ] Documentation updated

**Deployment Status**: ☐ In Progress  ☐ Complete  ☐ Issues

**Website URL**: _________________________________

**Deployment Date**: _____________________________
