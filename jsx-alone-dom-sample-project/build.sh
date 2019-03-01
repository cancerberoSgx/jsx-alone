OUTDIR=../docs/jsx-alone-dom-sample-project
rm -rf $OUTDIR
mkdir -p $OUTDIR

cp public/*.html $OUTDIR/

sh ../common/compile.sh dist/src/simple/main.js $OUTDIR/simple

sh ../common/compile.sh dist/src/lotsOfPeople/main.js $OUTDIR/lotsOfPeople