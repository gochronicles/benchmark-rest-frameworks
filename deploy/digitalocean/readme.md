<!--
 Copyright (c) 2021 Go Chronicles
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->

### Digital Ocean

pulumi config set appReplicaCount 1
pulumi config set dockerUsername nikhilakki
pulumi config set --secret benchmark:dockerPassword <secret-password>
pulumi config set --secret digitalocean:token <secret-token>
pulumi config set --secret dockerAccessToken <secret-token>