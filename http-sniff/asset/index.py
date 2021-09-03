# -*- coding: utf-8 -*
import json


def handler(event, context):

    result = json.dumps(event)

    print(result)

    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'text/html; charset=UTF-8'
        },
        'body': result
    }
