// eslint-disable-next-line no-native-reassign
require = require('esm')(module);
require('dotenv').config();

const app = require('./server.js');

const port = process.env.PORT || 3000;

const ssl_options = {
    key: fs.readFileSync('./ssl/privkey.pem'),
    cert: fs.readFileSync('./ssl/fullchain.pem')
};

const server = https.createServer(ssl_options, app);

server.listen(port, function () {
    console.info(`Listening on port ${port}`);
});

module.exports = app;