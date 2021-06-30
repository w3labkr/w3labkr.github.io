#!/usr/bin/env sh

# abort on errors
set -e

# build
npm run docs:build

# navigate into the build output directory
cd docs/.vuepress/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git config user.name "$(git config user.name)"
git config user.email "$(git config user.email)"

git add -A

git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
# git push -f git@github.com:<USERNAME>/<REPO>.git master:gh-pages
# git push -f git@github.com:w3labkr/vuepress.git master:gh-pages

# If deploying with multiple ssh keys.
# git push -f git@<USERNAME>.github.com:<USERNAME>/<REPO>.git master:gh-pages
git push -f git@w3labkr.github.com:w3labkr/vuepress.git master:gh-pages

cd -
