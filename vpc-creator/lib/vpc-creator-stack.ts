import * as cdk from '@aws-cdk/core';
import * as ec2 from '@aws-cdk/aws-ec2';

export class VpcCreatorStack extends cdk.Stack {

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // 创建vpc
    const vpc = new ec2.Vpc(this, 'TheVPC', {
      cidr: "172.32.0.0/16",
      // 生产环境用2，钱不是考虑因素用3
      maxAzs: 1,
      // 只配置一个NAT网关。生产环境可以去掉这个配置，用默认每个公有子网建一个NAT网关
      natGateways: 1
    })

    // 输出vpcId
    new cdk.CfnOutput(this, 'vpc-id', {
      value: 'vpcId = ' + vpc.vpcId
    });

    // 输出公有子网
    for (let i = 0; i < vpc.publicSubnets.length; i++) {
      new cdk.CfnOutput(this, 'vpc-publicSubnets-' + i, {
        value: `
        ec2.Subnet.fromSubnetAttributes(scope, 'public-` + (i + 1) + `', {
          subnetId: '` + vpc.publicSubnets[i].subnetId + `',
          availabilityZone: '` + vpc.publicSubnets[i].availabilityZone + `',
          routeTableId: '` + vpc.publicSubnets[i].routeTable.routeTableId + `'
        })
        `
      });
    }

    // 输出私有子网
    for (let i = 0; i < vpc.privateSubnets.length; i++) {
      new cdk.CfnOutput(this, 'vpc-privateSubnets-' + i, {
        value: `
        ec2.Subnet.fromSubnetAttributes(scope, 'private-` + (i + 1) + `', {
          subnetId: '` + vpc.privateSubnets[i].subnetId + `',
          availabilityZone: '` + vpc.privateSubnets[i].availabilityZone + `',
          routeTableId: '` + vpc.privateSubnets[i].routeTable.routeTableId + `'
        })
        `
      });
    }

  }
}
