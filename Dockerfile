FROM golang:alpine as builder
WORKDIR /app
COPY . /app
RUN go build -o ./app .

FROM scratch
WORKDIR /app
COPY --from=builder /app .
CMD [ "app" ]
