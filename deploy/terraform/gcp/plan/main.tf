
# ---------------------------------------------------------------------------------------------------------------------
# DEPLOY A PUBLIC CLUSTER IN GOOGLE CLOUD PLATFORM
# ---------------------------------------------------------------------------------------------------------------------

module "gke_cluster" {
  # When using these modules in your own templates, you will need to use a Git URL with a ref attribute that pins you
  # to a specific version of the modules, such as the following example:
  # source = "github.com/gruntwork-io/terraform-google-gke.git//modules/gke-cluster?ref=v0.2.0"
  source = "../modules/gke-cluster"

  name = var.cluster_name

  project  = var.project
  location = var.location
  network  = module.vpc_network.network

  # We're deploying the cluster in the 'public' subnetwork to allow outbound internet access
  # See the network access tier table for full details:
  # https://github.com/gruntwork-io/terraform-google-network/tree/master/modules/vpc-network#access-tier
  subnetwork                    = module.vpc_network.public_subnetwork
  cluster_secondary_range_name  = module.vpc_network.public_subnetwork_secondary_range_name
  services_secondary_range_name = module.vpc_network.public_services_secondary_range_name

  alternative_default_service_account = var.override_default_node_pool_service_account ? module.gke_service_account.email : null

  enable_vertical_pod_autoscaling = var.enable_vertical_pod_autoscaling
  enable_workload_identity        = var.enable_workload_identity

  resource_labels = {
    environment = "testing"
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# CREATE A NODE POOL
# ---------------------------------------------------------------------------------------------------------------------

resource "google_container_node_pool" "node_pool" {
  provider = google-beta

  name     = "main-pool"
  project  = var.project
  location = var.location
  cluster  = module.gke_cluster.name

  initial_node_count = "1"

  autoscaling {
    min_node_count = "1"
    max_node_count = "6"
  }

  management {
    auto_repair  = "true"
    auto_upgrade = "true"
  }

  node_config {
    image_type   = "COS"
    machine_type = "n1-standard-1"

    labels = {
      all-pools-example = "true"
    }

    # Add a public tag to the instances. See the network access tier table for full details:
    # https://github.com/gruntwork-io/terraform-google-network/tree/master/modules/vpc-network#access-tier
    tags = [
      module.vpc_network.public,
      "public-pool-example",
    ]

    disk_size_gb = "10"
    disk_type    = "pd-standard"
    preemptible  = false

    service_account = module.gke_service_account.email

    workload_metadata_config {
      node_metadata = "GKE_METADATA_SERVER"
    }

    oauth_scopes = [
      "https://www.googleapis.com/auth/cloud-platform",
    ]
  }

  lifecycle {
    ignore_changes = [initial_node_count]
  }

  timeouts {
    create = "30m"
    update = "30m"
    delete = "30m"
  }
}

# ---------------------------------------------------------------------------------------------------------------------
# CREATE A CUSTOM SERVICE ACCOUNT TO USE WITH THE GKE CLUSTER
# ---------------------------------------------------------------------------------------------------------------------

module "gke_service_account" {
  # When using these modules in your own templates, you will need to use a Git URL with a ref attribute that pins you
  # to a specific version of the modules, such as the following example:
  # source = "github.com/gruntwork-io/terraform-google-gke.git//modules/gke-service-account?ref=v0.2.0"
  source = "../modules/gke-service-account"

  name        = var.cluster_service_account_name
  project     = var.project
  description = var.cluster_service_account_description
}
