# RESTful API using Fiber on Golang

## Run instructions

### Local
```bash
go get # install dependencies (required while running for the first time)
go run main.go # run fiber app
```
### Docker
```bash
docker build . -t go-fiber
docker run --rm -p 3000:3000 go-fiber
```
Visit http://localhost:3000/