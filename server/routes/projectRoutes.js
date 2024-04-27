import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

import {
  addProject,
  deleteProject,
  getAllProjects,
  getProject,
  updateProject,
  downloadProject,
} from "../controllers/projectController.js";

const router = express.Router();

router.route("/list/:userId").get(protect, getAllProjects);
router.route("/create").post(protect, addProject);
router
  .route("/:id")
  .get(protect, getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);
router.route("/downloadMarkdown").post(protect, downloadProject);

export default router;
