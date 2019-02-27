OUTDIR=../docs/jsx-alone-dom-extra
rm -rf $OUTDIR
mkdir -p $OUTDIR
cp public/index.html $OUTDIR/index.html

export NODE_ENV=development
npx parcel build src/__tests__/statefulElementClassTestMain.html --no-minify --no-content-hash --public-url './' --out-dir $OUTDIR/statefulElementClassTestMain --out-file $OUTDIR/statefulElementClassTestMain/index.html
export NODE_ENV=production
npx parcel build src/__tests__/statefulElementClassTestMain.html --public-url './' --out-dir $OUTDIR/statefulElementClassTestMain --out-file $OUTDIR/statefulElementClassTestMain/index-min.html

export NODE_ENV=development
npx parcel build src/__tests__/eventHandlers/index.html --no-minify --no-content-hash --public-url './' --out-dir $OUTDIR/eventHandlers --out-file $OUTDIR/eventHandlers/index.html
export NODE_ENV=production
npx parcel build src/__tests__/eventHandlers/index.html --public-url './'   --out-dir $OUTDIR/eventHandlers --out-file $OUTDIR/eventHandlers/index-min.html