import { Router } from "express";
import StudentsController from "./app/controllers/StudentsController";
import SessionController from "./app/controllers/SessionController";
import authMiddleware from "./app/middlwares/auth";
import PlanController from "./app/controllers/PlanController";
import MatriculaContoller from "./app/controllers/MatriculaController";
import CheckinController from "./app/controllers/CheckinController";

const routes = new Router();
routes.post("/users", authMiddleware, StudentsController.store);
routes.post("/sessions", SessionController.store);
routes.put("/users", authMiddleware, StudentsController.update);
routes.get("/users", authMiddleware, StudentsController.index);

routes.get("/plan", authMiddleware, PlanController.index);
routes.post("/plan", authMiddleware, PlanController.store);
routes.put("/plan", authMiddleware, PlanController.update);
routes.delete("/plan/:id", authMiddleware, PlanController.delete);

routes.post("/matricula", authMiddleware, MatriculaContoller.store);
routes.get("/matricula", authMiddleware, MatriculaContoller.index);
routes.delete("/matricula/:id", authMiddleware, MatriculaContoller.delete);

routes.post("/students/:id/checkins", authMiddleware, CheckinController.store);


export default routes;
