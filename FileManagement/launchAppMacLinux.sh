#!/usr/bin/env sh

echo "Launching music folder manager..."
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )/Scripts"
TEST_DIR="$( pwd )"

if [ $TEST_DIR != $SCRIPT_DIR\Scripts ]
then
    echo "You're in a different dir!"
    cd $SCRIPT_DIR
    npm run start-app
else
    echo "You're in it already..."
    npm run start-app
fi
