npx tsc

rm -rf build
mkdir -p build
cp public/index.html build

npx browserify dist/src/lotsOfPeople/main.js -o build/lotsOfPeople/bundle.js
cp public/test.html build/lotsOfPeople/index.html