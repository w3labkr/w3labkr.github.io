# Docker

리눅스 탭키 자동 완성
```
$ rpm -q bash-completion
```

인터넷은 두번쨰 아이피로 확인

사용했던 커맨드 확인
```
$ history
```

비밀번호 변경
```
$ passwd devops
```

도커 컨테이너 확인
```
$ docker ps -a
```

도커 컨테이너 아이디 확인
```
$ docker ps -aq
```

도커 컨테이너 삭제
```
$ docker container rm <container-id>
```

도커 모든 컨테이너 강제 삭제
```
$ docker container rm -f $(docker ps -aq)
```

리눅스 커맨드 추가
```
$ vim /home/devops/bin/rmct

#! /bin/bash
docker stop $(docker ps -q)
docker rm -f $(docker ps -aq)

$ chmod u+x /home/devops/bin/rmct
```