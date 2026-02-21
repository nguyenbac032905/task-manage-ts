import taskRoutes from "./task.route";
import userRoutes  from "./user.route";
import {Express} from 'express';
import * as authenMiddleware from "../middlewares/auth.middleware";
const routes = (app: Express): void => {
    app.use("/tasks",authenMiddleware.authMiddleware,taskRoutes);
    app.use("/users",authenMiddleware.authMiddleware, userRoutes)
}
export default routes;