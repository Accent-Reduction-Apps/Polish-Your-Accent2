delete
from users_user_lessons;
delete
from users;

INSERT INTO users
(name, email_address, password, account_non_expired, account_non_locked, credentials_non_expired, enabled, role)
VALUES ('Dawid Deszcz', 'emailDawid@gmail.com', 'hasloDawid', true, true, true, true, 'STUDENT');

INSERT INTO users
(name, email_address, password, account_non_expired, account_non_locked, credentials_non_expired, enabled, role)
VALUES ('Sebastian Sosin', 'emailSebastian@gmail.com', 'hasloSebastian', true, true, true, true, 'STUDENT');

INSERT INTO users
(name, email_address, password, account_non_expired, account_non_locked, credentials_non_expired, enabled, role)
VALUES ('Mateusz Gasior', 'emailMateusz@gmail.com', 'hasloMateusz', true, true, true, true, 'STUDENT');

INSERT INTO users
(name, email_address, password, account_non_expired, account_non_locked, credentials_non_expired, enabled, role)
VALUES ('Marcin Szuwalski', 'emailMarcin@gmail.com', 'hasloMarcin', true, true, true, true, 'STUDENT');

INSERT INTO users
(name, email_address, password, account_non_expired, account_non_locked, credentials_non_expired, enabled, role)
VALUES ('user', 'user@gmail.com', 'userPass', true, true, true, true, 'STUDENT');

INSERT INTO users
(name, email_address, password, account_non_expired, account_non_locked, credentials_non_expired, enabled, role)
VALUES ('admin', 'admin@gmail.com', 'adminPass', true, true, true, true, 'ADMIN');

INSERT INTO users
(name, email_address, password, account_non_expired, account_non_locked, credentials_non_expired, enabled, role)
VALUES ('staff', 'staff@gmail.com', 'staffPass', true, true, true, true, 'STAFF');