CREATE DATABASE todo_app;
CREATE USER 'hogehoge' IDENTIFIED WITH caching_sha2_password BY 'pass';

GRANT ALL PRIVILEGES ON *.* TO 'hogehoge'@'%';

FLUSH PRIVILEGES;
