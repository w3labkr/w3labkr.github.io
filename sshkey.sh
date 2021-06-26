#!/usr/bin/env sh

# abort on errors
set -e

~/.ssh/config

Host personal
HostName github.com
IdentityFile ~/.ssh/personal_id_rsa
User git