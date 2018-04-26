FROM maven:3.5.3-jdk-8

WORKDIR /product/services/server
COPY . /product/services/server/

RUN mvn clean install -Dmaven.test.skip=true