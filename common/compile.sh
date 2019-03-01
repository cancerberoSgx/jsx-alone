# calling:
# sh compile.sh dist/src/main.js ../docs/simple
# will generate:
# ../docs/simple/bundle.js, ../docs/simple/bundle.min.js, ../docs/simple/index.html, ../docs/simple/index-min.html


echo "npx browserify $1 -o $2/bundle.js"
npx browserify $1 -o $2/bundle.js
echo "npx terser --compress --mangle $2/bundle.js $2/bundle.min.js"
npx terser  --compress --mangle --ecma 8 $2/bundle.js -o $2/bundle.min.js

CURRENT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
cp $CURRENT_DIR/public/*.html $2/