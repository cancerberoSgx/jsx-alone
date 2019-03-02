OUTDIR=../docs/jsx-alone-dom-sample-project
rm -rf $OUTDIR/simple/


export NODE_ENV=production
npx parcel build src/simple/index.html --public-url './' --no-autoinstall --no-cache --out-dir $OUTDIR/simple --out-file $OUTDIR/simple/index-min.html 

