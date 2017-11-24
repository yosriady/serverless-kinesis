const AWS = require('aws-sdk');
const uuid = require('uuid');

const kinesis = new AWS.Kinesis();

module.exports.handler = (event, context, callback) => {
  console.log(event);
  const partitionKey = uuid.v4();

  const params = {
    Data: JSON.stringify(event),
    PartitionKey: partitionKey,
    StreamName: process.env.KINESIS_STREAM_NAME,
  };
  return kinesis.putRecord(params).promise()
    .then((res) => {
      console.log(res);
      callback(null, { message: 'Data successfully written to Kinesis stream' });
    })
    .catch((err) => {
      callback(err);
    });
};
