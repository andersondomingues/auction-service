import {v4 as uuid} from "uuid";
import AWS from "aws-sdk";
import commonMiddleware from "../../lib/commonMiddleware.js";
import createError from 'http-errors';

async function createAuction(event, context) {
  const { title } = event.body;

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  const now = new Date();
  const expiration = new Date();
  expiration.setHours(now.getHours() + 1);

  const auction = {
    id: uuid(),
    title,
    status: 'OPEN',
    createdAt: now.toISOString(),
    endingAt: expiration.toISOString(),
    highestBid: {
      amount: 0,
    },
  }

  try {
    await dynamodb.put({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Item: auction,
    }).promise();
  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = commonMiddleware(createAuction);


