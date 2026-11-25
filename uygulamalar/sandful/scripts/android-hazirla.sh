#!/bin/sh
# Mac'te: oyunu uygulamaya kopyalar ve Android Studio'yu açar. Kullanım: uygulamalar/sandful klasöründe "sh scripts/android-hazirla.sh"
set -e
cd "$(dirname "$0")/.."
npm ci
npm run build
npx cap sync android
npx cap open android
