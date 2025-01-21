import { NextFunction, Request, Response } from "express";
import User from "../database/models/userModel";
import * as bcryptjs from "bcryptjs";
import { loginData, NodeMailerData, UserData } from "../types/userType";
import * as jwt from "jsonwebtoken";
import { Sequelize } from "sequelize-typescript";
import sequelize from "../database/connection";
import { QueryTypes } from "sequelize";
import sendMail from "../services/nodeMailer";

class UserCredentialController {
  async verifyToken(req: Request, res: Response): Promise<void> {
    try {
      const email = req.params?.email;
      console.log(email);

      const otp = Number(req.body.OTP);
      const user: any = await User.findOne({ where: { email } });
      console.log("OTP provided by user:", otp);
      console.log("OTP from database:", user?.otp);
      console.log("OTP Generate Time:", user?.otpGenerateTime);
      console.log("Current Time:", Date.now());

      const otpGenerateTime = user?.otpGenerateTime;

      if (
        user &&
        otp === user?.otp &&
        otpGenerateTime &&
        Date.now() - otpGenerateTime < 120000
      ) {
        user.verified = true;
        user.otp = null;
        await user.save();
        res.status(200).json({ message: "verified" });
      } else {
        res.status(400).json({ message: "could not verify" });
      }
    } catch (error: any) {
      res
        .status(500)
        .json({ message: "internal server error", error: error?.message });
    }
  }

  async registerUser(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const { userName, email, password, confirmPassword } = req.body as UserData;

    if (!userName || !email || !password || !confirmPassword) {
      res.status(400).json({ message: "Provide all the credentials" });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ message: "Passwords do not match" });
      return;
    }

    const hashedPassword = await bcryptjs.hash(password, 10);
    const userObject = { userName, email, hashedPassword };

    (req as any).userObject = userObject;
    next();
  }

  async createMultitenant(req: Request, res: Response): Promise<void> {
    const { userName, email, hashedPassword } = (req as any).userObject;

    try {
      const registerUser = await User.create({
        userName,
        email,
        password: hashedPassword,
      });

      const OTP = Math.floor(1000 + Math.random() * 9000);
      const nodeData: NodeMailerData = {
        from: "chalpal123@gmail.com",
        to: email,
        subject: "verify OTP",
        text: `your OTP is ${OTP}.Kindly don't share this with anyone`,
      };

      const responseFromNodeMail = await sendMail(nodeData);

      if (responseFromNodeMail.response?.startsWith("250")) {
        registerUser.otp = OTP;
        registerUser.otpGenerateTime = Date.now();
        await registerUser.save();

        // Step 2: Create the dynamic user table
        await sequelize.query(
          `CREATE TABLE \`user_${registerUser.id}\` (
            id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
            userName VARCHAR(255) NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            usersId CHAR(36) UNIQUE
          )`
        );

        // Step 3: Insert data into the dynamic user table
        await sequelize.query(
          `INSERT INTO \`user_${registerUser.id}\` (userName, email, usersId) VALUES (?, ?, ?)`,
          {
            type: QueryTypes.INSERT,
            replacements: [userName, email, registerUser.id],
          }
        );

        // Step 4: Create the dynamic post table
        await sequelize.query(
          `CREATE TABLE IF NOT EXISTS \`post_${registerUser.id}\` (
            id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
            file VARCHAR(255),
            text VARCHAR(255),
            userId CHAR(36),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (userId) REFERENCES \`user_${registerUser.id}\`(usersId)
              ON DELETE CASCADE ON UPDATE CASCADE
          )`
        );

        // Step 5: Create comments and likes tables
        await sequelize.query(
          `CREATE TABLE IF NOT EXISTS \`comments_${registerUser.id}\` (
            id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
            userId CHAR(36) NOT NULL,
            perspective VARCHAR(366) NOT NULL,
            postId CHAR(36),
            FOREIGN KEY (postId) REFERENCES \`post_${registerUser.id}\`(id)
          )`
        );

        await sequelize.query(
          `CREATE TABLE IF NOT EXISTS \`likes_${registerUser.id}\` (
            id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
            userId CHAR(36) NOT NULL,
            postId CHAR(36),
            FOREIGN KEY (postId) REFERENCES \`post_${registerUser.id}\`(id)
          )`
        );

        res
          .status(200)
          .json({ message: "User and post tables created successfully" });
      } else {
        throw new Error("Could not verify the email");
      }
    } catch (error: any) {
      console.error("Error creating tables:", error);
      res
        .status(500)
        .json({ message: "Failed to create tables", error: error.message });
    }
  }

  async loginUser(req: Request, res: Response): Promise<void> {
    const { email, password } = req.body as loginData;

    if (!email || !password) {
      res.status(400).json({ message: "Please provide all the credentials" });
      return;
    }

    const userData = await User.findOne({ where: { email, verified: true } });

    if (!userData) {
      res.status(404).json({ message: "Invalid credentials" });
      return;
    }

    const isPasswordValid = await bcryptjs.compare(password, userData.password);

    if (!isPasswordValid) {
      res.status(400).json({ message: "Invalid credentials" });
      return;
    }

    const token = jwt.sign(
      { id: userData.id },
      process.env.SECRET_KEY as string,
      { expiresIn: "20d" }
    );

    res.status(200).json({
      message: "Successfully logged in",
      data: userData,
      token,
    });
  }
}

export default new UserCredentialController();
