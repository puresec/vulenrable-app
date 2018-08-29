import subprocess
import boto3
import os

dynamodb = boto3.client("dynamodb")


def convert(event, context):
    requestid = event["requestContext"]["requestId"]
    ip = event["requestContext"]["identity"]["sourceIp"]
    document_url = event["queryStringParameters"]["document_url"]

    dynamodb.put_item(
        TableName=os.environ["TABLE_NAME"],
        Item={
            'requestid': {"S": requestid},
            'ip': {"S": ip},
            'document_url': {"S": document_url}
        }
    )

    txt = subprocess.check_output("curl --silent -L %s | ./bin/catdoc -" % document_url, shell=True)

    return {
        "statusCode": 200,
        "body": txt
    }
