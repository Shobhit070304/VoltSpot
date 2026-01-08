// Type declarations for modules without built-in TypeScript support

declare module 'xss-clean' {
  import { RequestHandler } from 'express';
  function xssClean(): RequestHandler;
  export = xssClean;
}

declare module 'express-mongo-sanitize' {
  import { RequestHandler } from 'express';
  function mongoSanitize(options?: any): RequestHandler;
  export = mongoSanitize;
}