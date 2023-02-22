CREATE SEQUENCE IF NOT EXISTS users_user_id_seq;

CREATE TABLE users
(
    user_id                 BIGINT NOT NULL DEFAULT nextval('users_user_id_seq'),
    name                    VARCHAR(255),
    password                VARCHAR(255),
    email_address           VARCHAR(255),
    account_non_expired     boolean,
    account_non_locked      boolean,
    credentials_non_expired boolean,
    enabled                 boolean,
    role                    VARCHAR(255),
    CONSTRAINT users_pkey PRIMARY KEY (user_id)
);

ALTER SEQUENCE users_user_id_seq OWNED BY users.user_id;