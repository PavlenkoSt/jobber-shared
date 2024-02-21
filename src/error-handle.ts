import { StatusCodes } from "http-status-codes";

export interface IError {
  statusCode: StatusCodes;
  message: string;
  comingFrom: string;
}

abstract class CustomError extends Error {
  abstract statusCode: StatusCodes;
  comingFrom: string;

  constructor(message: string, comingFrom: string) {
    super(message);
    this.comingFrom = comingFrom;
  }
}

export class BadRequest extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;

  constructor(message: string, commingFrom: string) {
    super(message, commingFrom);
  }
}

export class NotFound extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;

  constructor(message: string, commingFrom: string) {
    super(message, commingFrom);
  }
}

export class NotAuthorized extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;

  constructor(message: string, commingFrom: string) {
    super(message, commingFrom);
  }
}

export class ServerError extends CustomError {
  statusCode = StatusCodes.INTERNAL_SERVER_ERROR;

  constructor(message: string, commingFrom: string) {
    super(message, commingFrom);
  }
}
