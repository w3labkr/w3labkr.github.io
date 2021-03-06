쿠버네티스 설치(centos 7.x)

cluster hardware spec:

master.example.com
vcpu: (4개또는2개)
ram: 4G
disk:20G
nic1 - hostonly type
nic2 - nat type

----------------------------

node1.example.com
vcpu: (2개 또는 1개)
ram:2G
disk:30G
nic1 - hostonly type
nic2 - nat type

----------------------------
node2.example.com
vcpu: (2개 또는 1개)
ram:2G
disk:30G
nic1 - hostonly type
nic2 - nat type

* 쿠버네티스 클러스터 최소사양은 master node : vcpu - 2 , ram 2G
                  worker node: vcpu - 1, ram 1G

* 설치환경의 스펙이나 네트워크설정을 하기 
어려운 경우에는 minikube 를 설치해서 학습할수 있다.
(*. minikube 는 단일노드라서 복잡한 테스트는 하기 어렵다)

--------------------------------------------------------------

*. 필요한 패키지 설치(필수적인것은 아님)
# yum -y install vim vim-common
# yum -y install net-tools

-- hostname 설정 ---
master   에서 : #  hostnamectl set-hostname master.examle.com
node1   에서 :  #  hostnamectl set-hostname node1.example.com
node2   에서 :  #  hostnamectl set-hostname node2.example.com

1. master,node1,node2  에서 가각 /etc/hosts 파일에 클러스터 master 및 node 등록

/etc/hosts 파일 맨 아래에아래처럼  host 추가

192.168.100.1  master.example.com      master
192.168.100.2   node1.example.com       node1
192.168.100.3   node2.example.com       node2



2. master 에 docker 설치 

# yum install -y yum-utils
# yum-config-manager --add-repo https://download.docker.com/linux/centos/docker-ce.repo

# yum install docker-ce docker-ce-cli containerd.io
 
# systemctl start docker
# systemctl enable docker 
[ # docker run hello-world ] <--  docker test

3. 방화벽 서비스 중단

# systemctl disable firewalld
# systemctl stop firewalld
# systemctl status firewalld  <-- 확인

4. iptable 설정

# vim  /etc/sysctl.d/k8s.conf

net.bridge.bridge-nf-call-ip6tables = 1
net.bridge.bridge-nf-call-iptables = 1

# sysctl --system

5. selinx 끄기

# vim /etc/selinux/config
selinux=enforing ==> selinux=disabled 로 수정

6. swap off  ; 쿠버네티스는 swap 을 사용하지 않는다.

# vim /etc/fstab

# xxxxxx   swap  swap  defaults 0 0 <-- 주석처리

# reboot

# free  <== swap 확인

7. kubernets 설치를 위한 repository 작성

# vim /etc/yum.repos.d/kubernetes.repo

[kubernetes]
name=kubernetes repository
baseurl=https://packages.cloud.google.com/yum/repos/kubernetes-el7-x86_64
enabled=1
gpgcheck=1
repo_gpgcheck=1
gpgkey=https://packages.cloud.google.com/yum/doc/yum-key.gpg https://packages.cloud.google.com/yum/doc/rpm-package-key.gpg

# yum repolist

8. kubernetes 설치

# yum install -y kubelet kubeadm kubectl --disableexcludes=kubernetes
# systemctl enable kubelet && systemctl start kubelet

-- * 여기까지 완료 후 추가로 해야 할 작업이 있다.


