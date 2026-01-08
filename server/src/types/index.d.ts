// Type declarations for modules without built-in TypeScript support

declare module 'xss-clean' {
  import { RequestHandler } from 'express';
  function xssClean(): RequestHandler;
  export = xssClean;
}