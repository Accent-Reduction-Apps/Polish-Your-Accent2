ALTER TABLE users
    ADD account_non_expired     boolean,
    ADD account_non_locked      boolean,
    ADD credentials_non_expired boolean,
    ADD enabled                 boolean,
    ADD role                    VARCHAR(255);