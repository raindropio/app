if [[ "$OSTYPE" == "darwin"* ]]; then
  PACKAGE_VERSION=$(cat ../../../package.json \
    | grep version \
    | head -1 \
    | awk -F: '{ print $2 }' \
    | sed 's/[",]//g')
  echo $PACKAGE_VERSION
  agvtool new-marketing-version $PACKAGE_VERSION
  agvtool next-version -all
  sed -i '' "s/MARKETING_VERSION = [0-9]*\.[0-9]*\.[0-9]*/MARKETING_VERSION =$PACKAGE_VERSION/" "Save to Raindrop.io.xcodeproj/project.pbxproj"
else
  echo "This script can only run on macOS!"
fi