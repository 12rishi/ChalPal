import { Response } from "express";
import { AuthRequest } from "../types/userType";
import sequelize from "../database/connection";
import { QueryTypes } from "sequelize";

class PostController {
  async postMoment(req: AuthRequest, res: Response): Promise<void> {
    console.log("obtained body is", req.body);
    const text = req.body.text || "";
    const fileType = req.file?.mimetype as string;
    const allowedVideoFile = [
      "video/mp4",
      "video/mpeg",
      "video/webm",
      "video/mov",
      "video/quicktime",
    ];
    if (allowedVideoFile.includes(fileType)) {
      await sequelize.query(`INSERT INTO videos(userId,file) VALUES(?,?)`, {
        type: QueryTypes.INSERT,
        replacements: [req.userId, req.file?.filename],
      });
    }
    const filename = req.file?.filename || "";
    if (!text && !filename) {
      res.status(400).json({
        message:
          "please provide the things to be posted empty daqta cannot be posted",
      });
      return;
    }

    const userId = req.userId;
    const storeOnDb = await sequelize.query(
      `INSERT INTO \`post_${req.userId}\`(file,text,userId) VALUES(?,?,?)`,
      {
        type: QueryTypes.INSERT,
        replacements: [filename, text, userId],
      }
    );
    res.status(200).json({
      message: "successfully posted the moment",
    });
  }
  async handleLikes(
    req: AuthRequest,
    res: Response,
    postId: string,
    userId: string
  ): Promise<number> {
    if (!postId || !userId) {
      res.status(400).json({ message: "Provide all credentials" });
      return 0;
    }

    const [likeExists] = (await sequelize.query(
      `SELECT COUNT(*) AS count FROM \`like_${userId}\` WHERE postId=? AND userId=?`,
      {
        type: QueryTypes.SELECT,
        replacements: [postId, userId],
      }
    )) as { count: number }[];

    if (likeExists.count === 0) {
      await sequelize.query(
        `INSERT INTO \`like_${userId}\` (userId, postId) VALUES(?, ?)`,
        {
          type: QueryTypes.INSERT,
          replacements: [req.userId, postId],
        }
      );
    }

    const [likeCount] = (await sequelize.query(
      `SELECT COUNT(*) AS count FROM \`like_${userId}\` WHERE postId=?`,
      {
        type: QueryTypes.SELECT,
        replacements: [postId],
      }
    )) as { count: number }[];

    return likeCount.count;
  }
}
export default new PostController();
