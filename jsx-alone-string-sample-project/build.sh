OUTDIR=../docs/jsx-alone-string-sample-project
rm -rf $OUTDIR
mkdir -p $OUTDIR
cp public/index.html $OUTDIR/index.htm
npx ts-node src/docs.ts