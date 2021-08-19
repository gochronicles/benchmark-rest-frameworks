<!--
 Copyright (c) 2021 Go Chronicles
 
 This software is released under the MIT License.
 https://opensource.org/licenses/MIT
-->
# RESTful API using Gin on Golang

## How to run?

### Local
```bash
go run main.go 
# or
go build -o main .
export GIN_MODE=release && ./main
```
### Docker
```bash
docker build . -t go-gin
docker run --rm -p 3000:3000 -e GIN_MODE=release go-gin
```