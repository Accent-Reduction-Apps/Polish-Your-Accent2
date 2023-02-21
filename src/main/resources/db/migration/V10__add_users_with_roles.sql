delete
from users_user_lessons;
delete
from users;

INSERT INTO users
(name, email_address, password, account_non_expired, account_non_locked, credentials_non_expired, enabled, role)
VALUES ('user2', 'user2@gmail.com', '$2a$10$kXe8lnESi50/OSGyxzujpONjX.zFOcjLrO7HYsI/0pxXrd3bP6owe', true, true, true,
        true, 'STUDENT');

INSERT INTO users
(name, email_address, password, account_non_expired, account_non_locked, credentials_non_expired, enabled, role)
VALUES ('user', 'user@gmail.com', '$2a$10$n9qzKpeOILMSxyAP.rirO.FFmAI/Kk6TnWHBoKzFLJ6oO9q0fBnTe', true, true, true,
        true, 'STUDENT');

INSERT INTO users
(name, email_address, password, account_non_expired, account_non_locked, credentials_non_expired, enabled, role)
VALUES ('admin', 'admin@gmail.com', '$2a$10$E3N.QMGGmzCOGKavhiXhSeH4r0RgyG38s8VOi2b/SclKmO1psYA8C', true, true, true,
        true, 'ADMIN');

INSERT INTO users
(name, email_address, password, account_non_expired, account_non_locked, credentials_non_expired, enabled, role)
VALUES ('staff', 'staff@gmail.com', '$2a$10$o0E4XlT.ZYMCUv2m13E2E.tSkyzvuLGy2zuiJSJhYnxUP.CkPjzHa', true, true, true,
        true, 'STAFF');