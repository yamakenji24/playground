FROM golang:1.18.7-alpine as builder

WORKDIR /app

COPY go.mod go.mod
COPY go.sum go.sum

RUN go mod download
COPY . .
RUN go build -o api-service

FROM alpine:3.15 as executor

WORKDIR /app
COPY --from=builder /app/api-service /app/api-service

CMD ["/app/api-service"]