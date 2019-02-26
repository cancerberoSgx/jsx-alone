OUTDIR=../docs/jsx-alone-string-sample-project
rm -rf $OUTDIR
mkdir -p $OUTDIR
cp public/index.html $OUTDIR/index.html


CWD=`pwd`
cd ../jsx-alone-sample-project-code
# cp src/implString.ts src/impl.ts
# npm run build 
npm run setStringImpl
cd $CWD

# cp ../jsx-alone-sample-project-code/dist/src/implString.js ../jsx-alone-sample-project-code/dist/src/impl.js
# npm run setCodeStringImpl

# npm run build
# node dist/src/docs
npx ts-node src/docs.ts