도커 실행
```
$ docker rm -f $(docker ps -aq)
$ docker run -d --name myapache httpd:2.4
```

도커 내부
```shell
$ docker exec -it myapache /bin/bash
$# useradd webmaster
$# passwd webmaster

$# yum -y install httpd
$# cat /etc/redhat-release
$# cat /etc/issue

$# apt update
$# apt install -y httpd
$# apt install -y vim

# 랜카드 확인
$# apt install net-tools
```

## 도커 이미지 생성

바뀐내용 확인
```shell
$ docker container diff myapache
$ diff /etc/issue /etc/issue.net
```

도커이미지 생성
- -a:author
```shell
$ docker container commit -a "hong kilgond<kildong@gmail.com>" webserver custom_apache:v1.0
$ docker run -d custom_apache:v1.0
$ docker ps
$ docker exec -it thirsty_heyrovsky /bin/bash

$# useradd -D
$# useradd -m testuser
$# ls /home
$# ls /home -F
$# exit
```