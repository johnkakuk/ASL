FROM gcc:latest
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
RUN g++ -o hello hello.cpp -static
FROM scratch
COPY --from=0 /usr/src/myapp/hello /hello
CMD ["./hello"]
