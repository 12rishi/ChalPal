import express, { Application } from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/userRoute";
import postRoute from "./routes/postRoute";
dotenv.config();
import "./database/connection";
import sequelize from "./database/connection";
import sendMail from "./services/nodeMailer";

const app: Application = express();
app.use(
  cors({
    origin: "*",
    methods: ["POST", "GET", "UPDATE", "PATCH", "DELETE", "OPTIONS"],
  })
);
const data = {
  from: "chalpal123@gmail.com",
  to: "thaparishi369@gmail.com",
  subject: "testing",
  text: "hello am rishi",
};
// (async () => {
//   try {
//     const responseFromNodeMailer = await sendMail(data);

//     console.log(responseFromNodeMailer.response.split(" ")[2]);
//   } catch (error: any) {
//     console.log(error.message);
//   }
// })();

app.use(express.json());

app.use("/", userRoute);
app.use("/", postRoute);
const PORT = Number(process.env.PORT) || 3000;
app.listen(PORT, async () => {
  await sequelize.query(`CREATE TABLE IF NOT EXISTS Videos (
    id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
    userId CHAR(36) NOT NULL,
    file VARCHAR(366) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP)`);

  console.log("server has started at port no " + PORT);
});
