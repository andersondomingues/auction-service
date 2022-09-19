// import {v4 as uuid} from "uuid";
import AWS from "aws-sdk";
import commonMiddleware from "../../lib/commonMiddleware.js";
import createError from 'http-errors';


async function getAuctions(event, context) {
  
  const dynamodb = new AWS.DynamoDB.DocumentClient();
  let auctions;

  try {
    const result = await dynamodb.scan({
      TableName: process.env.AUCTIONS_TABLE_NAME,
    }).promise();

    auctions = result.Items;


  } catch (error) {
    console.error(error);
    throw new createError.InternalServerError(error);
  }


  return {
    statusCode: 201,
    body: JSON.stringify(auctions),
  };
}

export const handler = commonMiddleware(getAuctions);

