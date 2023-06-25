import AWS from 'aws-sdk';

AWS.config.update({
    accessKeyId: 'AKIAT65TGTM2NWH456D6',
    secretAccessKey: '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',
    region: 'ap-southeast-1',
});

const s3 = new AWS.S3();

export default s3;
