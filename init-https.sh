#!/bin/bash

# 운영체제 감지
OS=$(uname)

if [ "$OS" == "Darwin" ]; then
    # MacOS인 경우
    MKCERT_INSTALLED=$(which mkcert)

    if [ -z "$MKCERT_INSTALLED" ]; then
        echo "mkcert가 설치되어 있지 않습니다. brew로 mkcert를 설치합니다."
        brew install mkcert
    fi
elif [ "$OS" == "MINGW64_NT" ] || [ "$OS" == "MINGW32_NT" ] || [ "$OS" == "CYGWIN_NT" ]; then
    # Windows인 경우
    MKCERT_INSTALLED=$(where mkcert)

    if [ -z "$MKCERT_INSTALLED" ]; then
        echo "mkcert가 설치되어 있지 않습니다. choco로 mkcert를 설치합니다."
        choco install mkcert -y
    fi
else
    echo "지원되지 않는 운영체제입니다."
    exit 1
fi

# mkcert 설정 및 localhost 인증서 생성
mkcert -install
mkcert localhost

# mkcert 설치 자동화
# 1. mkcert 설치 여부를 확인하고 설치 안되어 있으면 brew로 mkcert를 설치(MacOS 기준 작성)
# 2. mkcert -install 실행
# 3. mkvert localhost 실행