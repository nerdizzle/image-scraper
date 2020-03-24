#!/bin/zsh
while true
do
    for file in ./src/*.js;
    do
        sed -i '' -E "s/(^import .* from[[:space:]]+)[\"\'](.*\/[a-zA-Z0-9_-]*)[\"\']/\1\'\2.js\'/g" $file
        echo "| processed: "$file;
        sleep 0.75
    done;
done;
∂