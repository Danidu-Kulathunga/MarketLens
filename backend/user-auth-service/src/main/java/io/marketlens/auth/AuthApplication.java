package io.marketlens.auth;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.Instant;
import java.util.Map;

@SpringBootApplication
@RestController
public class AuthApplication {

    public static void main(String[] args) {
        SpringApplication.run(AuthApplication.class, args);
    }

    @GetMapping("/health")
    public Map<String, Object> health() {
        return Map.of(
            "status", "healthy",
            "service", "user-auth-service",
            "timestamp", Instant.now().toString()
        );
    }

    @GetMapping("/api/v1/auth/roles")
    public Map<String, Object> roles() {
        return Map.of(
            "roles", new String[]{"ROLE_ANALYST", "ROLE_DATA_MANAGER", "ROLE_ADMIN"}
        );
    }
}
