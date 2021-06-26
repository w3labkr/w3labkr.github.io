# Private Hub

네트워크 문제 있는지 확인
```shell
$ cat /etc/hosts
192.168.56.101 server1.example.com server1
192.168.56.102 server2.example.com server2

$ who
root     tty1         2021-06-19 15:22
devops   pts/0        2021-06-19 18:28 (192.168.56.1)

$ ping server1.example.com
$ ping server2.example.com
```

server2: registry server
```shell
$ systemctl restart docker

$ docker pull registry
$ docker images
$ docker run -d --name registry -p 5000:5000 --restart=always registry:latest
```

server1
```shell
$ cd /etc/docker/
$ vim deamon.json
{
    "insecure-registries": ["server2.example.com:5000"]
}

$ systemctl restart docker

# clean docker
$ docker rm -f $(docker ps -aq)
$ docker rmi -f $(docker images -q)

$ docker pull hello-world
$ docker tag hello-world:latest server2.example.com:5000/hello-world
$ docker push server2.example.com:5000/hello-world

$ curl -X GET http://server2.example.com:5000/v2/_catalog
$ curl -X GET http://server2.example.com:5000/v2/lee/myapache/tags/list
```