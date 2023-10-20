#!/bin/bash

# Script to update contract addresses 
# Usage sh update.. [-g|-k] <new address>

while getopts ":g:k:" opt; do
  case $opt in
    g)
      NEW_ADDRESS=$OPTARG
			sed -i -E 's/0x[a-fA-F0-9]*/'$OPTARG'/' ./src/blockchain/game.js
      ;;
    k)  
      NEW_ADDRESS=$OPTARG
			sed -i -E 's/0x[a-fA-F0-9]*/'$OPTARG'/' ./src/blockchain/kings.js
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit 1
      ;;
  esac
done
