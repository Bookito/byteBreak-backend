#!/bin/bash

cd ..

zip -r byte-break-1.zip . -x "node_modules/*" -x "dist/*"
