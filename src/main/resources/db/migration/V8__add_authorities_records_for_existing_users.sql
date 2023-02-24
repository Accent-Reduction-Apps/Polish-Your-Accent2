-- user2
insert into app_simple_granted_authority (user_id, authority)
values (1, 'lessons:view');
insert into app_simple_granted_authority (user_id, authority)
values (1, 'lessons:change');
insert into app_simple_granted_authority (user_id, authority)
values (1, 'users:view');
insert into app_simple_granted_authority (user_id, authority)
values (1, 'users:change');
insert into app_simple_granted_authority (user_id, authority)
values (1, 'STUDENT');
-- user
insert into app_simple_granted_authority (user_id, authority)
values (2, 'lessons:view');
insert into app_simple_granted_authority (user_id, authority)
values (2, 'lessons:change');
insert into app_simple_granted_authority (user_id, authority)
values (2, 'users:view');
insert into app_simple_granted_authority (user_id, authority)
values (2, 'users:change');
insert into app_simple_granted_authority (user_id, authority)
values (2, 'STUDENT');
-- admin
insert into app_simple_granted_authority (user_id, authority)
values (3, 'lessons:view');
insert into app_simple_granted_authority (user_id, authority)
values (3, 'lessons:add');
insert into app_simple_granted_authority (user_id, authority)
values (3, 'lessons:change');
insert into app_simple_granted_authority (user_id, authority)
values (3, 'lessons:delete');
insert into app_simple_granted_authority (user_id, authority)
values (3, 'users:view');
insert into app_simple_granted_authority (user_id, authority)
values (3, 'users:add');
insert into app_simple_granted_authority (user_id, authority)
values (3, 'users:change');
insert into app_simple_granted_authority (user_id, authority)
values (3, 'users:delete');
insert into app_simple_granted_authority (user_id, authority)
values (3, 'ADMIN');
-- staff
insert into app_simple_granted_authority (user_id, authority)
values (4, 'lessons:view');
insert into app_simple_granted_authority (user_id, authority)
values (4, 'lessons:add');
insert into app_simple_granted_authority (user_id, authority)
values (4, 'lessons:change');
insert into app_simple_granted_authority (user_id, authority)
values (4, 'lessons:delete');
insert into app_simple_granted_authority (user_id, authority)
values (4, 'users:view');
insert into app_simple_granted_authority (user_id, authority)
values (4, 'users:add');
insert into app_simple_granted_authority (user_id, authority)
values (4, 'users:change');
insert into app_simple_granted_authority (user_id, authority)
values (4, 'users:delete');
insert into app_simple_granted_authority (user_id, authority)
values (4, 'STAFF');