#!/usr/bin/env bash
./dev.sync.sh
rm -rf test/sync/*.js;
npm start -- map ./node_modules/ansi-regex ./test/sync.json;
npm start -- map ./test/sync ./test/sync/sync.json;
npm start -- sync ./test/sync.json ./test/sync/sync.json;
