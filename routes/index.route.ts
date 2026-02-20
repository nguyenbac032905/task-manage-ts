import taskRoutes from "./task.route"
const routes = (app) => {
    app.use("/tasks",taskRoutes);
}
export default routes;