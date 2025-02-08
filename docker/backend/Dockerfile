# 1. BUILD STAGE
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

# 2. RUNTIME STAGE
FROM amazoncorretto:17

ARG PROFILE=dev
ARG APP_VERSION=1.0.0

WORKDIR /app
COPY --from=build /build/target/job-connect-*.jar /app/

EXPOSE 8181

ENV DB_URL=jdbc:mysql://mysql-service:5432/job_connect_db
ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} job-connect-${JAR_VERSION}.jar

# docker build -t rupesh1997/job-connect-backend:1.0.0 -f docker/backend/Dockerfile .
# docker run -p 8181:8181 --name job-connect-backend rupesh1997/job-connect-backend:1.0.0