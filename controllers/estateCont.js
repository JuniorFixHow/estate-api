import Building from "../models/Building.js";
import Estate from "../models/Estate.js";

export const createEatate = async(req, res, next)=>{
    
    const newEstate = new Estate(req.body);
    try {
        const saveEstate = await newEstate.save();
        res.status(200).json(saveEstate);
    } catch (err) {
        next(err)
    }
}

export const updateEstate = async(req, res, next)=>{
    try {
        const updatedEstate = await Estate.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true});
        res.status(200).json(updatedEstate);
    } catch (err) {
        next(err);
    }
}
export const deleteEstate = async(req, res, next)=>{
    try {
        await Estate.findByIdAndDelete(req.params.id);
        res.status(200).json("Estate deleted successfully");
    } catch (err) {
        next(err);
    }
}
export const getEstate = async(req, res, next)=>{
    try {
        const estate = await Estate.findById(req.params.id);
        res.status(200).json(estate);
    } catch (err) {
        next(err);
    }
}
export const getAllEstates = async(req, res, next)=>{
    const {min, max, ...others} = req.query;
    try {
        const estates = await Estate.find({
            ...others,
            cheapestPrice: {$gt:min || 1, $lt:max || 999}, 
        }).limit(req.query.limit);
        res.status(200).json(estates);
    } catch (err) {
        next(err);
    }
}

export const getPhotos = async (req, res, next)=>{
    try {
        const builds = await Estate.find();
        res.status(200).json(builds.photos);
    } catch (err) {
        next(err);
    }
}

export const countByCity = async(req, res, next)=>{
    const cities = req.query.cities.split(",")
    try {
        const list = await Promise.all(cities.map(city=>{
            return Estate.countDocuments({city:city});
        }))
        res.status(200).json(list);
    } catch (err) {
        next(err);
    }
}
export const countByType = async(req, res, next)=>{
    try {
        const estateCount =await Estate.countDocuments({type:"estate"})
        const houseCount =await Estate.countDocuments({type:"house"})        
        const apartCount =await Estate.countDocuments({type:"apartment"})        
        
        res.status(200).json([
            {type:"estate", count:estateCount},
            {type:"house", count:houseCount},
            {type:"apartment", count:apartCount},
        ]);
    } catch (err) {
        next(err);
    }
}


export const getEstateBuildings = async(req, res, next)=>{
    try {
        const estate = await Estate.findById(req.params.id);
        const list = await Promise.all(estate.buildings.map((build)=>{
            return Building.findById(build);
        }));
        res.status(200).json(list);
    } catch (err) {
        next(err)
    }
}
