terraform {
  required_version = ">= 1.5"
  required_providers {
    oci = {
      source  = "oracle/oci"
      version = "~> 5.0"
    }
  }
}

# Create Object Storage Bucket for static website
resource "oci_objectstorage_bucket" "website_bucket" {
  compartment_id = var.compartment_ocid
  namespace      = data.oci_objectstorage_namespace.ns.namespace
  name           = "${var.project_name}-${var.environment}"
  access_type    = "ObjectRead"
  
  metadata = {
    "project"     = var.project_name
    "environment" = var.environment
  }

  # Enable versioning for backup
  versioning = "Enabled"
}

# Data source for namespace
data "oci_objectstorage_namespace" "ns" {
  compartment_id = var.compartment_ocid
}

# Bucket for storing build artifacts (optional, for CI/CD)
resource "oci_objectstorage_bucket" "build_artifacts" {
  compartment_id = var.compartment_ocid
  namespace      = data.oci_objectstorage_namespace.ns.namespace
  name           = "${var.project_name}-builds-${var.environment}"
  access_type    = "NoPublicAccess"
  
  metadata = {
    "project"     = var.project_name
    "environment" = var.environment
    "purpose"     = "build-artifacts"
  }
}

# Create PAR (Pre-Authenticated Request) for easier deployment (optional)
# This allows you to upload files without authentication for a limited time
resource "oci_objectstorage_preauthrequest" "deployment_par" {
  namespace    = data.oci_objectstorage_namespace.ns.namespace
  bucket       = oci_objectstorage_bucket.website_bucket.name
  name         = "deployment-par"
  access_type  = "AnyObjectReadWrite"
  time_expires = timeadd(timestamp(), "720h") # 30 days from now

  lifecycle {
    ignore_changes = [time_expires]
  }
}

# Example: Upload index.html (you'll upload the full dist folder separately)
# This is just to demonstrate the pattern - actual deployment should be done via script
resource "oci_objectstorage_object" "index_html" {
  namespace = data.oci_objectstorage_namespace.ns.namespace
  bucket    = oci_objectstorage_bucket.website_bucket.name
  object    = "index.html"
  source    = "https://objectstorage.us-chicago-1.oraclecloud.com/p/hAbCuLMw9M4WjyqSpMpn3foiqh4zzuh0ijUez6RsjIEB781l8TsNFV0ErimD4tJR/n/axmhqnm6m40e/b/dtech_bucket/o/dist/index.html"
  
  # This will only upload if the file exists after build
  # In practice, use the deploy script instead
  
  lifecycle {
    ignore_changes = [
      source,
      content,
      metadata
    ]
  }

  depends_on = [oci_objectstorage_bucket.website_bucket]
}
