#!/usr/bin/env sh

# 确保脚本抛出遇到的错误
set -e

git config --global user.name "kz-fe"

rm -rf package-lock.json

yarn

# 生成静态文件
npm run docs:build

# 进入生成的文件夹
cd blog

# 如果是发布到自定义域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m "$TRAVIS_COMMIT_USER [发布了] $TRAVIS_COMMIT_MSG"

# 发布到 https://<USERNAME>.github.io/<REPO>
git push --force --quiet "https://${GH_TOKEN}@github.com/Kuaizi-co/blog.git" master:gh-pages

cd -
