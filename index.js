import dotenv from "dotenv";

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import router from "./router.js";
import errorsMiddleware from "./middleWare/error.js";
import db from "./mongoConf.js";

dotenv.config();
const PORT = process.env.PORT || 8080;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use("/api", router);
app.use(errorsMiddleware);

const ban = async () => { /////////////????
  try {
    await db();
    app.listen(PORT, () => console.log(`Server listen at PORT: ${PORT}`));
  } catch (err) {
    console.log(err);
  }
};
ban();
