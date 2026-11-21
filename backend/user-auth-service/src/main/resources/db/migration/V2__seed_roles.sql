-- Reference data only. Dev users are created by DevUserSeeder (credentials from env).
INSERT INTO roles (name, description) VALUES
 ('ROLE_ANALYST',      'Market Analyst: explores markets, portfolios, news, AI and predictions'),
 ('ROLE_DATA_MANAGER', 'Data Manager: imports data, monitors ETL, resolves quality issues'),
 ('ROLE_ADMIN',        'System Administrator: users, roles, API keys, settings, audit');
