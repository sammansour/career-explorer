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
  - [ ] Region (e.g., us-ashburn-1)
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

## Troubleshooting Completed

If you encountered issues, document solutions here:

- [ ] Issue 1: _______________
  - Solution: _______________

- [ ] Issue 2: _______________
  - Solution: _______________

## Future Updates

For future deployments:
- [ ] Make code changes
- [ ] Test locally
- [ ] Run `npm run build`
- [ ] Run `./deploy.sh`
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
- [ ] Team notified (if applicable)
- [ ] Documentation updated

**Deployment Status**: ☐ In Progress  ☐ Complete  ☐ Issues

**Website URL**: _________________________________

**Deployment Date**: _____________________________
