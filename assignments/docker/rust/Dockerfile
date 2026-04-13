FROM rust:latest
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
RUN rustc hello.rs -o hello
CMD ["./hello"]
