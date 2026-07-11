#!/usr/bin/env bash
# Builds the downloadable zip sold on Gumroad: source functions, tests, buyer README, license.
set -euo pipefail
cd "$(dirname "$0")/.."

STAGE="release/funcmint"
rm -rf release
mkdir -p "$STAGE"

cp -r src/functions "$STAGE/functions"
cp -r tests "$STAGE/tests"
cp LICENSE-COMMERCIAL.md "$STAGE/LICENSE.md"
cp docs/funcmint/buyer-README.md "$STAGE/README.md"

rm -f release/funcmint.zip
powershell -NoProfile -Command "Compress-Archive -Path 'release/funcmint/*' -DestinationPath 'release/funcmint.zip' -Force"

echo "Built release/funcmint.zip"
