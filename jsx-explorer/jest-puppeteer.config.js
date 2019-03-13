module.exports = {
  launch: {
    dumpio: true,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  },
  server: {
    command: 'npm start',

// command: 'npm run build-dev && npx http-server ../docs/jsx-explorer '  
  },
}