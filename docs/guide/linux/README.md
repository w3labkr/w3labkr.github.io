# Linux

## Syntax

터미널에서 % 는 일반 사용자를 의미한다.

```shell
% echo ''
```

대괄호는 선택(생략가능) 화살괄호는 필수(생략 불가능)을 의미한다.

```
$ 명령어 <필수> [선택] 
```

## Recommended Library

설치된 패키지 확인

```
$ rpm -q bash-completion
```

centos

```shell
$ yum -y install yum-utils bzip2 git wget vim vim-common net-tools bash-completion
```

## Commands

터미널 경로 표시

```shell
$ PS1="\$PWD :$ "
```
