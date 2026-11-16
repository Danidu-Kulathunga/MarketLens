# Stage 1: Build JAR
FROM maven:3.9-eclipse-temurin-17-alpine AS builder

WORKDIR /build
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn clean package -DskipTests

# Stage 2: Lightweight Runtime Image
FROM eclipse-temurin:17-jre-alpine AS runner

WORKDIR /app

RUN addgroup -S marketlens && adduser -S marketlens -G marketlens

COPY --from=builder /build/target/*.jar app.jar

RUN chown -R marketlens:marketlens /app
USER marketlens

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=5s --start-period=15s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/health || exit 1

ENTRYPOINT ["java", "-jar", "app.jar"]
