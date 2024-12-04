import { Router } from "express";
import { authRequired } from "../middlewares/validate.token.js";
import { createSchedule, createVisit, getAllSchedules, getAllVisits } from "../controllers/vigilant.controller.js";

const router = Router();
router.post("/schedules", authRequired, createSchedule);
router.post("/visit", authRequired, createVisit);
router.get("/schedules", authRequired, getAllSchedules);
router.get("/visits", authRequired, getAllVisits);

export default router;