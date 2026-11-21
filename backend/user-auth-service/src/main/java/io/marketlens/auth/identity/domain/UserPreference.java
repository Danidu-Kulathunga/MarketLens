package io.marketlens.auth.identity.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "user_preferences")
public class UserPreference {
    @Id
    @Column(name = "user_id")
    private UUID userId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(nullable = false, length = 10) private String theme = "LIGHT";
    @Column(nullable = false, length = 10) private String language = "en";
    @Column(nullable = false, length = 50) private String timezone = "UTC";
    @Column(name = "default_currency", nullable = false, length = 3)
    private String defaultCurrency = "USD";
    @Column(name = "notifications_enabled", nullable = false) private boolean notificationsEnabled = true;
    @Column(name = "updated_at", nullable = false) private OffsetDateTime updatedAt;

    public UserPreference() {}

    @PrePersist @PreUpdate void touch() { updatedAt = OffsetDateTime.now(); }

    void setUser(User u) { this.user = u; }
    public UUID getUserId() { return userId; }
    public String getTheme() { return theme; }
    public void setTheme(String v) { theme = v; }
    public String getLanguage() { return language; }
    public void setLanguage(String v) { language = v; }
    public String getTimezone() { return timezone; }
    public void setTimezone(String v) { timezone = v; }
    public String getDefaultCurrency() { return defaultCurrency; }
    public void setDefaultCurrency(String v) { defaultCurrency = v; }
    public boolean isNotificationsEnabled() { return notificationsEnabled; }
    public void setNotificationsEnabled(boolean v) { notificationsEnabled = v; }
}
