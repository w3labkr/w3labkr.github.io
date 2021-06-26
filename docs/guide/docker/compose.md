# Docker Compose

## Install Compose on Linux systems

Run this command to download the current stable release of Docker Compose
```
$ sudo curl -L "https://github.com/docker/compose/releases/download/1.29.2/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
```

Apply executable permissions to the binary
```shell
$ sudo chmod +x /usr/local/bin/docker-compose
```

You can also create a symbolic link to /usr/bin or any other directory in your path.
```shell
$ sudo ln -s /usr/local/bin/docker-compose /usr/bin/docker-compose
```

Test the installation.
```shell
$ docker-compose --version
```

## Usage

- tab_size: 2
- whitespace: space

```
$ vim docker-compose.yml
:set tabstop=2
:set cursorcolumn
:set list

version: '3.3'
services:
  myapache:
    image: httpd:2.4
    ports:
      - "9000:80"

  mydb:
    image: mysql:5.5
    ports:
      - "9001:3306"
    environment:
      - MYSQL_ROOT_PASSWORD=123456
      - MYSQL_USER=myuser
      - MYSQL_PASSWORD=123456
      - MYSQL_DATABASE=mydb
    volumes:
      - /var/dbdata:/var/lib/mysql

$ docker-compose up -d
```

Stop and remove resources
```shell
$ docker-compose down
```

## Commands
```
build              Build or rebuild services
config             Validate and view the Compose file
create             Create services
down               Stop and remove resources
events             Receive real time events from containers
exec               Execute a command in a running container
help               Get help on a command
images             List images
kill               Kill containers
logs               View output from containers
pause              Pause services
port               Print the public port for a port binding
ps                 List containers
pull               Pull service images
push               Push service images
restart            Restart services
rm                 Remove stopped containers
run                Run a one-off command
scale              Set number of containers for a service
start              Start services
stop               Stop services
top                Display the running processes
unpause            Unpause services
up                 Create and start containers
version            Show version information and quit
```

## Reference
- <https://docs.docker.com/compose/install/>