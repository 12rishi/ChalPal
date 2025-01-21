import * as nodemailer from "nodemailer";
import { NodeMailerData } from "../types/userType";
import dotenv from "dotenv";
import { Error } from "sequelize";
dotenv.config();
const sendMail = async (data: NodeMailerData) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.NODEMAILER_USER as string,
        pass: process.env.NODEMAILER_PASS as string,
      },
    });
    let mailOptions = {
      from: data.from,
      to: data.to,
      subject: data.subject,
      text: data.text,
    };
    const transportResponse = await transporter.sendMail(mailOptions);
    return transportResponse;
  } catch (error: any) {
    return error?.message;
  }
};
export default sendMail;
