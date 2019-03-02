# CWD=`pwd`
# cd ../..

sh build-workers.sh
parcel build src/JSXElementExplorer/__tests__/monacoEditorAlone.html

# cd $CWD