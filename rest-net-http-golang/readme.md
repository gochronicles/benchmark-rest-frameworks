<!--
 Copyright (c) 2021 Go Chronicles
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->
# RESTful API using Golang Standard library (net/http)

## Run instructions

### Local
```bash
go run main.go 
# or
go build -o main .
./main
```
### Docker
```bash
docker build . -t go-nethttp
docker run --rm -p 3000:3000 go-nethttp
```