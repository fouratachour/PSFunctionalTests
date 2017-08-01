#!/bin/sh

FIXED_BRANCH=$(echo $TRAVIS_BRANCH | sed 's/\//-/g')
ARCHIVE=$FIXED_BRANCH-$(date +%Y-%m-%d_%H_%M_%S)-$TRAVIS_COMMIT.zip
echo "Creating archive $ARCHIVE"
tar -cjf $ARCHIVE -C test/itg/$PS_VERSION/screenshots test/itg/$PS_VERSION/screenshots/mochawesome-report .
FILESIZE=$(stat -c%s "$ARCHIVE")
echo "Finished archive (size $FILESIZE), starting Google Drive upload"
./bin/gdrive-linux-x64 upload --refresh-token $GDRIVE_REFRESH_TOKEN --parent $GDRIVE_DIR "cd"
echo "Finished Google Drive upload"