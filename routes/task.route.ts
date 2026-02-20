import Express from "express";
const router = Express.Router();

import {index,detail} from "../controllers/task.controller";

router.get("/", index);
router.get("/detail/:id",detail)

export default router;
