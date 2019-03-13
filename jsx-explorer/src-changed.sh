# killall node
# rm -rf ../docs/jsx-explorer
npm run build-dev
http-server ../docs/jsx-explorer & 
while inotifywait -r -e modify src; do
  npm run build-dev
done