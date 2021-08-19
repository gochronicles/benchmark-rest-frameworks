// Copyright (c) 2021 Go Chronicles
// 
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT
import * as gcp from '@pulumi/gcp';
import * as pulumi from '@pulumi/pulumi';
import * as k8s from '@pulumi/kubernetes';

function createCluster() {
    const config = new pulumi.Config();
    const environment = pulumi.getStack();
    const clusterName = `primary-${environment}`;

    const cluster = new gcp.container.Cluster(clusterName, {
        enableAutopilot: true,
        location: gcp.config.region || "us-central1",
        name: clusterName,
        minMasterVersion: config.require('gke-min-version'),
        releaseChannel: {
            channel: 'STABLE',
        },
    }, {
        ignoreChanges: ['verticalPodAutoscaling'] // beacuse we are using autopilot verticalPodAutoscaling is handle by the GCP
    });

    const kubeconfig = pulumi.
        all([cluster.name, cluster.endpoint, cluster.masterAuth]).
        apply(([name, endpoint, masterAuth]) => {
            const context = `${gcp.config.project}_${gcp.config.zone}_${name}`;
            return `apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: ${masterAuth.clusterCaCertificate}
    server: https://${endpoint}
  name: ${context}
contexts:
- context:
    cluster: ${context}
    user: ${context}
  name: ${context}
current-context: ${context}
kind: Config
preferences: {}
users:
- name: ${context}
  user:
    auth-provider:
      config:
        cmd-args: config config-helper --format=json
        cmd-path: gcloud
        expiry-key: '{.credential.token_expiry}'
        token-key: '{.credential.access_token}'
      name: gcp
`;
        });

    const clusterProvider = new k8s.Provider(clusterName, {
        kubeconfig: kubeconfig,
    });


    // Create a Kubernetes Namespace
    const ns = new k8s.core.v1.Namespace(clusterName, {}, { provider: clusterProvider });
    // Export the Namespace name
    const namespaceName = ns.metadata.name;

    return { kubeconfig, clusterName, clusterProvider, namespaceName };
};

export default createCluster;