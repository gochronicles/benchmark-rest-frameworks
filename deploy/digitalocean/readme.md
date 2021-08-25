<!--
 Copyright (c) 2021 Go Chronicles
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

## Instructions to setup Pulumi for Digital Ocean

```bash
pulumi stack init dev
pulumi config set appReplicaCount 1
pulumi config set dockerUsername <username>
pulumi config set --secret benchmark:dockerPassword <secret-password>
pulumi config set --secret digitalocean:token <secret-token>
pulumi config set --secret dockerAccessToken <secret-token>
pulumi up -y # create / update all resources
pulumi destory -y # destory all assets
pulumi stack rm dev # delete stack
```
