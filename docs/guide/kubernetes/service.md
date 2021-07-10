# 서비스

라벨이 없으면 클러스터 밖에서 접속을 할 수 없다.

클러스터 밖에서 접속하기 위해서는
라벨과 함께 서비스 오브젝트도 필요하다.

```shell
$ vim service.yaml
--- # 여러개의 오브젝트를 구분하기 위해 --- 입력 한다.
apiVersion: v1
kind: Service
metadata:
  name: myweb-service
spec:
  ports:
  - name: myweb-service-port
    port: 8001
    targetPort: 80
  selector:
    myapp: myweb

$ kubectl apply -f service.yaml
$ kubectl get svc -o wide
$ kubectl describe svc myweb-service
```

파드 라벨과 클러스터 라벨을 똑같이 만들어 준다.

```shell
$ kubectl get pods --show-labels
$ curl http://10.100.169.0:8001
```

클러슽터 아이피는 서비스가 사용하는 주소로 클러스터 내부에서만 사용할 수 있어서 외부에서는 접근이 불가능 하다.

노드 아이피(10.10.50.51:30001, 10.10.50.52:30001) > 클러스터(서비스) 아이피(10.111.239.70:80) - 아파치 > 엔드포인트(타켓) 아이피 (10.244.2.2:80, 10.244.2.3:8080) - 워커노드로 여러개의 엔드 포인트가 올 수 있다.


실행중인 클러스터 서비스 변경하기

```shell
$ kubectl edit service myweb-service
$ kubectl get service -o wide
$ curl http://10.100.169.0:8010
```

## 윈도우용 타입

윈도우에서 브라우저에 접속하기 위한 기본 설정 변경
type: ClusterIP 를 NodePort 로 변경한다.

```shell
$ kubectl edit service myweb-service
  type: NodePort
status:
  loadBalancer: {}
```

## EXTERNAL-IP

EXTERNAL-IP 는 로드밸런스를 사용할때만 접속이 가능 하다.
또한 타입을 로드밸런스로 변경한다.

```shell
$ kubectl get service -o wide

# 호스트에 등록된 주소로만 외부에서 접근할 수 있다.
$ cat /etc/hosts
192.168.100.10 master.example.com master
192.168.100.20 node1.example.com node1
192.168.100.30 node2.example.com node2

$ curl http://192.168.100.20:30228
```

## Replica

노드가 죽더라도 다른 노드에서 계속 실행할 수 있도록 하는 것.

항상 3개가 유지 되도록 하는것.

```shell
$ vim replica.yaml
apiVersion: apps/v1
kind: ReplicaSet
metadata:
  name: nginx
spec:
  replicas: 3
  selector:
    matchLabels:
      app: nginx-replica-test
  template:
    metadata:
      labels:
        app: nginx-replica-test # selector 가 참조하는 라벨 정보
    spec:
      containers:
      - name: myweb-container2
        image: nginx
        ports:
        - containerPort: 80

:set cursorline
:set cursorcolumn
```

테스트 데이터 삭제

```shell
$ kubectl get pods
$ kubectl delete pods apache-pod
$ kubectl delete service myweb-service
$ kubectl get all
```

새로 생성

```shell
$ kubectl create -f replica.yaml
$ kubectl apply -f replica.yaml
```

노드에 파드 직접 할당하기 (nodeselector)

```shell
# 셀렉터 키 확인하기
$ kubectl get nodes --show-labels
beta.kubernetes.io/arch=amd64,beta.kubernetes.io/os=linux,kubernetes.io/arch=amd64,kubernetes.io/hostname=master.example.com,kubernetes.io/os=linux,node-role.kubernetes.io/control-plane=,node-role.kubernetes.io/master=,node.kubernetes.io/exclude-from-external-load-balancers=

kubernetes.io/hostname
```

파드 실행

```shell
$ vim apache.yaml
apiVersion: v1
kind: Pod
metadata:
  name: apache-pod-nolabel2
spec:
  containers:
  - name: myweb-container
    image: httpd:latest
    ports:
    - containerPort: 80
  nodeSelector:
    kubernetes.io/hostname: node1.example.com

$ kubectl create -f apache.yml
$ kubectl get pods -o wide
```

레플리카 상태 확인

```shell
$ get replicasets.apps nginx
NAME    DESIRED   CURRENT   READY   AGE
nginx   3         3         3       15m
```

상위 객체가 생성되면 하위 객체는 자동으로 삭제 된다.
레플리카는 파드의 상위 객체이므로 레플리카를 삭제하면 종속되어 있는 모든 파드가 삭제 된다.

레플리카 상태값을 0으로 변경해주면 삭제된다.

```shell
$ kubectl edit replicasets.apps nginx
status:
    replicas: 0
```

레플리카 객체를 삭제한다.

```shell
$ kubectl delete replicasets.apps nginx
$ kubectl get pods
```
