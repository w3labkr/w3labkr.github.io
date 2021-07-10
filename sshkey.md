ssh-keygen -t rsa -b 4096 -f ~/.ssh/id_rsa -C "git@w3lab.kr" -N ''
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_rsa
cat ~/.ssh/id_rsa | clip

ssh-keygen -t rsa -b 4096 -C "git@w3lab.kr"