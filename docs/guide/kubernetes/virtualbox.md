## 호스트 네트워크 관리자

이름: VirtualBox Host-Only Ethernet Adapther
IPv4 주소/마스크: 192.168.100.1/24
IPv6 주소/마스크: 
DHCP 서버: 사용 안함

수동으로 어댑터 설정

- IPv4: 192.168.100.1
- IPv4 서브넷 마스크(M): 255.255.255.0


## 가상서버 랜카드 설정

가상 서버 실행 후

```sh
$ nmtui
Edit a connect

# 첫번째 랜카드: 고정 아이피 등록
enp0s3: 
- IPv4: manual 
- Addresses: 192.168.100.10/24
- 외부 네트워크가 되지 않기 때문에 게이트웨이가 필요없다.
- Automatically connect: 체크

# 두번째 랜카드
enp0s8:
- Automatically connect: 체크

$ systemctl restart network
$ ip addr show
```

## 가상서버 아이피 변경 시
```sh
$ nmcli connection reload
$ nmcli connection enp0s3

$ ping node1
```

## ERROR

```
$ kubectl get node
The connection to the server localhost:8080 was refused - did you specify the right host or port?

$ sudo cp -i /etc/kubernetes/admin.conf $HOME/.kube/config
$ sudo chown admin:admin /home/admin/.kube/config
```

## PODS

파드(pods)는 워크노드에서만 실행 되며 마스터노드에서는 실행되지 않는다.

식별은 포트 번호를 사용한다.

보통은 운영시 유지관리를 위해서 
한개의 파드에 한개의 컨테이너를 사용한다.

웹서버 운영시 하나의 파드에 웹서버 컨테이너를, 
또 다른 하나의 파드에 디비 컨테이너를 둔다.

```sh
$ kubectl run mynginx --image=nginx:latest
$ kubectl run nginx --image=nginx:latest
$ kubectl get pods -o wide
```

여기에 보이지 않는것은 도커에서 사용되고 있다.

```sh
$ ps -e | grep kube
976 ?        00:05:15 kubelet
3575 ?        00:00:01 kube-proxy
4181 ?        00:00:00 kube-utils
6664 ?        00:01:35 kube-controller
6671 ?        00:00:26 kube-scheduler
7137 ?        00:07:49 kube-apiserver
```

도커 소켓파일은 제3자는 사용할수 없게 되어 있어 도커 데몬으로 접속을 할수 없다.
```
$ sudo usermod -G docker admin
$ groups
$ ls /var/run/*sock -l
srw-rw----. 1 root docker 0  7월 10 11:04 /var/run/docker.sock
srwxr-xr-x. 1 root root   0  7월 10 11:04 /var/run/dockershim.sock
```

워커노드에서는 도커와 큐블렛을 확인한다.

```sh
# 실행 중인지 확인
$ pgrep -fl docker
$ kubelet

$ systemctl restart docker
$ systemctl restart kubelet

$ systemctl enable docker kubelet
```

역할 구분

- kubelet: 파드를 실행 시켜 주는 역할
- kube-proxy: 패킷을 전달 시켜 주는 역할
- kube-apiserver: 가장 핵심이 되는 기능이며, kubectl 커맨드를 전달하는 역할을 한다.
- kube-scheduler: 어떤 노드에 하드를 어디에 배치할 것인가

계정 설정 확인
```sh
$ kubectl config view
```

파일 생성
```yaml
apiVersion:
Kind: 컨테이너
metadata:
spec: 오브젝트에 따라서 다른 이름으로 대체 될 수도 있다.
```
