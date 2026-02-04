variable "tenancy_ocid" {
  description = "OCID of your tenancy"
  type        = string
}

variable "user_ocid" {
  description = "OCID of the user"
  type        = string
}

variable "fingerprint" {
  description = "Fingerprint of the API key"
  type        = string
}

variable "private_key_path" {
  description = "Path to your private API key"
  type        = string
}

variable "region" {
  description = "OCI region"
  type        = string
  default     = "us-ashburn-1"
}

variable "compartment_ocid" {
  description = "OCID of the compartment where resources will be created"
  type        = string
}

variable "project_name" {
  description = "Name of the project (used for resource naming)"
  type        = string
  default     = "career-explorer"
}

variable "environment" {
  description = "Environment name (dev, staging, prod)"
  type        = string
  default     = "prod"
}

# Chatbot / AI Counselor Configuration
variable "openai_api_key" {
  description = "OpenAI API key for the AI career counselor chatbot"
  type        = string
  sensitive   = true
}

variable "openai_model" {
  description = "OpenAI model to use (gpt-4o-mini recommended for cost, gpt-4o for quality)"
  type        = string
  default     = "gpt-4o-mini"
}

variable "chatbot_function_ocid" {
  description = "OCID of the deployed chatbot function (set after manual function deployment)"
  type        = string
  default     = "ocid1.fnapp.oc1.us-chicago-1.amaaaaaaetq6yxaarwjyfagunp2enzyrhfj2egqs5eecnantoov3eovflkxq"
}
