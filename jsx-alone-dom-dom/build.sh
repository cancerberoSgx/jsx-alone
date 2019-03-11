rm -rf ../docs/jsx-alone-dom-dom
mkdir -p ../docs/jsx-alone-dom-dom

npx tsc 

cp  src/__tests__/sample-alone.html ../docs/jsx-alone-dom-dom
npx browserify dist/src/__tests__/sample-alone.js -o ../docs/jsx-alone-dom-dom/sample-alone.js
npx terser  --compress --mangle --ecma 8 ../docs/jsx-alone-dom-dom/sample-alone.js -o ../docs/jsx-alone-dom-dom/sample-alone.min.js