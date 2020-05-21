#!/usr/bin/env bash

echo "
----------------------
  vvvvvvvvvvvvvvvv
  Deploying BACK END to AWS
  ^^^^^^^^^^^^^^^^
----------------------
"

echo "
----------------------
  Removing previous files
----------------------
"
BASEDIR=$(dirname "$0")
echo "$BASEDIR"
ssh -i ~/workspace/reader-aws-key.pem \
ubuntu@ec2-54-67-40-86.us-west-1.compute.amazonaws.com \
'rm -rf /opt/backend/*'

echo "
----------------------
  Transferring new files
----------------------
"
cd "$BASEDIR" && cd ..
scp -i ~/workspace/reader-aws-key.pem \
-r ~/workspace/reader/index.js \
ubuntu@ec2-54-67-40-86.us-west-1.compute.amazonaws.com:/opt/backend
scp -i ~/workspace/reader-aws-key.pem \
-r ~/workspace/reader/models \
ubuntu@ec2-54-67-40-86.us-west-1.compute.amazonaws.com:/opt/backend
scp -i ~/workspace/reader-aws-key.pem \
-r ~/workspace/reader/package.json \
ubuntu@ec2-54-67-40-86.us-west-1.compute.amazonaws.com:/opt/backend
scp -i ~/workspace/reader-aws-key.pem \
-r ~/workspace/reader/public \
ubuntu@ec2-54-67-40-86.us-west-1.compute.amazonaws.com:/opt/backend
scp -i ~/workspace/reader-aws-key.pem \
-r ~/workspace/reader/routes \
ubuntu@ec2-54-67-40-86.us-west-1.compute.amazonaws.com:/opt/backend
scp -i ~/workspace/reader-aws-key.pem \
-r ~/workspace/reader/webpack.config.js \
ubuntu@ec2-54-67-40-86.us-west-1.compute.amazonaws.com:/opt/backend


echo "
----------------------
  Installing node
----------------------
"
ssh -i ~/workspace/reader-aws-key.pem \
ubuntu@ec2-54-67-40-86.us-west-1.compute.amazonaws.com \
'cd /opt/backend && npm install'

echo "
----------------------
  Restarting node server
----------------------
"
ssh -i ~/workspace/reader-aws-key.pem \
ubuntu@ec2-54-67-40-86.us-west-1.compute.amazonaws.com \
'cd /opt/backend; sudo pm2 delete "all"; sudo pm2 start index.js'
