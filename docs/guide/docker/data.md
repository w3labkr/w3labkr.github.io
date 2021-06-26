
## 쓰기 권한 문제 확인

```
$ sudo mkdir /var/dbdata
```

```shell
$ getenforce
Enforcing
```

```shell
$ ls -Zd /var/dbdata
drwxr-xr-x. root root unconfined_u:object_r:var_t:s0   /var/dbdata
```

## 데이터베이스 영구 저장

```shell
$ docker run -d --volume=/var/dbdata:/var/lib/mysql --name=mydb2 --env MYSQL_ROOT_PASSWORD=mypass mysql:5.5

$ docker exec -it mydb2 /bin/bash

# 마운트 데이터 위치 확인
$# df -h
# 숨겨진 마운트 데이터 위치 확인
$# df -h -a
$# mysql -u root -pmypass

mysql> create database mydatabase;
mysql> show databases;
mysql> use mydatabase;
mysql> create table mytable
( 
    name char(10),
    id char(10) not null,
    address varchar(40)
);
mysql> show tables;
mysql> insert into mytable (name,id,address) values('kildong','kildong','Seoul');
mysql> select * from mytable;
mysql> exit

$# exit

$ df -h /var/dbdata
$ ls /var/dbdata
```

## 실습
- ngnix 컨터이너를 초기 페이지 변경 => Hello Ngnix
- ngnix 컨터이너 삭제 후 새로 컨테이너 올렸을때에도 Hello Nginx 웹페이지가 여전히 출력될 수 있도록 하세요.
- 확인: curl http://nginx컨테이너주소 => Hello Nginx 가 출력 되어야 함.

clean
```shell
$ docker rm -f $(docker ps -aq)
$ docker ps -a
```

```shell
$ mkdir data

# 마운트 디렉토리 확인
$ docker run -d --name webserver -p :80 nginx
$ docker exec -it webserver /bin/bash
$# find / -name index.html
/usr/share/nginx/html/index.html
$# exit

# 볼륨 설정
$ docker run -d --volume=/home/devops/data:/usr/share/nginx/html --name webserver -p :80 nginx
$ docker exec -it webserver /bin/bash
$# echo "Hello Nginx" > /usr/share/nginx/html/index.html
$# exit

$ ls data
index.html

$ ip addr show
$ curl http://192.168.56.101:49155
Hello Nginx

$ docker rm -f $(docker ps -aq)
$ docker run -d --volume=/home/devops/data:/usr/share/nginx/html --name webserver -p :80 nginx
$ ip addr show
$ curl http://192.168.56.101:49156
```
