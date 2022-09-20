// import {v4 as uuid} from "uuid";
import AWS from "aws-sdk";
import commonMiddleware from "../../lib/commonMiddleware.js";
import createError from 'http-errors';

export async function getAuctionById (id) {

  const dynamodb = new AWS.DynamoDB.DocumentClient();

  let auction;

  try {
    const result = await dynamodb.get({
      TableName: process.env.AUCTIONS_TABLE_NAME,
      Key: { id } 
    }).promise();

    auction = result.Item;

  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }

  if (!auction) {
    throw new createError.NotFound(`Auctions with ID "${id}" not found!`)
  }

  return auction;
}

async function getAuction(event, context) {
  
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  const { id } = event.pathParameters;
  
  let auction = await getAuctionById(id);

  return {
    statusCode: 201,
    body: JSON.stringify(auction),
  };
}

export const handler = commonMiddleware(getAuction);