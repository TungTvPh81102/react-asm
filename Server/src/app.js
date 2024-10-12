import express from "express";
import cors from "cors";
import { connectDB } from "./config/connectionDB";
import router from "./routes/index.routes";
import { errorCommon, errorNotFound } from "./errors/error";
import { PORT } from "./config/env";

const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use("/api", router);

app.use(errorNotFound, errorCommon);

export const viteNodeApp = app;
