// app/routes/main/index.js
// маршруты к главной странице "/"
;

const jsonHandler = require('../../services/jsonHandler');
const getAllData  = require('./getAllData');
const aws         = require('aws-sdk');
const config      = require('../../../config')


module.exports.main = function (app, database) {

    app.route('/')
    .get((req, res) => {
        getAllData(database)
        .then(items => {
            res.render('index', {items: items})
        })
        .catch(err => {
            res.status(400).send(jsonHandler.createResponse(() => {
                throw new Error(err);
            }));
        });
    })
};

module.exports.s3_pict = function(app) {

    app.get('/sign-s3', (req, res) => {
        const s3 = new aws.S3({accessKeyId: config.accessKeyId, secretAccessKey: config.secretAccessKey, region: config.region});
        const fileName = req.query['file-name'];
        const fileType = req.query['file-type'];
        const s3Params = {
            Bucket: config.s3bucket,
            Key: fileName,
            Expires: 60,
            ContentType: fileType,
            ACL: 'public-read'
        };

        s3.getSignedUrl('putObject', s3Params, (err, data) => {
            if(err){
                console.log(err);
                return res.end();
            }
            const returnData = {
                signedRequest: data,
                url: `https://${config.s3bucket}.s3.amazonaws.com/${fileName}`
            };
            res.write(JSON.stringify(returnData));
            res.end();
        });
    });
}
