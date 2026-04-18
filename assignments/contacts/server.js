const http = require('http');
// require('dotenv').config(); // No longer needed without Mongo

const app = require('./app/');
const server = http.createServer(app);
const port = process.env.PORT || 8080;

server.listen(port, () => {
    console.log(`Listening on ${port}`);
});
