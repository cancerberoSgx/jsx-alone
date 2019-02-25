OUTDIR=../docs/jsx-alone-html-sample-project
rm -rf $OUTDIR
mkdir-p $OUTDIR
cp public/index.html $OUTDIR/index.html

rm -rf $OUTDIR/lotsOfPeople
mkdir -p $OUTDIR/lotsOfPeople
# npx parcel build src/lotsOfPeople/index.html --no-minify --no-content-hash --public-url './' --out-dir $OUTDIR/lotsOfPeople --out-file $OUTDIR/lotsOfPeople/index.html

rm -rf $OUTDIR/simple
mkdir -p $OUTDIR/simple
# npx parcel build src/simple/index.html --no-minify --no-content-hash --public-url './' --out-dir $OUTDIR/simple --out-file $OUTDIR/simple/index.html
