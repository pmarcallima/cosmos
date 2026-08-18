FROM maven:3.9-eclipse-temurin-21 AS build

WORKDIR /app

COPY services/api/pom.xml ./pom.xml
RUN mvn dependency:go-offline -B

COPY services/api/src ./src
RUN mvn package -B -DskipTests

FROM eclipse-temurin:21-jre-jammy

RUN apt-get update \
    && apt-get install --yes --no-install-recommends curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app
COPY --from=build /app/target/cosmos-api-*.jar app.jar

EXPOSE 8080

HEALTHCHECK --interval=10s --timeout=3s --start-period=20s --retries=5 \
  CMD curl --fail --silent http://127.0.0.1:8080/api/health > /dev/null || exit 1

ENTRYPOINT ["java", "-jar", "/app/app.jar"]

