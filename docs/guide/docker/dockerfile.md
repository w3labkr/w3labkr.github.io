## 도커 재시작
```shell
$ mkdir work
$ cd work
$ pwd
/home/devops/work

# 도커가 프로세스에 올라와 있는지 확인하기
$ pgrep -fl docker

# 서버 재시작시 도커 시작
$ systemctl enable docker
$ systemctl start docker
```

## 도커 파일 제작
```shell
$ vim Dockerfile
FROM alpine:latest

RUN echo "hello"
RUN echo "container test"
RUN touch /tmp/testfile

# 도커파일 이름이 기본 이름일 경우
$ docker build --tag myimage:1.0 /home/devops/work

# 도커파일 이름이 기본 이름이 아닐경우
$ cp Dockerfile myfile
$ docker build --tag myimage:1.1 -f myfile .

# 도커실행
$ docker run -d myimage:1.0 /bin/sleep 3600s
$ docker exec -it tender_cartwright /bin/bash
$# df -h
$# ifconfig

# apk: 기본 패키지 관리 도구
$# apk update
$# apk add vim
$# apk add apache2

$# cd /etc/apache2
$# grep DocumentRoot httpd.conf
$# cd /var/www/localhost/htdocs
$# cat index.html
```

## RUN / ENTRYPOINT / CMD

도커 빌드 중에 새로운 파일을 만들 경우에는 적용되지 않는다. 
- 고정된 인수를 계속 사용할때 ENTRYPOINT 를 사용하고 
- 인수가 변경될 수 있을떄 CMD 커맨드를 사용한다.
- 대괄호가 없으면 단독으로 실행되고
- 대괄호가 있으면 shell 로 처리 된다.

### RUN

- 모든 파일을 도커 데몬으로 전송 함.
- 실제 빌드에 사용되는 시간이 적게 걸리나 도커 데몬에 전송할때 시간이 많이 걸림.
- 빌드를 할때 파일이 없는 곳에서 하던가 .dockerignore 파일 생성 후 예외처리 필요.
- 작업 디렉토리에 파일이 많거나 용량이 큰 경우에는 추천하지 않음

```shell
$ vim Dockerfile
FROM centos:7

RUN touch /tmp/testfile
RUN cal
RUN echo "hello linux"
# Do not run sleep
#RUN /bin/sleep 3600s

$ docker build --tag myweb:1.0 .
```

```shell
$ sudo cp Dockerfile /usr/
$ cd /usr
$ cat Dockerfile
$ sudo docker build -t newimage:1.0 .

# 용량 확인
$ sudo du -sh /usr
1.7G    /usr

# 도커 이그노어 파일 추가
$ sudo vim .dockerignore
*
!Dockerfile

$ ls -a
$ sudo docker build -t newimage:2.0 .
```

### CMD

- CMD 와 ENTRYPOINT 는 하나의 도커 파일내에서 한번만 사용할 수 있다.
- 도커 이미지를 빌드할때 말고 컨테이너를 실행할 떄 실행하는 명령어 이다.
- 중복으로 입력될 경우 가장 마지막에 있는 커맨드만 실행된다.

shell 형식
```shell
$ vim Dockerfile

# /bin/sleep 는 바이너리 데이터 이기 때문에 -c 옵션을 사용하여 실행한다.
# bash에서 -c 옵션이란 파라미터 변수값을 변경해주는 옵션이다.
# shell 타입: /bin/sh -c /bin/sleep 7200s
CMD /bin/sleep 3600s

$ docker build -t myimage:3.1 .
$ docker run -d myimage:3.1

# 따옴표를 붙이지 않을 경우에는 cal 인수를 무시한다.
$ /bin/bash -c 'cal 07 2021'
```

exec 형식
```shell
CMD ["/bin/sleep", "3600s"]
# shell 타입의 커맨드와 결과적으로 동일
#CMD /bin/sleep 3600s
#CMD ["/bin/sleep", "-c", "/bin/sleep", "3600s"]

$ docker build -t myimage:3.2 .
$ docker run -d myimage:3.2
```

### ENTRYPOINT

top
```shell
# process 를 3초마다 갱신해서 보여준다. 모니터링 목적으로 사용 된다.
$ top
# 5초마다 갱신 된다.
$ top -d 5
```

ENTRYPOINT 의 다음에 CMD가 사용될 경우 CMD는 ENTRYPOINT의 인수로서 사용된다.

shell 형식
```shell
ENTRYPOINT ["/bin/top"]

# 인수가 없을경우의 기본값으로 사용 된다.
CMD ["-d", "5"]

# 모니터에 무엇인가를 계속 출력시킬경우 -t:terminal 옵션이 필요하다.
$ docker build -t myimage:4.0 .
$ docker run -d -t myimage:4.0

# 인수를 직접 전달 할 수 있다.
$ docker run -d -t myimage:4.0 "-d 1"
```

ENTRYPOINT 에 인수를 독립적으로 사용할 경우. 인수가 바꿀 수 없는 값으로 적용된다.

```shell
# 인수를 전달 받지 못하는 기본값으로 적용 된다.
ENTRYPOINT ["/bin/top", "-d", "5"]

$ docker build -t myimage:4.1 .
$ docker run -d -t myimage:4.1
```

## Unbuild 
```shell
$ vim Dockerfile
FROM ubuntu:18.04

# RUN 이 실행될때마다 layer 가 생성되어 성능에 안좋은 영향을 미친다. 한줄로 합치자.
RUN apt-get -y update
RUN apt-get -y upgrade
RUN apt-get -y install nginx

EXPOSE 80

CMD ["nginx", "-g", "daemon off"]

$ docker build -t mynginx:1.0 .
$ docker run -d -t mynginx:1.0
```