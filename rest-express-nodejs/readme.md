# RESTful API using Express NodeJS

## Run instructions

### Local
```bash
npm i # install dependencies (required while running for the first time)
npm run build # converts TypeScript code to JS
npm run start # runs Express server on NodeJS runtime
```
### Docker
```bash
docker build . -t node-express
docker run --rm -p 3000:3000 node-express
```

Visit http://localhost:3000/
