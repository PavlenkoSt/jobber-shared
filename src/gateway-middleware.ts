import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { NotAuthorized } from "./error-handle";

const tokens: string[] = [
  "auth",
  "seller",
  "gig",
  "search",
  "buyer",
  "message",
  "order",
  "review",
];

export const verifyGatewayRequest = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers?.gatewayToken as string | undefined;

  if (!token) {
    throw new NotAuthorized(
      "Request not coming from gateway, forbidden",
      "verifyGatewayRequest"
    );
  }

  try {
    const payload = JWT.verify(token, "secret") as { id: string; iat: number };

    if (!tokens.includes(payload.id)) {
      throw new NotAuthorized(
        "Invalid gateway token, forbidden",
        "verifyGatewayRequest"
      );
    }

    next();
  } catch (e) {
    throw new NotAuthorized(
      "Invalid gateway token, forbidden",
      "verifyGatewayRequest"
    );
  }
};
