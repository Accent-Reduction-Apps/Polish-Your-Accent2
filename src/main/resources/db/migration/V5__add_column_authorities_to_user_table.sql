Alter table users
    ADD FOREIGN KEY (user_authorities) REFERENCES app_simple_granted_authority (authority_id);