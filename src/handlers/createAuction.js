import {v4 as uuid} from "uuid";
import AWS from "aws-sdk";
import middy from "@middy/core";
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpHttpErrorHandler from '@middy/http-error-handler';
import createError from 'http-errors';

import httpJsonBodyParser from '@middy/http-json-body-parser';


async function createAuction(event, context) {
  const { title } = event.body;

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const now = new Date();

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
  }

  // try {
  await dynamodb.put({
    TableName: process.env.AUCTIONS_TABLE_NAME,
    Item: auction,
  }).promise();

  // } catch (error) {
  //   console.error(error);
  //   throw new createError.InternalServerError(error);
  // }

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = middy(createAuction).use([
  httpJsonBodyParser(),
  httpEventNormalizer(),
  httpHttpErrorHandler(),
]);

