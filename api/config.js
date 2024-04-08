// config.js
const dotenv = require('dotenv');
const path = require('path');

console.log("ENV: "+process.env.NODE_ENV);
const PATH = path.resolve(__dirname+'/environments', process.env.NODE_ENV + '.env');

dotenv.config({
  path: PATH
});

module.exports = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    HOST: process.env.HOST || '127.0.0.1',
    APIHOST: process.env.APIHOST || '127.0.0.1',
    PORT: process.env.PORT || 5000,
    API: process.env.API || '',
    DBLINK:"mongodb://127.0.0.1:27017/ArandaSport?authSource=admin"
}