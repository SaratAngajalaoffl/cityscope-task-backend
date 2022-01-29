/** @format */

process.env.TZ = "Asia/Calcutta";
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

import db from "./app/helpers/mongo-helper";
import routes from "./app/routes";

const morgan = require("morgan");

const app = express();

db();

app.set("JWTSecretKey", process.env.JWT_SECRET);
app.use(morgan("dev"));
app.use(cors());
// app.use(express.static("uploads"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(routes);

app.listen(8080, () => {
	console.log("HTTP Server running on port 8080");
});

export default app;
