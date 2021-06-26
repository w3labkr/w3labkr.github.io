가상 머신 복제
- 새 머신의 이름과 경로: 모든 네트워크 어댑터의 새 MAC 주소 생성
- 복제 방식: 완전한 복제

복제 후 네트워크 재시작
```shell
$ sudo -i
$ systemctl restart network
```

복제 후 호스트이름 변경
```shell
$ hostnamectl

# Example Domain
# This domain is for use in illustrative examples in documents. You may use this domain in literature without prior coordination or asking for permission.
# server1
#$ hostnamectl set-hostname server1.example.com
$ hostnamectl set-hostname server1
# server2
#$ hostnamectl set-hostname server2.example.com
$ hostnamectl set-hostname server2

# server 1 and 2
$ ifconfig
$ vim /etc/hosts
192.168.56.101 server1.example.com server1
192.168.56.102 server2.example.com server2
```