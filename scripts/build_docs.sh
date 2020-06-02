#!/bin/bash

# Copyright (c) Calibra. All Rights Reserved

# run this script from the project root using `./scripts/build_docs.sh`

usage() {
  echo "Usage: $0 [-b]"
  echo ""
  echo "Build Libra documentation."
  echo ""
  echo "  -b   Build static version of documentation (otherwise start server)"
  echo ""
  exit 1
}

BUILD_STATIC=false

while getopts 'hb' flag; do
  case "${flag}" in
    h)
      usage
      ;;
    b)
      BUILD_STATIC=true
      ;;
    *)
      usage
      ;;
  esac
done

git submodule update --init

# manually copy crate README files from fixed directory
###
echo "-----------------------------------"
echo "Manually Copying READMEs to docs/crates"
echo "-----------------------------------"
sed -i.old '/^# /d' libra/admission-control/README.md; cp libra/admission-control/README.md docs/crates/admission-control.md
sed -i.old '/^# /d' libra/language/bytecode-verifier/README.md; cp libra/language/bytecode-verifier/README.md docs/crates/bytecode-verifier.md
sed -i.old '/^# /d' libra/consensus/README.md; cp libra/consensus/README.md docs/crates/consensus.md
sed -i.old '/^# /d' libra/crypto/crypto/README.md; cp libra/crypto/crypto/README.md docs/crates/crypto.md
sed -i.old '/^# /d' libra/execution/README.md; cp libra/execution/README.md docs/crates/execution.md
sed -i.old '/^# /d' libra/language/README.md; cp libra/language/README.md docs/crates/move-language.md
sed -i.old '/^# /d' libra/language/compiler/README.md; cp libra/language/compiler/README.md docs/crates/ir-to-bytecode.md
sed -i.old '/^# /d' libra/mempool/README.md; cp libra/mempool/README.md docs/crates/mempool.md
sed -i.old '/^# /d' libra/network/README.md; cp libra/network/README.md docs/crates/network.md
sed -i.old '/^# /d' libra/storage/README.md; cp libra/storage/README.md docs/crates/storage.md
sed -i.old '/^# /d' libra/language/vm/README.md; cp libra/language/vm/README.md docs/crates/vm.md

echo "-----------------------------------"
echo "Manually Copy Coding Guidelines"
echo "-----------------------------------"
sed -i.old '/^# Libra Core coding guidelines/d' libra/documentation/coding_guidelines.md
cp libra/documentation/coding_guidelines.md docs/community/coding-guidelines.md

echo "-----------------------------------"
echo "Building Docusaurus 🦖"
echo "-----------------------------------"
cd website || exit
npm install

if [[ $BUILD_STATIC == true ]]; then
  echo "-----------------------------------"
  echo "Building static site"
  echo "-----------------------------------"
  npm run build
else
  echo "-----------------------------------"
  echo "Starting local server"
  echo "-----------------------------------"
  npm run start
fi
