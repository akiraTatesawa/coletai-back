import dotenv from "dotenv";
import express from "express";
import "express-async-errors";
import cors from "cors";
import { serverRouter } from "./routes";
import { handleError } from "./middlewares/errorHandlingMiddleware";

dotenv.config();

export const app = express();

app.use(cors());
app.use(express.json());

app.use(serverRouter);
app.use(handleError);
