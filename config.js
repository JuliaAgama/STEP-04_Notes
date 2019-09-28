// config/config.js
// настройка окружения
;
const dotenv     = require('dotenv');
const path       = require('path');
const root       = path.join.bind(this, __dirname);

dotenv.config({ path: root('.env') });

module.exports = {
    PORT: process.env.PORT || 5000,
    MONGODB_URL: process.env.MONGODB_URL,
    MONGODB_DBNAME: process.env.MONGODB_DBNAME,
    s3bucket: process.env.S3_BUCKET,
    region: process.env.S3_REGION,
    accessKeyId: process.env.AWSID,
    secretAccessKey: process.env.AWSKEY
}