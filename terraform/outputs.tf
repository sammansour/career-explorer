output "bucket_name" {
  description = "Name of the Object Storage bucket"
  value       = oci_objectstorage_bucket.website_bucket.name
}

output "namespace" {
  description = "Object Storage namespace"
  value       = data.oci_objectstorage_namespace.ns.namespace
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

output "deployment_instructions" {
  description = "Instructions for deploying the website"
  value       = <<-EOT
  
  Deployment Instructions:
  
  1. Build your React application:
     npm run build
  
  2. Upload the dist folder to Object Storage:
     
     Using OCI CLI:
     oci os object bulk-upload \
       --namespace ${data.oci_objectstorage_namespace.ns.namespace} \
       --bucket-name ${oci_objectstorage_bucket.website_bucket.name} \
       --src-dir ./dist \
       --overwrite
  
     Or use the provided deploy script:
     ./deploy.sh
  
  3. Access your website at:
     https://objectstorage.${var.region}.oraclecloud.com/n/${data.oci_objectstorage_namespace.ns.namespace}/b/${oci_objectstorage_bucket.website_bucket.name}/o/index.html
  
  Note: For production, consider setting up a custom domain and CDN.
  EOT
}
