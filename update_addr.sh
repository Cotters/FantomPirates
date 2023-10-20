#!/bin/bash 

while getopts ":g:k:" opt; do
  case $opt in
    g)
      sed -i '' -E "s/0x[a-fA-F0-9]*/$OPTARG/g" src/blockchain/game.js
      ;;
      
    k)
      sed -i '' -E "s/0x[a-fA-F0-9]*/$OPTARG/g" src/blockchain/kings.js
      ;;
      
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
  esac
done
