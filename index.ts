import express,{Express, Request, Response} from "express";
import dotenv from "dotenv";
dotenv.config();
import * as database from "./config/database";
database.connect();
const app: Express = express();
const port: number | string = process.env.PORT || 3000;

app.get("/tasks", (req: Request,res: Response) => {
    res.send("List of task");
})
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})