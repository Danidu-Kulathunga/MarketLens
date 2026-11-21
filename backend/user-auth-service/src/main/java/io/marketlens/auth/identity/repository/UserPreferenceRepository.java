package io.marketlens.auth.identity.repository;

import io.marketlens.auth.identity.domain.UserPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface UserPreferenceRepository extends JpaRepository<UserPreference, UUID> {}
