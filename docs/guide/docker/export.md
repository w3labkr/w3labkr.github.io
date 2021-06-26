## 도커 컨테이너 내보내기
도커 컨테이너를 tar 파일로 내보낼경우 아파치 실행이 안되기 떄문에 도커 이미지를 tar 파일로 내보내야 한다.

```shell
$ docker run -d httpd:2.4
$ docker ps
CONTAINER ID   IMAGE       COMMAND              CREATED         STATUS         PORTS     NAMES
5186616688f9   custom_apache:v1.0   "httpd-foreground"   38 minutes ago   Exited (0) 32 minutes ago             thirsty_heyrovsky

# 1> 표준출력
# 전체 파일을 통압축 하는 것과 동일: $ tar -cf apache2.4.tar /
$ docker container export thirsty_heyrovsky 1>  apache2.4
```

예제
```shell
$ mkdir temp
$ mv apache2.4 ./temp/
$ cd ./temp/
$ tar -xf apache2.4
$ ls
```

```
$ cat apache2.4.tar | docker images

$ dockr run -d myapache:1.0 /bin/sleep 3600s
$ docker inspect <container-id> | grep 172
$ curl http://<IPAddress>

$ docker ps --no-trunc
$ docker run -d myapache:1.0 httpd-foreground
$ docker history <docker-image>
```

## 네트워크 끊기

```shell
# 네트워크 상태 확인
$ nmcli device
DEVICE   TYPE      STATE      CONNECTION
enp0s8   ethernet  connected  enp0s8
enp0s3   ethernet  connected  enp0s3
docker0  bridge    unmanaged  --
lo       loopback  unmanaged  --

# 인터넷이 실행되는 enp0s8 번 기기 네트워크 끊기
$ sudo nmcli device disconnect enp0s8
Device 'enp0s8' successfully disconnected.

$ ping google.com
ping: google.com: Name or service not known
```

## 도커 이미지 내보내기 및 불러오기

server1 내보내기
```shell
$ docker image save -o httpd-2.4.tar httpd:2.4
$ tar -tf httpd-2.4.tar
# ssh 를 이용한 다른 서버에 파일 전송
$ scp httpd-2.4.tar server2:/home/devops
```

server2 불러오기
```shell
# 도커 컨테이너 강제 삭제
$ docker rm -f $(docker ps -aq)
# 도커 이미지 강제 삭제
$ docker rmi -f $(docker images -q)
$ docker image load -i httpd-2.4.tar
```