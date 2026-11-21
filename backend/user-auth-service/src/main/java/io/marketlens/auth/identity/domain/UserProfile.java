package io.marketlens.auth.identity.domain;

import jakarta.persistence.*;
import java.time.OffsetDateTime;
import java.util.UUID;

@Entity
@Table(name = "user_profiles")
public class UserProfile {
    @Id
    @Column(name = "user_id")
    private UUID userId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "first_name", length = 100) private String firstName;
    @Column(name = "last_name", length = 100)  private String lastName;
    @Column(name = "display_name", length = 100) private String displayName;
    @Column(length = 30) private String phone;
    @Column(name = "avatar_url", length = 500) private String avatarUrl;

    @Column(name = "created_at", nullable = false, updatable = false) private OffsetDateTime createdAt;
    @Column(name = "updated_at", nullable = false) private OffsetDateTime updatedAt;

    protected UserProfile() {}
    public UserProfile(String firstName, String lastName, String displayName) {
        this.firstName = firstName; this.lastName = lastName; this.displayName = displayName;
    }

    @PrePersist void onCreate() { createdAt = updatedAt = OffsetDateTime.now(); }
    @PreUpdate  void onUpdate() { updatedAt = OffsetDateTime.now(); }

    void setUser(User u) { this.user = u; }
    public UUID getUserId() { return userId; }
    public String getFirstName() { return firstName; }
    public void setFirstName(String v) { firstName = v; }
    public String getLastName() { return lastName; }
    public void setLastName(String v) { lastName = v; }
    public String getDisplayName() { return displayName; }
    public void setDisplayName(String v) { displayName = v; }
    public String getPhone() { return phone; }
    public void setPhone(String v) { phone = v; }
    public String getAvatarUrl() { return avatarUrl; }
    public void setAvatarUrl(String v) { avatarUrl = v; }
}
