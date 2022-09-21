import commonMiddleware from "../../lib/commonMiddleware.js";

async function processAuctions(event, context) {
  console.log(`processing auctions!`);

  return {
    statusCode: 200,
    body: JSON.stringify(event),
  }
}

export const handler = processAuctions;
