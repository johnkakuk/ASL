FROM golang:latest
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
RUN go build -o hello hello.go
FROM scratch
COPY --from=0 /usr/src/myapp/hello /hello
CMD ["./hello"]
