# Dockerfile2

Clear Docker Container
```shell
$ docker container stop $(docker ps -q)
$ docker container rm $(docker ps -aq)
$ docker ps -a
```

Create Dockerfile
```shell
$ cd /home/devops/work
$ docker images | grep ubuntu
$ vim Dockerfile
FROM ubuntu:18.04

RUN apt update && apt -y upgrade
RUN apt -y install nginx

EXPOSE 80

ONBUILD ADD website.tar /var/www/html

CMD ["nginx", "-g", "daemon off;"]
```

Create Example Files
```shell
$ mkdir src && cd src
$ touch site.jpg 
$ touch test.gif
$ echo "Hello nginx" > test.html
$ cd ..
$ tar -cf website.tar src/*
```

OnBuild
```
$ docker build --tag mynginx:1.0 .
$ docker run -d mynginx:1.0

$ docker exec -it zen_leakey /bin/bash
$ docker run -d newnginx:1.0
$ ls /var/www/html

$ docker run -d --name newnginx2 -p :80
```

Check IP
```
$ who
root     tty1         2021-06-19 15:22
devops   pts/0        2021-06-19 18:29 (192.168.56.1)
```



아래 명령어들은 도커 이미지가 커지는 것과 관계가 있다.
- ADD: tar 파일을 풀어서 복사 한다.
```
FROM RUN COPY ADD
```

## 실습
아래의 작업 내용을 Dockerfile 로 작성해서 실행하세요.

도커이미지 생성을 위한 베이스 이미지를 
http://twoseven.kr/mycentos.tar.bz2
파일을 wget 으로 다운로드 받아서 사용하세요

다운로드 받은 base image 를 사용하여
아파치를 설치하고 초기페이지는 welcome to my apache server ^^
가 출력되게 설정하세요

컨테이너 실행후
웹서버 초기페이지를 볼수 있어야 합니다.

```shell
$ curl http://x.x.x.x
```

* mycentos.tar.bz2 이미지는 centos:7 이미지 파일기반으로 만들어졌으며 
 mycentos.tar.bz2 에는  yum 명령어로  패키지 설치를 위한 repository 파일(/etc/yum.repos.d/CentOS-Base.repo 파일이 없습니다. 
 yum 으로 인터넷 저장소  패키지를 내려받아서 설치하기 위해서는 CentOS-Base.repo 파일이 필요합니다.


<http://twoseven.kr/weekend>
```
$ sudo yum -y install wget bzip2
$ wget http://twoseven.kr/mycentos.tar.bz2
$ bzip2 -d mycentos.tar.bz2

$ docker rmi mycentos:7
$ docker image load -i mycentos.tar
$ docker images | grep mycentos
mycentos                  7         40c5fc736048   6 months ago    204MB

$ mkdir files
$ cp /etc/yum.repos.d/CentOS-Base.repo ./files
$ echo "welcome to my apache server ^^" > ./files/index.html

$ vim Dockerfile
FROM mycentos:7

LABEL maintainer "lee<lee@google.com>"
LABEL title Docker Lab
LABEL version 1.0
LABEL description="This is just docker lab for practice"

ADD ./files/CentOS-Base.repo /etc/yum.repos.d

RUN yum -y install httpd
ADD ./files/index.html  /var/www/html

EXPOSE 80

ENTRYPOINT ["httpd","-D","FOREGROUND"]

$ docker build -t myapache:3.0 .
$ docker run -d --name webserver myapache:3.0
$ docker container inspect webserver | grep IPAddress
"SecondaryIPAddresses": null,
"IPAddress": "172.17.0.2",
        "IPAddress": "172.17.0.2",

$ curl http://172.17.0.2
```