-- init-db.sql no longer creates users (M5 owns it via Flyway), so the FKs from
-- tables created there are added here, once users exists.
DO $$
BEGIN
    IF to_regclass('public.portfolios') IS NOT NULL
       AND NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_portfolios_user') THEN
        ALTER TABLE portfolios
            ADD CONSTRAINT fk_portfolios_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
    IF to_regclass('public.watchlists') IS NOT NULL
       AND NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'fk_watchlists_user') THEN
        ALTER TABLE watchlists
            ADD CONSTRAINT fk_watchlists_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE;
    END IF;
END $$;
