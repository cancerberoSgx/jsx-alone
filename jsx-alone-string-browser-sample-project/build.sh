OUTDIR=../docs/jsx-alone-string-browser-sample-project
rm -rf $OUTDIR
mkdir -p $OUTDIR
cp public/index.html $OUTDIR/index.html


sh ../common/compile.sh dist/src/lotsOfPeople/main.js $OUTDIR/lotsOfPeople

