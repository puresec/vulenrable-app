const child_process = require('child_process');
const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient();


exports.convert = async (event) => {
  console.log(JSON.stringify(event));
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
  console.log("persisted in DB");
  let txt = child_process.execSync(`curl --silent -L ${documentUrl} | ./bin/catdoc -`).toString();
  console.log("catdoc result: "+ txt);


  return {
    statusCode: 200,
    body: txt
  };
};
