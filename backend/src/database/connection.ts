import { Sequelize } from "sequelize-typescript";
import dotenv from "dotenv";
dotenv.config();
console.log(process.env.DB_NAME);
const sequelize = new Sequelize({
  database: process.env.DB_NAME,
  dialect: "mysql",
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD || "",
  host: process.env.DB_HOST || "localhost",
  port: Number(process.env.DB_PORT),
  models: [__dirname + "/models"],
});

sequelize
  .authenticate()
  .then(() => {
    console.log("successfully connected to db");
  })
  .catch((err: Error) => {
    console.log(err?.message);
  });
sequelize.sync({ force: false }).then(() => {
  console.log("successfully sync");
});
export default sequelize;
