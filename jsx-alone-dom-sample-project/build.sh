npx tsc

rm -rf build
mkdir -p build
cp public/index.html build

npx browserify dist/src/lotsOfPeople/main.js -o build/lotsOfPeople/bundle.js
cp public/test.html build/lotsOfPeople/index.html

npx browserify dist/src/simple/main.js -o build/simple/bundle.js
cp public/test.html build/simple/index.html

mkdir -p ../docs
rm -rf ../docs/jsx-alone-dom-sample-project
mv build ../docs/jsx-alone-dom-sample-project