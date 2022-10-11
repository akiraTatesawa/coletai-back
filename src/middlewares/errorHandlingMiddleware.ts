/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { ErrorType, Errors } from "../entities/CustomError";

interface ErrorHandlerObject extends ErrorRequestHandler, Error {
  type: ErrorType;
  message: string;
}

export async function handleError(
  error: ErrorHandlerObject,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  const { message, type } = error;

  if (Errors[type]) {
    const { status, name } = Errors[type];
    return res.status(status).json({ name, message });
  }

  console.log(error);
  return res.sendStatus(500);
}
