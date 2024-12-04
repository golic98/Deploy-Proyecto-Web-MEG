import { Router } from "express";
import { authRequired } from "../middlewares/validate.token.js";
import { getTask, getOneTask, createTask, updateTask, deleteTask, getTaskHome } from "../controllers/task.controller.js";
import { getTask2, getOneTask2, createTask2, updateTask2, deleteTask2, getTaskHome2 } from "../controllers/task2.controller.js";
import { validateSchema } from "../middlewares/validate.middleware.js";
import { createTaskSchema, createTaskSchema2 } from "../schema/task.schema.js";

const router = Router();

router.post("/task", authRequired, validateSchema(createTaskSchema), createTask);
router.get("/task", authRequired, getTask);
router.get("/taskhome", authRequired, getTaskHome);
router.get("/task/:id", authRequired, getOneTask);
router.delete("/task/:id", authRequired, deleteTask);
router.put("/task/:id", authRequired, updateTask);

router.post("/taskd", authRequired, validateSchema(createTaskSchema2), createTask2);
router.get("/taskd", authRequired, getTask2);
router.get("/taskhomed", authRequired, getTaskHome2);
router.get("/taskd/:id", authRequired, getOneTask2);
router.delete("/taskd/:id", authRequired, deleteTask2);
router.put("/taskd/:id", authRequired, updateTask2);

export default router;