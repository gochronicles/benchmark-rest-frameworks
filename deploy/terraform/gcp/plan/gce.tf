resource "google_service_account" "default" {
  account_id   = "benchmark-client-sa"
  display_name = "Service Account for Benchmark Client"
}


resource "google_compute_instance" "default" {
  name         = "benchmark-client"
  machine_type = "e2-medium"
  zone         = var.location

  tags = ["benchmark", "client", "gochronicles"]

  boot_disk {
    initialize_params {
      image = "debian-cloud/debian-9"
    }
  }


  network_interface {
    network    = module.vpc_network.network
    subnetwork = module.vpc_network.private_subnetwork

    access_config {
      // Ephemeral public IP
    }
  }

  metadata = {
    benchmark = "client"
  }

  metadata_startup_script = "sudo apt-get update; sudo apt-get upgrade -y"

  service_account {
    # Google recommends custom service accounts that have cloud-platform scope and permissions granted via IAM Roles.
    email  = google_service_account.default.email
    scopes = ["cloud-platform"]
  }
}
