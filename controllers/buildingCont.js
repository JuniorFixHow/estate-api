import Building from "../models/Building.js";
import Estate from "../models/Estate.js";
import { createError } from "../utils/error.js";

export const createBuilding = async (req, res, next)=>{
    const estateId = req.params.estateid;
    const newBuild = new Building(req.body);
    try {
        const savedBuild = await newBuild.save();
        try {
            await Estate.findByIdAndUpdate(estateId, {
                $push: {buildings: savedBuild._id},
            });
        } catch (err) {
            next(err)
        }
        res.status(200).json(savedBuild);
    } catch (err) {
        next(err)
    }
}

export const updateBuilding = async (req, res, next)=>{
    try {
        const updatedBuild = await Building.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
        );
        res.status(200).json(updatedBuild);
    } catch (err) {
        next(err);
    }
}

export const deleteBuilding = async (req, res, next)=>{
    const estateId = req.params.estateid;
    try {
        await Building.findByIdAndDelete(req.params.id);
        try {
            await Estate.findByIdAndUpdate(estateId,{
                $pull: {buildings: req.params.id},
            });
        } catch (err) {
            next(err);
        }
        res.status(200).json("Building deleted successfully");
    } catch (err) {
        next(err);
    }
}

export const getBuilding = async (req, res, next)=>{
    try {
        const build = await Building.findById(req.params.id);
        res.status(200).json(build);
    } catch (err) {
        next(err);
    }
}

export const getBuildings = async (req, res, next)=>{
    try {
        const builds = await Building.find();
        res.status(200).json(builds);
    } catch (err) {
        next(err);
    }
}