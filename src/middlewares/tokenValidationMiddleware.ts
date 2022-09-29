import { NextFunction, Request, Response } from "express";
import { CustomError } from "../entities/CustomError";
import { JWTUtils } from "../utils/JWTUtils";

export async function validateToken(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { authorization } = req.headers;
  if (!authorization) {
    throw new CustomError("error_bad_request", "Token must be sent");
  }
  if (!authorization.startsWith("Bearer ")) {
    throw new CustomError("error_unprocessable_entity", "Invalid token format");
  }

  try {
    const jwtUtils = new JWTUtils(process.env.JWT_SECRET);

    const { userId } = (await jwtUtils.verifyToken(
      authorization.replace("Bearer ", "")
    )) as {
      userId: number;
    };

    res.locals.userId = userId;

    return next();
  } catch (error: any) {
    return next(
      new CustomError(
        "error_unauthorized",
        `Error decoding token: ${error.message}`
      )
    );
  }
}
