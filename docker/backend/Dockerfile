#1. Build stage
FROM maven:3.8.7-openjdk-18 AS build
WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

#2. Runtime stage
FROM amazoncorretto:17
WORKDIR /app
COPY --from=build /build/target/job-connect-*.jar /app/
ARG PROFILE=development
ARG APP_VERSION=1.0.0
ARG DATABASE_URL=jdbc:mysql://mysql-service:3306/job_connect_db

EXPOSE 8989

ENV ACTIVE_PROFILE=${PROFILE}
ENV JAR_VERSION=${APP_VERSION}
ENV DB_URL=${DATABASE_URL}

CMD java -jar -Dspring.profiles.active=${ACTIVE_PROFILE} -Dspring.datasource.url=${DB_URL} job-connect-${JAR_VERSION}.jar

# docker build -t rupesh1997/job-connect-backend:1.0.0 -f ../docker/backend/Dockerfile .
# docker run -d -p 8181:8181 --network job_connect_job_connect_network --name job-connect-backend rupesh1997/job-connect-backend:1.0.0