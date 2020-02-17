#!/usr/bin/env bash
mkdir -p test/sync;
rm -rf test/sync/*;
npm start -- sync ./node_modules/ansi-regex ./test/sync;
