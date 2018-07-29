#!/bin/bash

if [[ $1 = "" ]]; then
    echo -e "\033[33m 请输入远端资源版本号, 如 ./subgame.sh 1.0.0.2 \033[0m"
    exit 0
fi

ccp=$(which CocosCreator);
if [ -n "$ccp" ]; then
    echo 'CocosCreator exist'
else
    ccp="/Applications/CocosCreator.app/Contents/MacOS"
    export PATH=$ccp":"$PATH
    echo "Auto Exported CocosCreator Path:"$ccp
fi

CocosCreator --path .  --build "a1897856-c0a7-4c4f-afb5-4d8f0919c7aa;debug=false;title=Game56Hall;packageName=com.game56.hall;inlineSpriteFrames=true"
rm -rf native
SUBGAME_VERSION=$1
REMOTE_URL="http://127.0.0.1/subgame/"
PKG_DIR="hotupdate/v${SUBGAME_VERSION}/"

mkdir -p "${PKG_DIR}"
cp -rf ./build/jsb-default/res ./build/jsb-default/src "${PKG_DIR}"
node ./version_generator.js -v "${SUBGAME_VERSION}" -u "${REMOTE_URL}" -s "${PKG_DIR}" -d "${PKG_DIR}"
