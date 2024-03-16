import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import handleAllError from "./src/middleware/error-handler";
import courseRouter from "./src/router/course.router";
import ConnectMongoDb from "./mongoConnection";
import { serverStatus } from "./src/middleware/express-status";
dotenv.config();
const app: Express = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

ConnectMongoDb(app);

app.get("/", serverStatus);

//all course manipulation goes here
app.use("/api/v1/course", courseRouter);

app.use(handleAllError);
