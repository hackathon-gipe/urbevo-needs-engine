#! /bin/bash

rm -rf node_modules
npm install
cp -r node_modules nodejs
rm -rf nodejs/node_modules/@aws-sdk
rm -rf nodejs/node_modules/typescript
zip -rq layer.zip nodejs