## 도커 네트워크 유틸리티

패키지 확인
```shell
$ rpm -q bridge-utils net-tools
```

패키지 설치
```shell
$ yum install -y bridge-utils net-tools
```

도커 네트워크 확인
```shell
$ docker network inspect
```

브릿지 확인
```shell
$ docker network inspect bridge
```

네트워크 확인
```shell
$ docker network ls
```

새로운 브릿지 생성: 보안상 중요한 내용
```shell
$ docker network create --driver bridge mybridge
$ docker network ls
```

센트8 은 도커 내부에서 랜카드 확인 가능하다.
```shell
# 죽음
$ docker run -d --network mybridge centos:8
# 1시간 동안 죽지 않는 컨테이너 실행
$ docker run -d --network mybridge centos:8 /bin/sleep 3600s
$ docker ps 
```

비공개 웹서버 실행
```shell
$ docker run -d --network mybridge --name newhttpd httpd:2.4

$ docker exec -it newhttpd /bin/bash
$ echo "welcome to new apache" > htdocs/index.html
$ exit

$ docker run -d --name br_net_centos8 centos:8 /bin/sleep 3600s
$ docker ps 
```

네트워크 상태 확인
```shell
# 네트워크 관리 데몬 확인
$ pgrep -fl NetworkManager

# 랜카드 정보 확인
# NetworkManager를 사용하지 않으면 nmcli를 사용할 수 없다.
$ nmcli device status

# 브릿지 정보 확인
$ brctl show

# 도커 아이피 확인
$ ip addr show

# 도커 네트워크 확인
$ docker network ls
```

테스트 컨테이너 실행
- 커맨드 실행과 동시에 필요없는 컨테이너 삭제 옵션: --rm
- 커맨드 명령어를 보기위해선 백그라운드로 실행하면 안된다.
```shell
$ docker run --rm centos:8 /bin/curl http:172.8.0.3
```

브릿지 네트워크 확인
```
$ docker network inspect bridge
```

```shell
$ docker run -d --name=mycentos2 centos:8 /bin/sleep 1800s

$ docker network connect bridge newhttpd
$ docker network ls

$ docker exec -it mycentos2 /bin/bash
$ curl http://172.8.0.3
```

도커 네트워크 삭제
```shell
$ docker network disconnect bridge newhttpd
```

아이피 대역을 명시적으로 할당
```shell
$ docker network create --driver bridge custom_bridge \
--subnet 172.30.0.0/16 --ip-range 172.30.0.0/24 --gateway 172.30.0.1
$ docker network ls
$ docker network connect custom_bridge newhttpd
```

사용자 정의 호스트는 생성할 수 없다.
```shell
$ docker network create --driver host myhost
Error response from daemon: only one instance of "host" network is allowed
```

호스트타입의 네트워크 접속
```
$ docker run -d --network host --name host_net_centos8-2 centos:8 /bin/sleep 3600s
$ docker exec -it host_net_centos8-2

# 아이피 확인
$# ip addr show

# 호스트 확인
$# cat /etc/hosts

# 프로세스 확인
$# ps -ef

# .. 확인
$# cat /etc/resolv.conf
```

호스트타입
- bridge: 기본타입. 가장 많이 사용하고 추가 및 삭제 가능
- host: 호스트 네트워크를 같이 사용하기 위함
- none: 네트워크가 필요 없는 경우
```shell
$ nmcli dev status
$ docker network rm <network-id>
```

실행 권한: docker 를 실행하기 위한 권한은 docker 라는 그룹에 속해 있으면 된다.
```
$ groups
```

모든 도커 강제 삭제
```
$ dockr rm -f $(docker ps -aq)

# 엘리아스 등록
$ vim ~/.bashrc
$ alias rmcont='docker stop $(docker ps -q); docker rm $(docker ps -aq)'
```

## 실습1: 도커 실행
- httpd:2.4 아파치 이미지를 실행하고 초기 페이지를 변경
- curl http://x.x.x.x ==> Hello my container

도커 컨테이너 실행
```shell
$ docker pull httpd:2.4
$ docker run -d --name myapache httpd:2.4
```

컨테이너 인덱스 파일 수정
```shell
$ docker exec -it myapache /bin/bash
$ echo "Hello my container" > ./htdocs/index.html
$ exit
```

컨테이너 아이피 확인
```shell
$ docker container inspect myapache
$ curl http://172.17.0.1
```

아이피 확인
```shell
# -nltp n:number l:listen t:tcp p:process
$ netstat -nltp
$ docker container ps
```

## 실습2: 웹브라우저 확인
- nginx container 실행
- mswindows 웹브라우저로 초기페이지 확인

도커 컨테이너 실행
```shell
$ docker pull nginx

# 로컬 컴퓨터의 아이피는 생략가능하다.
$ docker container run -d --name webserver -p :80 nginx
```

방화벽 설정
```
# 포트 포워딩 확인
$ sudo firewall-cmd --list-all

# 도커는 iptables 사용하여 방화벽을 설정한다.
$ sudo iptables --table nat --list -n | grep 80
```

로컬 컴퓨터 아이피 확인
```
$ IPv4 Address
# ifconfig
enp0s3: inet
```
http://192.168.56.101:49153


## 실습3: 데이터베이스 생성
- mysql:5.5 => databse 생성
- create database mydb

도커 컨테이너 실행
```shell
$ docker pull mysql:5.5
$ docker run -d mysql:5.5
```

도커 컨테이너 디버깅
```shell
#$ docker container logs <container-id>
$ docker container logs interesting_lichterman
error: database is uninitialized and password option is not specified
  You need to specify one of MYSQL_ROOT_PASSWORD, MYSQL_ALLOW_EMPTY_PASSWORD and MYSQL_RANDOM_ROOT_PASSWORD

$ docker run -d --env MYSQL_ROOT_PASSWORD=mypass --name mysql5 mysql:5.5
```

도커 데이터베이스 생성
```
$ docker exec -it mysql5 /bin/bash
$ mysql -u root -pmypass
mysql> create database mydb;
mysql> show databases;
mysql> exit;
```