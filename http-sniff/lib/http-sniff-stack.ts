import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import apigatewayv2 = require('@aws-cdk/aws-apigatewayv2');
import apigatewayv2integrations = require('@aws-cdk/aws-apigatewayv2-integrations');

export class HttpSniffStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const backend = new lambda.Function(this, 'http-sniff-lambda', {
      handler: 'index.handler',
      runtime: lambda.Runtime.PYTHON_3_8,
      code: lambda.Code.fromAsset("./asset"),
      timeout: cdk.Duration.minutes(1),
    });

    const api = new apigatewayv2.HttpApi(this, 'lambda-apiv2');

    api.addRoutes({
      integration: new apigatewayv2integrations.LambdaProxyIntegration({
        handler: backend
      }),
      path: '/sniff',
    });

    new cdk.CfnOutput(this, 'url-output', {
      value: `${api.url}` + "sniff"
    });
  }
}
