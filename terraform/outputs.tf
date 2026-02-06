output "bucket_name" {
  description = "Name of the Object Storage bucket"
  value       = oci_objectstorage_bucket.website_bucket.name
}

output "namespace" {
  description = "Object Storage namespace"
  value       = data.oci_objectstorage_namespace.ns.namespace
}

output "region" {
  description = "OCI region where resources are deployed"
  value       = var.region
}

output "website_url" {
  description = "URL to access the static website"
  value       = "https://objectstorage.${var.region}.oraclecloud.com/n/${data.oci_objectstorage_namespace.ns.namespace}/b/${oci_objectstorage_bucket.website_bucket.name}/o/index.html"
}

output "bucket_url" {
  description = "Base URL for the Object Storage bucket"
  value       = "https://objectstorage.${var.region}.oraclecloud.com/n/${data.oci_objectstorage_namespace.ns.namespace}/b/${oci_objectstorage_bucket.website_bucket.name}/o"
}

output "deployment_par_url" {
  description = "Pre-authenticated request URL for deployment (expires in 30 days)"
  value       = "https://objectstorage.${var.region}.oraclecloud.com${oci_objectstorage_preauthrequest.deployment_par.access_uri}"
  sensitive   = true
}

# Chatbot Outputs (v3.0.0+)
output "chatbot_api_gateway_url" {
  description = "API Gateway URL for the AI Career Counselor chatbot"
  value       = "${oci_apigateway_gateway.chatbot_gateway.hostname}/chat"
}

output "chatbot_application_id" {
  description = "OCID of the Functions Application"
  value       = oci_functions_application.career_counselor_app.id
}

output "chatbot_application_name" {
  description = "Name of the Functions Application"
  value       = oci_functions_application.career_counselor_app.display_name
}

output "deployment_instructions" {
  description = "Instructions for deploying the website and chatbot"
  value       = <<-EOT
  
  =============================================================================
  DEPLOYMENT INSTRUCTIONS - CareerExplorer v3.0.0 with AI Career Counselor
  =============================================================================
  
  STEP 1: Deploy the React Application
  -------------------------------------
  1. Build your React application:
     npm run build
  
  2. Set the chatbot API URL in your .env file:
     echo "VITE_CHATBOT_API_URL=https://${oci_apigateway_gateway.chatbot_gateway.hostname}/chat" > .env
  
  3. Rebuild with the environment variable:
     npm run build
  
  4. Upload the dist folder to Object Storage:
     
     Using OCI CLI:
     oci os object bulk-upload \
       --namespace ${data.oci_objectstorage_namespace.ns.namespace} \
       --bucket-name ${oci_objectstorage_bucket.website_bucket.name} \
       --src-dir ./dist \
       --overwrite
  
     Or use the provided deploy script:
     ./deploy.sh
  
  
  STEP 2: Deploy the AI Career Counselor Function
  ------------------------------------------------
  Prerequisites:
     brew install podman fn
     podman machine init && podman machine start

  1. Configure Fn CLI:
     fn create context ${var.region} --provider oracle
     fn use context ${var.region}
     fn update context oracle.compartment-id ${var.compartment_ocid}
     fn update context api-url https://functions.${var.region}.oraclecloud.com
     fn update context registry ${var.region}.ocir.io/${data.oci_objectstorage_namespace.ns.namespace}/career-explorer

  2. Log in to OCIR (generate Auth Token in OCI Console → Profile → Auth Tokens):
     podman login ${var.region}.ocir.io

  3. Deploy the function:
     cd oci-functions/career-counselor
     fn -v deploy --app ${oci_functions_application.career_counselor_app.display_name}

  4. Get the function OCID:
     fn list functions ${oci_functions_application.career_counselor_app.display_name}

  5. Update terraform.tfvars with the function OCID:
     chatbot_function_ocid = "ocid1.fnfunc.oc1..."

  6. Apply Terraform again to link the API Gateway:
     terraform apply

  IMPORTANT: Create an IAM policy to allow API Gateway to invoke functions:
     oci iam policy create \
       --compartment-id ${var.compartment_ocid} \
       --name "api-gateway-invoke-functions" \
       --description "Allow API Gateway to invoke Functions" \
       --statements '["ALLOW any-user to use functions-family in compartment id ${var.compartment_ocid} where ALL {request.principal.type = \u0027ApiGateway\u0027, request.resource.compartment.id = \u0027${var.compartment_ocid}\u0027}"]'
  
  
  STEP 3: Access Your Application
  --------------------------------
  Website: https://objectstorage.${var.region}.oraclecloud.com/n/${data.oci_objectstorage_namespace.ns.namespace}/b/${oci_objectstorage_bucket.website_bucket.name}/o/index.html
  
  Chatbot API: https://${oci_apigateway_gateway.chatbot_gateway.hostname}/chat
  
  
  NOTE: For production, consider setting up a custom domain and CDN.
  
  For detailed instructions, see docs/CHATBOT_SETUP.md
  =============================================================================
  EOT
}
