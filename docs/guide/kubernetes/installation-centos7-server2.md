kubernetes master,worker node1, worker_node2 에서 공통의 작업 후
아래의 작업은 master node 에서만 실행을 해야 한다.

 master node 설정

1. 네트워크 설정(weave)
# kubeadm init --pod-network-cidr=x.x.x.x/x --apiserver-advertise-address=x.x.x.x
* --apiserver-advertise-address는 master node 의 ip address.
* pod-network  와 apiserver-advertise-address 는 ip 대역이 서로 달라야 한다.
( ex. --pod-network-cidr=192.168.199.0/24 )

2. 위에 명령의 실행결과로 토큰정보가 출력된다.  
* 반드시 출력결과를 파일로 저장해 두어야 한다.  
(ex. /root/token.txt - 이 파일에 위에 출력된 토큰을  복사 붙여넣기)
3. 환경변수 설정
export KUBECONFIG=/etc/kubernetes/admin.conf

4. weave 설치
# kubectl apply -f https://cloud.weave.works/k8s/net?k8s-version=$(kubectl version | base64 | tr -d '\n')

# kubectl get pods --all-namespaces  

# kubectl get nodes  -- 클러스트 노드 확인

5. node1,node2 를 cluster 에 join 시키기
node1 에서 -> # systemctl restart docker kubelet
node1 에서 -> # systemctl enable docker kubelet

master node 에서 저장해둔 token 을 node1 에서 실행시키기
--> 복사붙여넣기로 실행하면 된다.
node1 의 아무디렉토리에 들어가서 token.txt(파일이름은 상관없음) 파일을 만들고
붙여넣기 한다음 저장후 chmod 755 token.txt 
그다음 ./token.txt(실행)

master node 에서 저장해둔 token 을 node2에서 실행시키기
--> 복사붙여넣기로 실행하면 된다.
node1 에서 했던것과 마찬가지로 작업한다.

node2 에서 -> # systemctl restart docker ; systemctl restart kubelet
node2 에서 -> # systemctl enable docker ; systemctl enable kubelet

# kubectl get nodes  -- 클러스트 노드가 전부 ready 상태여야 한다.
                    (* ready 상태가 아니면 조금 기다려서 확인.)