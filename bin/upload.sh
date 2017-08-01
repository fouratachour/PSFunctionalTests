#!/bin/sh

FIXED_BRANCH=$(echo $TRAVIS_BRANCH | sed 's/\//-/g')

echo "Creating archive $ARCHIVE"

ARCHIVE=$FIXED_BRANCH-$(date +%Y-%m-%d_%H_%M_%S)-$TRAVIS_COMMIT.zip

echo "Creating archive $ARCHIVE"

zip -r $ARCHIVE test/itg/$PS_VERSION/mochawesome-report/*


./bin/gdrive-linux-x64 upload --refresh-token $GDRIVE_REFRESH_TOKEN --parent $GDRIVE_DIR "$ARCHIVE"

echo "Finished Google Drive upload"