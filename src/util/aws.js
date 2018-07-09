const AWS = require('aws-sdk');
const BPromise = require('bluebird');
const config = require('../config');

const awsConfig = {
  sslEnabled: true,
};
if (config.AWS_DEBUG) {
  awsConfig.logger = process.stdout;
}

AWS.config.update(awsConfig);

export const createS3 = (opts) => BPromise.promisifyAll(new AWS.S3(opts))
