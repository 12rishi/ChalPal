import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

import dotenv from "dotenv";
import User from "../database/models/userModel";
import { AuthRequest } from "../types/userType";
dotenv.config();

class AuthMiddleWare {
  async handleAuthentication(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const token = req?.headers?.authorization;
    if (!token || token === undefined) {
      res.status(401).json({
        message: "unauthorized access to the system",
      });
      return;
    }
    const decoded = jwt.verify(
      token,
      process.env.SECRET_KEY as string,
      async (err, decoded: any): Promise<void> => {
        try {
          if (err) {
            res.status(401).json({
              message: "invalid token",
            });
            return;
          } else {
            const decodedData = decoded?.id;
            const isDataAvailable = await User.findByPk(decodedData);
            if (!isDataAvailable) {
              res.status(404).json({
                message: "no user has been found",
              });
              return;
            }

            (req as AuthRequest).userId = decodedData;
            next();
          }
        } catch (error: any) {
          res.status(500).json({
            message: error?.message,
          });
        }
      }
    );
  }
}
export default new AuthMiddleWare();
