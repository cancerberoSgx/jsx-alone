OUTDIR=../docs/jsx-alone-string-browser-sample-project
rm -rf $OUTDIR
mkdir -p $OUTDIR
cp public/index.html $OUTDIR/index.html

CWD=`pwd`
cd ../jsx-alone-sample-project-code
# cp src/implString.ts src/impl.ts
# npm run build 
npm run setStringImpl
cd $CWD
# npm run build


# cp ../jsx-alone-sample-project-code/dist/src/implString.js ../jsx-alone-sample-project-code/dist/src/impl.js
# npm run setCodeStringImpl

export NODE_ENV=development
npx parcel build src/lotsOfPeople/index.html --no-minify --no-content-hash --public-url './' --out-dir $OUTDIR/lotsOfPeople --out-file $OUTDIR/lotsOfPeople/index.html
export NODE_ENV=production
npx parcel build src/lotsOfPeople/index.html --public-url './' --experimental-scope-hoisting --out-dir $OUTDIR/lotsOfPeople --out-file $OUTDIR/lotsOfPeople/index-min.html