if [[ "$OSTYPE" == "darwin"* ]]; then
  PACKAGE_VERSION=$(cat ../../../package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g')
  echo $PACKAGE_VERSION
  agvtool new-marketing-version $PACKAGE_VERSION
  agvtool next-version -all
else
  echo "This script can only run on macOS!"
fi