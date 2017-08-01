#!/bin/sh

FIXED_BRANCH=$(echo $TRAVIS_BRANCH | sed 's/\//-/g')

echo "Creating archive $ARCHIVE"

tar -cjf reporter -C test/itg/$PS_VERSION/mochawesome-report .

./bin/gdrive-linux-x64 upload --refresh-token $GDRIVE_REFRESH_TOKEN --parent $GDRIVE_DIR "reporter"

echo "Finished Google Drive upload"