# 파드(PODS)

쿠버네티스 안에서 컨테이너를 관리하기 위한 가장 중요한 것은 파드(PODS) 이다.

현재 네임스페이스 확인

```shell
$ kubectl config view
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: DATA+OMITTED
    server: https://192.168.100.10:6443
  name: kubernetes
...
```

기본 네임스페이스로 변경
```shell
$ kubectl config set-context --current --namespace=default
```

아파치 파드 실행

```shell
$ kubectl run apache2 --image=httpd:latest
```

파드 yaml 작성

```shell
$ vim apache.yml
--- # 생략가능 (야믈의 사작)
apiVersion: v1
kind: Pod
metadata:
  name: apache-pod
  labels:
    myapp: myweb
spec:
  containers:
  - name: myweb-container
    image: httpd:2.4
    ports:
    - containerPort: 80
```

파드 생성

```shell
$ kubectl apply -f apache.yml
$ kubectl get pods
```

모든 파드 리스트 보기

```shell
$ get pods --all-namespaces
```

## 파드 라이프사이클

팬딩상태에서 러닝이 될때까지 실팰할 경우 무한 리스타트가 되는 경우도 있다.

러닝 상태에 따른 에러 종류

- crashloopbackoff
- imagefullerror

파드 러닝 상태 조회

```shell
$ kubectl describe pods apache-pod
```

파드 삭제: 컨테이너가 실행중일 경우 30초간 대기 후 삭제한다.

```shell
$ kubectl delete pod apache-pod
```

파일 강제 삭제: 컨테이너가 실행중이더라도 바로 삭제 한다.

```shell
$ kubectl delete pod apache2 --grace-period=0 --force
```

파드 새로 생성

```shell
$ kubectl create -f apache.yml
$ kubectl get pods -o wide
$ curl http://10.44.0.2
```

파드 로그 확인

```shell
$ kubectl logs apache-pod
```

파드 내부 접속

```shell
$ kubectl exec -it apache-pod /bin/bash
$ cat htdocs/index.html
<html><body><h1>It works!</h1></body></html>

$ exit
```
