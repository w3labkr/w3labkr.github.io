# Kubernetes

멀티노드
오케스트레이션툴

docker swarm: 수백대 이상의 장비가 많은 상황에선 유지보수 어려움
kubernetes: 표준
openshift(redhat): 쿠버네티스 기반으로 만들어짐. 사용이 편리.

하드웨어 사양
- 권장 서버: 최소 3대
- 권장 메모리 16GB, 최소 8GB
- 메모리가 8GB가 안되는 사람은 minikube 이용한다.

ram 8기가 이면
- master: ram 2G
- worker: ram 1G

ram 16기가 이상이면
- master: ram 4G
- worker node: ram 2G

minikube
- master 1대가 worker 노드 기능까지 같이 하는거


kubectl autocompletion
```
$ vim ~/.bashrc
# Enable kubectl autocompletion
echo 'source <(kubectl completion bash)' >>~/.bashrc

$ source ~/.bashrc
```
## 서버 중단
```
$ ssh root@server2 poweroff
$ sudo poweroff
```

## 가상환경 설정
쿠버네트스의 약자: k8s
- 종류: Linux
- 버전: Red Hat (64-bit)
- 이름: k8s-master
- IDE: centos7
- 메모리: 4096
- 프로세서: 2
- 네트워크1: 호스트 전용 어댑터
- 네트워크2: nat - weave (사설 네트워크 전용)
- 네트워크2: bridge - calico
- 가상 하드 디스크: 30GB

호스트 네트워크 관리자 IP 변경
- DHCP 서버: 체크 해제
- IPv4(Window): 192.168.100.1
- IPv4(Linux): 192.168.100.10

## 네크워크 설정

랜카드 설정
```shell
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
$ ping google.com
```

## 워커노드 생성

snapshot
```shell
$ poweroff
```

k8s-worker1, k8s-worker2
- MAC 주소 정책: 모든 네트워크 어댑터의 새 MAC 주소 생성
- 완전한 복제
- 현재 머신 상태
- 메모리: 2048

## 호스트 설정

master
```shell
$ yum -y install vim
$ vim /etc/hosts
192.168.100.10 master.example.com master
192.168.100.20 node1.example.com node1
192.168.100.30 node2.example.com node2

$ hostnamectl set-hostname master.example.com
$ hostname
$ scp root@192.168.100.20:/etc/hosts .
$ scp root@192.168.100.30:/etc/hosts .
```

node1
```shell
$ hostnamectl set-hostname node1.example.com
$ hostname
```

node2
```shell
$ hostnamectl set-hostname node2.example.com
$ hostname
```

## 클러스터 구성

Commands
- kubeadm: 클러스터 생성
- kubespray: 

곧통: 재 부팅 후 한번 더 실행
```shell
$ yum -y install wget
$ wget http://twoseven.kr/weekend/k8s_cluster_install
$ chmod u+x k8s_cluster_install
$ ./k8s_cluster_install
```

마스터 노드
--pod-network-cidr=<unusage_ip_address>
--apiserver-advertise-address=<master_ip_address>
-- 브릿지를 사용하지 않기 떄문에 칼립포는 동작 하지 않는다.

```shell
$ kubeadm init --pod-network-cidr=192.168.199.0/24 --apiserver-advertise-address=192.168.100.10
$ export KUBECONFIG=/etc/kubernetes/admin.conf

$ vim token.txt
kubeadm join 192.168.100.10:6443 --token 4zend8.nregipq7cas5t5u2 \
        --discovery-token-ca-cert-hash sha256:764295862ad101cc7a76c8f77d9ddc648cae3f08256138cae8c4d96415ff1065

$ scp token.txt root@node1.example.com:/root/

$ kubectl apply -f https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')
$ kubectl get nodes
$ kubectl get pods --all-namespaces
```

워커 노드
- 쿠버네트스 토큰의 해시값이 마스터와 노드서버가 동일하지만 안되는 경우는 토큰이 잘못 만들어진 경우로 새로 만들어야 한다.
```
$ chmod u+x token.txt
$ ./token.txt
$ md5sum token.txt
eac078548423786e7912edc0f91e276a  token.txt
```

토큰 새로 발급
- 토큰은 마스터 노드에서 발급 받고 워커 노드에 배포 한다.
- 유효기간이 하루로 하루가 지난 뒤에 다른 장비를 새로 붙일경우 새로 토큰을 발급 해야 한다.

```shell
$ kubeadm token list
$ kubeadm token create --print-join-command
```
