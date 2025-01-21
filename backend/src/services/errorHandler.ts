import { Request, Response } from "express";

const handleError = (fn: Function) => {
  return (req: Request, res: Response) => {
    fn(req, res).catch((err: Error) => {
      res.status(500).json({
        message: err?.message,
      });
    });
  };
};
export default handleError;
