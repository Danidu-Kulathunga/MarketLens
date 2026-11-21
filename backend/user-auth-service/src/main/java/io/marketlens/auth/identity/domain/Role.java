package io.marketlens.auth.identity.domain;

import jakarta.persistence.*;

@Entity
@Table(name = "roles")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true, length = 30)
    private String name;               // ROLE_ANALYST | ROLE_DATA_MANAGER | ROLE_ADMIN

    @Column(length = 255)
    private String description;

    protected Role() {}

    public Long getId() { return id; }
    public String getName() { return name; }
    public String getDescription() { return description; }
}
