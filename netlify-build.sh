#!/bin/sh
git config --global url."https://${GITHUB_TOKEN}@github.com".insteadOf "https://github.com"
git submodule update --init --recursive