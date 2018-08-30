const child_process = require('child_process');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();


exports.convert = async (event) => {
  let requestid = event.requestContext.requestId;
  let ip = event.requestContext.identity.sourceIp;
  let documentUrl = event.queryStringParameters.document_url;

  await docClient.put({
      TableName: process.env.TABLE_NAME,
      Item: {
        'requestid': requestid,
        'ip': ip,
        'document_url': documentUrl
      }
    }
  ).promise();
  
  let txt = child_process.execSync(`curl --silent -L ${documentUrl} | ./bin/catdoc -`).toString();

  return {
    statusCode: 200,
    body: txt
  };
};
