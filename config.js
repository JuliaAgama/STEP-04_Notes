// config/config.js
// настройка окружения
;
const dotenv     = require('dotenv');
const path       = require('path');
const root       = path.join.bind(this, __dirname);

dotenv.config({ path: root('.env') });

module.exports = {
    PORT: process.env.PORT == null || process.env.PORT =="" ? 5000 : process.env.PORT,
    MONGODB_URL: process.env.MONGODB_URL,
    MONGODB_DBNAME: process.env.MONGODB_DBNAME
}