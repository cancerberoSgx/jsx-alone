OUTDIR=../docs/jsx-alone-dom-sample-project
rm -rf $OUTDIR
mkdir -p $OUTDIR
cp public/index.html $OUTDIR/index.html

CWD=`pwd`
cd ../jsx-alone-sample-project-code
cp src/implDom.ts src/impl.ts
npm run build 
cd $CWD
npm run build
# node dist/src/docs

export NODE_ENV=development
npx parcel build src/lotsOfPeople/index.html --no-minify --no-content-hash --public-url './' --out-dir $OUTDIR/lotsOfPeople --out-file $OUTDIR/lotsOfPeople/index.html
export NODE_ENV=production
npx parcel build src/lotsOfPeople/index.html --public-url './' --experimental-scope-hoisting --out-dir $OUTDIR/lotsOfPeople --out-file $OUTDIR/lotsOfPeople/index-min.html

export NODE_ENV=development
npx parcel build src/simple/index.html --no-minify --no-content-hash --public-url './' --out-dir $OUTDIR/simple --out-file $OUTDIR/simple/index.html
export NODE_ENV=production
npx parcel build src/simple/index.html --public-url './' --experimental-scope-hoisting --out-dir $OUTDIR/simple --out-file $OUTDIR/simple/index-min.html
