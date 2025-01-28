import sanitize from "sanitize-html";
import { AuthRequest } from "../types/userType";
import { NextFunction, Response } from "express";
const sanitizehtml = (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    for (let [key, value] of req.body) {
      req.body[key] = sanitize(value, {
        allowedTags: ["b", "i", "em", "strong", "p", "h1", "h2", "h3", "h4"],
        allowedAttributes: {
          img: ["src"],
        },
      });
    }
    next();
  } catch (error: any) {
    res.status(500).json({
      message: "something goes wrong",
      error: error?.message,
    });
  }
};
export default sanitizehtml;
