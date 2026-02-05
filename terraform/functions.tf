# OCI Functions Application
resource "oci_functions_application" "career_counselor_app" {
  compartment_id = var.compartment_ocid
  display_name   = "${var.project_name}-chatbot-${var.environment}"
  subnet_ids     = [oci_core_subnet.function_subnet.id]

  config = {
    "OPENAI_API_KEY"  = var.openai_api_key
    "OPENAI_MODEL"    = var.openai_model
  }

  freeform_tags = {
    "Project"     = var.project_name
    "Environment" = var.environment
    "Component"   = "chatbot"
  }
}

# VCN for Functions
resource "oci_core_vcn" "function_vcn" {
  compartment_id = var.compartment_ocid
  display_name   = "${var.project_name}-function-vcn-${var.environment}"
  cidr_blocks    = ["10.0.0.0/16"]
  dns_label      = "funcvcn"
}

# Subnet for Functions
resource "oci_core_subnet" "function_subnet" {
  compartment_id    = var.compartment_ocid
  vcn_id            = oci_core_vcn.function_vcn.id
  display_name      = "${var.project_name}-function-subnet-${var.environment}"
  cidr_block        = "10.0.1.0/24"
  dns_label         = "funcsubnet"
  security_list_ids = [oci_core_security_list.function_security_list.id]
  route_table_id    = oci_core_route_table.function_route_table.id
}

# Internet Gateway for Functions
resource "oci_core_internet_gateway" "function_igw" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.function_vcn.id
  display_name   = "${var.project_name}-function-igw-${var.environment}"
  enabled        = true
}

# Route Table
resource "oci_core_route_table" "function_route_table" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.function_vcn.id
  display_name   = "${var.project_name}-function-rt-${var.environment}"

  route_rules {
    destination       = "0.0.0.0/0"
    destination_type  = "CIDR_BLOCK"
    network_entity_id = oci_core_internet_gateway.function_igw.id
  }
}

# Security List
resource "oci_core_security_list" "function_security_list" {
  compartment_id = var.compartment_ocid
  vcn_id         = oci_core_vcn.function_vcn.id
  display_name   = "${var.project_name}-function-sl-${var.environment}"

  egress_security_rules {
    destination = "0.0.0.0/0"
    protocol    = "all"
  }

  ingress_security_rules {
    protocol = "6" # TCP
    source   = "0.0.0.0/0"

    tcp_options {
      min = 443
      max = 443
    }
  }
}

# API Gateway
resource "oci_apigateway_gateway" "chatbot_gateway" {
  compartment_id = var.compartment_ocid
  endpoint_type  = "PUBLIC"
  subnet_id      = oci_core_subnet.function_subnet.id
  display_name   = "${var.project_name}-chatbot-gateway-${var.environment}"

  freeform_tags = {
    "Project"     = var.project_name
    "Environment" = var.environment
  }
}

# API Deployment
resource "oci_apigateway_deployment" "chatbot_deployment" {
  compartment_id = var.compartment_ocid
  gateway_id     = oci_apigateway_gateway.chatbot_gateway.id
  path_prefix    = "/chat"
  display_name   = "${var.project_name}-chatbot-deployment-${var.environment}"

  specification {
    request_policies {
      cors {
        allowed_origins = ["*"]
        allowed_methods = ["POST", "OPTIONS"]
        allowed_headers = ["Content-Type", "Authorization"]
        is_allow_credentials_enabled = false
      }

      rate_limiting {
        rate_in_requests_per_second = 10
        rate_key = "CLIENT_IP"
      }
    }

    routes {
      path    = "/"
      methods = ["POST", "OPTIONS"]

      backend {
        type = "ORACLE_FUNCTIONS_BACKEND"
        function_id = var.chatbot_function_ocid # Will be set after function deployment
      }

      response_policies {
        header_transformations {
          set_headers {
            items {
              name  = "Access-Control-Allow-Origin"
              values = ["*"]
            }
          }
        }
      }
    }
  }

  freeform_tags = {
    "Project"     = var.project_name
    "Environment" = var.environment
  }
}

# Website Hosting via API Gateway -> Object Storage (serves SPA)
resource "oci_apigateway_deployment" "website_deployment" {
  compartment_id = var.compartment_ocid
  gateway_id     = oci_apigateway_gateway.chatbot_gateway.id
  # Serve website under /site to avoid root (/) prefix conflict
  path_prefix    = "/site"
  display_name   = "${var.project_name}-website-${var.environment}"

  specification {
    # Route: GET /  -> serve index.html (assets referenced via absolute Object Storage URLs)
    routes {
      path    = "/"
      methods = ["GET"]

      backend {
        type = "HTTP_BACKEND"
        url  = "https://objectstorage.${var.region}.oraclecloud.com/n/${data.oci_objectstorage_namespace.ns.namespace}/b/${oci_objectstorage_bucket.website_bucket.name}/o/index.html"
      }

      response_policies {
        header_transformations {
          set_headers {
            items {
              name   = "Content-Type"
              values = ["text/html; charset=utf-8"]
            }
            items {
              name   = "Content-Disposition"
              values = ["inline"]
            }
          }
        }
      }
    }

    # SPA fallback: /{path}
    routes {
      path    = "/{path}"
      methods = ["GET"]

      backend {
        type = "HTTP_BACKEND"
        url  = "https://objectstorage.${var.region}.oraclecloud.com/n/${data.oci_objectstorage_namespace.ns.namespace}/b/${oci_objectstorage_bucket.website_bucket.name}/o/index.html"
      }

      response_policies {
        header_transformations {
          set_headers {
            items {
              name   = "Content-Type"
              values = ["text/html; charset=utf-8"]
            }
            items {
              name   = "Content-Disposition"
              values = ["inline"]
            }
          }
        }
      }
    }

    # SPA fallback: /{path1}/{path2}
    routes {
      path    = "/{path1}/{path2}"
      methods = ["GET"]

      backend {
        type = "HTTP_BACKEND"
        url  = "https://objectstorage.${var.region}.oraclecloud.com/n/${data.oci_objectstorage_namespace.ns.namespace}/b/${oci_objectstorage_bucket.website_bucket.name}/o/index.html"
      }

      response_policies {
        header_transformations {
          set_headers {
            items {
              name   = "Content-Type"
              values = ["text/html; charset=utf-8"]
            }
            items {
              name   = "Content-Disposition"
              values = ["inline"]
            }
          }
        }
      }
    }

    # SPA fallback: /{path1}/{path2}/{path3}
    routes {
      path    = "/{path1}/{path2}/{path3}"
      methods = ["GET"]

      backend {
        type = "HTTP_BACKEND"
        url  = "https://objectstorage.${var.region}.oraclecloud.com/n/${data.oci_objectstorage_namespace.ns.namespace}/b/${oci_objectstorage_bucket.website_bucket.name}/o/index.html"
      }

      response_policies {
        header_transformations {
          set_headers {
            items {
              name   = "Content-Type"
              values = ["text/html; charset=utf-8"]
            }
            items {
              name   = "Content-Disposition"
              values = ["inline"]
            }
          }
        }
      }
    }

    # SPA fallback: /{path1}/{path2}/{path3}/{path4}
    routes {
      path    = "/{path1}/{path2}/{path3}/{path4}"
      methods = ["GET"]

      backend {
        type = "HTTP_BACKEND"
        url  = "https://objectstorage.${var.region}.oraclecloud.com/n/${data.oci_objectstorage_namespace.ns.namespace}/b/${oci_objectstorage_bucket.website_bucket.name}/o/index.html"
      }

      response_policies {
        header_transformations {
          set_headers {
            items {
              name   = "Content-Type"
              values = ["text/html; charset=utf-8"]
            }
            items {
              name   = "Content-Disposition"
              values = ["inline"]
            }
          }
        }
      }
    }
  }

  freeform_tags = {
    "Project"     = var.project_name
    "Environment" = var.environment
  }
}

 
