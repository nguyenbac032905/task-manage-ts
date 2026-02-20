import taskRoutes from "./task.route";
import {Express} from 'express';
const routes = (app): void => {
    app.use("/tasks",taskRoutes);
}
export default routes;