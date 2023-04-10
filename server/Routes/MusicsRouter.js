import express from "express";
import * as musicsController from "../Controllers/MusicsController.js";
import { protect, admin } from "../middlewares/Auth.js";

const router = express.Router();

// ******** PUBLIC ROUTES ********
router.post("/import", musicsController.importMusics);
router.get("/", musicsController.getMusics);
router.get("/:id", musicsController.getMusicById);
router.get("/rated/top", musicsController.getTopRatedMusics);
router.get("/random/all", musicsController.getRandomMusics);

// ******** PRIVATE ROUTES ********
router.post("/:id/reviews", protect, musicsController.createMusicReview);

// ******** ADMIN ROUTES ********
router.put("/:id", protect, admin, musicsController.updateMusic);
router.delete("/:id", protect, admin, musicsController.deleteMusic);
router.delete("/", protect, admin, musicsController.deleteAllMusics);
router.post("/", protect, admin, musicsController.createMusic);

export default router;
