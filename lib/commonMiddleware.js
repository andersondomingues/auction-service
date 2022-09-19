import middy from "@middy/core";
import httpEventNormalizer from '@middy/http-event-normalizer';
import httpHttpErrorHandler from '@middy/http-error-handler';
import httpJsonBodyParser from '@middy/http-json-body-parser';

export default handler => middy(handler).use([
  httpJsonBodyParser(),
  httpEventNormalizer(),
  httpHttpErrorHandler(),
]);
