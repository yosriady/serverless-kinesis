const AWS = require('aws-sdk');
const uuid = require('uuid');

const db = new AWS.DynamoDB.DocumentClient();

module.exports.handler = (event, context, callback) => {
  console.log('Received event from Kinesis stream');
  console.log(event);
  
  let payloads = []
  event.Records.forEach((record) => {
    const payload = new Buffer(record.kinesis.data, 'base64').toString('ascii');
    console.log('Decoded positive record:', payload);
    payloads.push(payload);
  });
  
  const params = {
    Item: {
      id: uuid.v4(),
      data: payloads[0], // Hardcoded to batch size 1!
      date: String(Date.now()),
    },
    TableName: process.env.DYNAMODB_TABLE_NAME,
  };
  console.log(params);
  return db.put(params).promise()
    .then(() => {
      console.log('Inserted to DynamoDB!');
      callback(null, { success: true });
    })
    .catch((err) => {
      console.log('Failed to insert!');
      console.log(err.message);
      // TODO: handle failure by enqueueing to a DLQ to retry
      callback(null, { error: err.message });
    });
};
