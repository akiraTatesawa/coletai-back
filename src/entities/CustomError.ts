export const Errors = {
  error_bad_request: {
    status: 400,
    name: "Bad Request",
  },
  error_unauthorized: {
    status: 401,
    name: "Unauthorized",
  },
  error_forbidden: {
    status: 403,
    name: "Forbidden",
  },
  error_not_found: {
    status: 404,
    name: "Not Found",
  },
  error_conflict: {
    status: 409,
    name: "Conflict",
  },
  error_unprocessable_entity: {
    status: 422,
    name: "Unprocessable Entity",
  },
  error_internal_server_error: {
    status: 500,
    name: "Internal Server Error",
  },
};

export type ErrorType = keyof typeof Errors;

export interface CustomErrorInterface {
  type: ErrorType;
  message: string;
}

export class CustomError {
  type: ErrorType;

  message: string;

  constructor(type: ErrorType, message: string) {
    this.type = type;
    this.message = message;
  }
}
