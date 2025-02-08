#!/bin/bash
if [ ! -e ./bin/hugo ]
then
    echo "Hugo executable missing, run make setup-hugo to install it"
    exit 1
fi

# HUGO_VERSION="0.121.2"

if ./bin/hugo version | grep -q "$HUGO_VERSION"; then
  exit 0
else
  echo "Hugo version mismatch, expecting $HUGO_VERSION, got this instead:"
  ./bin/hugo version
  exit 1
fi
