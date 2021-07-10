# Namespace

현재 네임스페이스 정보 출력

```shell
$ kubectl get ns
$ kubectl get all
$ kubectl get all -o wide -n default
```

다른 네임스페이스 정보 출력

```shell
$ kubectl get all -o wide -n kube-system
```

네임스페이스 생성

```shell
$ kubectl create namespace testns
$ kubectl get ns
```

네임스페이스는 만드는 것은 쉬우나 변경하는 것은 어렵다.

```shell
$ kubectl config set-context --current --namespace=testns
$ kubectl config view
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://192.168.100.10:6443
  name: kubernetes
...
```

네임스페이스를 쉽게 사용하기 위한 패키지도 존재한다: kubectx

```shell
$ kubectl create namespace sample
$ kubectl get ns
```

터미널 경로 표시
```shell
$ PS1="\$PWD :$ "
```

yaml 파일 정보 확인
```shell
$ kubectl api-resources | grep -i namespaces
NAME SHORTNAMES APIVERSION NAMESPACED KIND 
namespaces ns v1 false Namespace
```

NAMESPACED 의 값이 false 로 되어있는 것은 네임스페이스의 영향을 받지 않는다. 대부분이 네임스페이스에 종속이 되어 있지만 NAMESPACED의 값이 false 인경우 종속이 되지 않기 때문에 중복 생성할 수 없다.

yaml 파일 정보 작성

```shell
$ mkdir work
$ cd work
$ pwd
$ vim ns.yaml
--- #yaml의 시작
apiVersion: v1
Kind: Namespace
metadata:
  name: samplens
```

터미널에서 % 는 일반 사용자를 의미한다.

yaml 파일  실행
```shell
# 생성하고 실행할때
$ kubectl create -f ns.yaml

# 수정하고 실행할때
$ kubectl apply
```

네임스페이스 확인
```shell
$ kubectl get ns
```

시스템에서 사용하기 떄문에 함부로 사용하지 말아야 할 네임스페이스 목록

- kube-node-lease
- kube-public
- kube-system

네임스페이스 변경 쉘 스크립트 추가

```shell
$ wget http://twoseven.kr/weekend/kubens
$ chmod u+x kubens
$ pwd
/root/work

$ echo $PATH
/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin

$ mkdir /root/bin
$ mv kubens /root/bin
$ kubens testns
```
