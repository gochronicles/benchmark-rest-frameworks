## Welcome to Benchmark Rest Frameworks by Team GoChronicles

This repo holds the source code for benchmarking restful services written in the following languages and respective frameworks -

### GoLang
1. [net/http](https://github.com/gochronicles/benchmark-rest-frameworks/tree/main/rest-net-http-golang)
2. [Fiber](https://github.com/gochronicles/benchmark-rest-frameworks/tree/main/rest-fiber-golang)
3. [Gin](https://github.com/gochronicles/benchmark-rest-frameworks/tree/main/rest-gin-golang)

### NodeJS
1. [ExpressJS](https://github.com/gochronicles/benchmark-rest-frameworks/tree/main/rest-express-nodejs)
2. [NestJS (Express backend)](https://github.com/gochronicles/benchmark-rest-frameworks/tree/main/rest-nest-nodejs)

### Python 
1. [FastAPI](https://github.com/gochronicles/benchmark-rest-frameworks/tree/main/rest-fastapi-python)

## How to run the Benchmark?

- The benchmark can be run in different compatible environments, such as - 
    - [A Raspberry Pi](https://github.com/gochronicles/benchmark-rest-frameworks/wiki/Raspberry-Pi-3---Benchmark-Instructions)
    - [Kubernetes Cluster](https://github.com/gochronicles/benchmark-rest-frameworks/tree/main/deploy)
      - [Minikube](https://github.com/gochronicles/benchmark-rest-frameworks/tree/main/deploy/minikube) (local/on-prem setup)
      - [GCP](https://github.com/gochronicles/benchmark-rest-frameworks/tree/main/deploy/gcp)
      - [Digital Ocean](https://github.com/gochronicles/benchmark-rest-frameworks/tree/main/deploy/digitalocean)   
- Benchmarking client - [Ab tool](https://httpd.apache.org/docs/2.4/programs/ab.html)
    - Sample test command ```ab -k -c 350 -n 5000 http://0.0.0.0:3000/```
   
***For detailed info visit our [Wiki page](https://github.com/gochronicles/benchmark-rest-frameworks/wiki)***
