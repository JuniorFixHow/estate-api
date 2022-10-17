import express from "express";
import { createBuilding, deleteBuilding, getBuilding, getBuildings, updateBuilding } from "../controllers/buildingCont.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

router.post("/:estateid", verifyAdmin, createBuilding);

router.put("/:id", verifyAdmin, updateBuilding)

router.delete("/:id/:estateid", verifyAdmin, deleteBuilding);

router.get("/:id", getBuilding);

router.get("/", getBuildings);

export default router