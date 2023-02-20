CREATE SEQUENCE IF NOT EXISTS app_simple_granted_authority_seq;

CREATE TABLE app_simple_granted_authority
(
    authority_id BIGINT NOT NULL,
    authority    VARCHAR(255),
    user_id      BIGINT REFERENCES users (user_id)
);