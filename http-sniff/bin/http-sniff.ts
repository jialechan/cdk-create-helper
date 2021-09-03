#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from '@aws-cdk/core';
import { HttpSniffStack } from '../lib/http-sniff-stack';

const app = new cdk.App();
new HttpSniffStack(app, 'HttpSniffStack');
