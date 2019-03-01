OUTDIR=../docs/jsx-alone-dom-extra
rm -rf $OUTDIR
mkdir -p $OUTDIR
cp public/index.html $OUTDIR/index.html

sh ../common/compile.sh dist/src/__tests__/statefulElementClassTestMain.js $OUTDIR/statefulElementClassTestMain

sh ../common/compile.sh dist/src/__tests__/eventHandlers/main.js $OUTDIR/eventHandlers