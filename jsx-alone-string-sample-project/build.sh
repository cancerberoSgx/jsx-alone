OUTDIR=../docs/jsx-alone-string-sample-project
rm -rf $OUTDIR
mkdir -p $OUTDIR
cp public/index.html $OUTDIR/index.html


CWD=`pwd`
cd ../jsx-alone-sample-project-code
cp src/implString.ts src/impl.ts
npm run build 
cd $CWD
npm run build
node dist/src/docs
# npx ts-node src/docs.ts