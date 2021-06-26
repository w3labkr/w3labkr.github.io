# MySQL

## Syntax
```shell
$ docker run -d \
--name mydb \
--env MYSQL_ROOT_PASSWORD=<password> \
--env MYSQL_USER=<dbuser> \
--env MYSQL_PASSWORD=<dbpass> \
--env MYSQL_DATABASE=<dbname> \
mysql:5.5
```

## Example

standard alone
```shell
$ docker run -d --name mydb --env MYSQL_ROOT_PASSWORD=123456 --env MYSQL_USER=user1 --env MYSQL_PASSWORD=123456 --env MYSQL_DATABASE=userdb mysql:5.5
```

link apache
```
docker run -d --name myhttpd --link mydb:mydatabase httpd:2.4
```