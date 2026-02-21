import express,{Express, Request, Response} from "express";

import dotenv from "dotenv";
dotenv.config();

import * as database from "./config/database";
database.connect();

const app: Express = express();
const port: number | string = process.env.PORT || 3000;

import bodyParser from "body-parser";
app.use(bodyParser.json());

import routes from "./routes/index.route";
routes(app);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})