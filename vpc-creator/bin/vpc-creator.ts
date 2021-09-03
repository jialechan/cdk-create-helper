#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { VpcCreatorStack } from '../lib/vpc-creator-stack';

const app = new cdk.App();
new VpcCreatorStack(app, 'VpcCreatorStack', {});
