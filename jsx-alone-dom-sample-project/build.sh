OUTDIR=../docs/jsx-alone-dom-sample-project
rm -rf $OUTDIR
mkdir -p $OUTDIR
cp public/index.html $OUTDIR/index.html

CWD=`pwd` ; cd ../jsx-alone-sample-project-code; npm run setDomImpl; cd $CWD

export NODE_ENV=development
npx parcel build src/lotsOfPeople/index.html --no-minify --no-content-hash --public-url './' --out-dir $OUTDIR/lotsOfPeople --out-file $OUTDIR/lotsOfPeople/index.html
export NODE_ENV=production
npx parcel build src/lotsOfPeople/index.html --public-url './' --experimental-scope-hoisting --out-dir $OUTDIR/lotsOfPeople --out-file $OUTDIR/lotsOfPeople/index-min.html

export NODE_ENV=development
npx parcel build src/simple/index.html --no-minify --no-content-hash --public-url './' --out-dir $OUTDIR/simple --out-file $OUTDIR/simple/index.html
export NODE_ENV=production
npx parcel build src/simple/index.html --public-url './' --no-autoinstall --no-cache --experimental-scope-hoisting --detailed-report --out-dir $OUTDIR/simple --out-file $OUTDIR/simple/index-min.html

export NODE_ENV=development
npx parcel build src/eventHandlers/index.html --no-minify --no-content-hash --public-url './' --out-dir $OUTDIR/eventHandlers --out-file $OUTDIR/eventHandlers/index.html
export NODE_ENV=production
npx parcel build src/eventHandlers/index.html --public-url './' --experimental-scope-hoisting --out-dir $OUTDIR/eventHandlers --out-file $OUTDIR/eventHandlers/index-min.html