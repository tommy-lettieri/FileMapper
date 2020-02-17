#!/usr/bin/env bash
mkdir -p test/sync;
rm -rf test/sync/*;
npm start -- map ./node_modules/ansi-regex ./test/sync.json;
npm start -- sync ./test/sync.json ./test/sync;
