package io.marketlens.auth.identity.seed;

import io.marketlens.auth.identity.domain.*;
import io.marketlens.auth.identity.repository.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.ApplicationArguments;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.core.env.Environment;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

/**
 * Creates one dev user per role. Runs only under the "dev" profile.
 * Credentials come from environment variables / config, never from the repo:
 *   MARKETLENS_SEED_ANALYST_EMAIL / _PASSWORD
 *   MARKETLENS_SEED_DATA_MANAGER_EMAIL / _PASSWORD
 *   MARKETLENS_SEED_ADMIN_EMAIL / _PASSWORD
 * A user is skipped (with a warning) if either value is missing.
 */
@Component
@Profile("dev")
public class DevUserSeeder implements ApplicationRunner {
    private static final Logger log = LoggerFactory.getLogger(DevUserSeeder.class);

    private static final Map<String, String> ROLE_TO_KEY = Map.of(
            "ROLE_ANALYST", "ANALYST",
            "ROLE_DATA_MANAGER", "DATA_MANAGER",
            "ROLE_ADMIN", "ADMIN");

    private final UserRepository users;
    private final RoleRepository roles;
    private final PasswordEncoder encoder;
    private final Environment env;

    public DevUserSeeder(UserRepository users, RoleRepository roles, PasswordEncoder encoder, Environment env) {
        this.users = users; this.roles = roles; this.encoder = encoder; this.env = env;
    }

    @Override
    @Transactional
    public void run(ApplicationArguments args) {
        ROLE_TO_KEY.forEach((roleName, key) -> {
            String email = env.getProperty("MARKETLENS_SEED_" + key + "_EMAIL");
            String password = env.getProperty("MARKETLENS_SEED_" + key + "_PASSWORD");
            if (email == null || email.isBlank() || password == null || password.isBlank()) {
                log.warn("Seed skipped for {}: credentials not configured", roleName);
                return;
            }
            if (users.existsByEmailIgnoreCase(email)) return;

            Role role = roles.findByName(roleName).orElseThrow();
            User u = new User(email, encoder.encode(password));
            u.getRoles().add(role);
            u.setProfile(new UserProfile(key, "Dev", key + " Dev"));
            u.setPreference(new UserPreference());
            users.save(u);
            log.info("Seeded dev user for {}", roleName);
        });
    }
}
