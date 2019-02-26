OUTDIR=../docs/jsx-alone-dom-sample-project
rm -rf $OUTDIR/simple/

CWD=`pwd`
cd ../jsx-alone-sample-project-code
npm run setDomImpl
# cp dist/src/implDom.js dist/src/impl.js
cd $CWD

# npm run setCodeDomImpl

export NODE_ENV=production
npx parcel build src/simple/index.html --public-url './' --no-autoinstall --no-cache --experimental-scope-hoisting  --out-dir $OUTDIR/simple --out-file $OUTDIR/simple/index-min.html 

