FROM eclipse-temurin:latest
COPY . /usr/src/myapp
WORKDIR /usr/src/myapp
RUN javac Hello.java
CMD ["java", "Hello"]
# Couldn't get this one to work with two step. Still barely understand how this works but whatever, it compiled
