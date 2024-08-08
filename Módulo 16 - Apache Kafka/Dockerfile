# FROM golang:1.16
FROM --platform=linux/amd64 golang:1.16

WORKDIR /go/src
ENV PATH="/go/bin:${PATH}" \
  CGO_ENABLED=1

RUN apt-get update && \
  apt-get install build-essential librdkafka-dev -y

CMD ["tail", "-f", "/dev/null"]