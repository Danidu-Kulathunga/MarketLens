package io.marketlens.auth.identity.repository;

import io.marketlens.auth.identity.domain.User;
import org.springframework.data.jpa.repository.*;
import java.util.Optional;
import java.util.UUID;

public interface UserRepository extends JpaRepository<User, UUID> {
    @Query("select u from User u where lower(u.email) = lower(:email)")
    Optional<User> findByEmailIgnoreCase(String email);

    @Query("select count(u) > 0 from User u where lower(u.email) = lower(:email)")
    boolean existsByEmailIgnoreCase(String email);

    @EntityGraph(attributePaths = "roles")
    @Query("select u from User u where lower(u.email) = lower(:email)")
    Optional<User> findWithRolesByEmail(String email);
}
