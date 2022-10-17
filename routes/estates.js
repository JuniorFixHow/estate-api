import express from "express";
import { countByCity, countByType, createEatate, deleteEstate, getAllEstates, getEstate, getEstateBuildings, getPhotos, updateEstate } from "../controllers/estateCont.js";
import Estate from "../models/Estate.js";
import { verifyAdmin } from "../utils/verifyToken.js";
const router = express.Router();

//create
router.post("/", verifyAdmin, createEatate);

//update
router.put("/:id", verifyAdmin, updateEstate)

//delete
router.delete("/:id", verifyAdmin, deleteEstate)
 
//get
router.get("/:id", getEstate)

//getall
router.get("/", getAllEstates)
router.get("/photos", getPhotos)


router.get("/countByCity", countByCity)
router.get("/countByType", countByType)
router.get("/building/:id", getEstateBuildings)

export default router;