# Copyright (c) 2021 Go Chronicles
# 
# This software is released under the MIT License.
# https://opensource.org/licenses/MIT

FROM golang:1.17.0-alpine3.14 as golangBuilder
RUN apk update && apk upgrade
WORKDIR /app
COPY . .
RUN go mod download
RUN go build -o main .
FROM alpine:3.14 as golangRuntime
RUN apk update && apk upgrade
WORKDIR /app
COPY --from=golangBuilder /app/main main
CMD ["./main"]
