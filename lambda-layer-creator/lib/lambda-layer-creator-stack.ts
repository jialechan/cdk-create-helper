import * as cdk from '@aws-cdk/core';
import lambda = require('@aws-cdk/aws-lambda');

export class LambdaLayerCreatorStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {

    super(scope, id, props);

    const awsSDKPythonLayer = new lambda.LayerVersion(this, 'awsSDK-python', {
      code: lambda.Code.fromAsset('./asset/python/awsSDK/'),
      description: 'awsSDK-python',
    });

    const requestsPythonLayer = new lambda.LayerVersion(this, 'requests-python', {
      code: lambda.Code.fromAsset('./asset/python/requests/'),
      description: 'requests-python',
    });

    const pymysqlPythonLayer = new lambda.LayerVersion(this, 'pymysql-python', {
      code: lambda.Code.fromAsset('./asset/python/pymysql/'),
      description: 'pymysql-python',
    });

    new cdk.CfnOutput(this, 'layers-output', {
      value: `
      const layers = {
        'awsSDK': lambda.LayerVersion.fromLayerVersionArn(this, 'awsSdk', '` + awsSDKPythonLayer.layerVersionArn + `'),
        'requests': lambda.LayerVersion.fromLayerVersionArn(this, 'requests', '` + requestsPythonLayer.layerVersionArn + `'),
        'pymysql': lambda.LayerVersion.fromLayerVersionArn(this, 'pymysql', '` + pymysqlPythonLayer.layerVersionArn + `')
      }`
    });



  }
}
