#!/bin/bash

# Copyright (c) Calibra. All Rights Reserved

echo "-----------------------------------"
echo "Generating API reference via Rustdoc"
echo "-----------------------------------"

cd libra
cargo doc --no-deps --workspace --lib || exit 1
RUSTDOC_DIR='libra/target/doc/'
DOCUSAURUS_RUSTDOC_DIR='website/build/website/docs/rustdoc/'
cd .. || exit

mkdir -p $DOCUSAURUS_RUSTDOC_DIR
cp -r $RUSTDOC_DIR $DOCUSAURUS_RUSTDOC_DIR
