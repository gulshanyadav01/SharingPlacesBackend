const { v4: uuidv4 } = require('uuid');
const { validationResult } = require("express-validator");
const Place = require("../model/Place");

const HttpError = require("../model/http-error");

// get the places by id 
exports.getPlaceById = async(req, res, next) => { 

    const placeId  = req.params.pid;
    try{
      const place =   await Place.findById(placeId)
      res.status(200).json({place});
        
    }catch(err){
        return next(new HttpError("could not find places for this id "));
    }
}



// get the place by user id
exports.getPlacesByUserId = async(req, res, next) => { 
    const userId = req.params.uid;
    try{
       const place =  await Place.find({creator: userId})
       res.status(200).json({place});

    }catch(err){
        return next(new HttpError("could not find a place for the provided user id"));

    }
};


// create new place 
exports.createPlace =  async(req, res, next) => { 
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        throw new HttpError("invalid inputs passed, please check the data", 422);
    }
    const {title, description, address, imageUrl, creator} = req.body;
   const  coordinates = {
       lat:1,
       lan:2,
   }
    const createdPlace = new Place({
        title,
        description,
        address,
        creator,
        location: coordinates,
        imageUrl
    });
    try{
        await createdPlace.save();
        res.status(201).json({createdPlace});

    }catch(err){
       return next(new HttpError("create a place failed, please try again later", 422));
    }
}


// update place by id 
exports.updatePlaceById = async(req, res, next) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        throw new HttpError("please input the valid title and description", 422);
    }
    const {title, description } = req.body;
    const placeId = req.params.pid;
    let place;
    try{
         place = await Place.findById(placeId);
       

    }
    catch(err){
        return next(new HttpError("something went wrong could not update this place"), 500)
    }

    place.title = title;
    place.description = description;

    try{
        await place.save();
    }
    catch(err){
          return   next (new HttpError("could not update this place"));

    }
res.status(201).json({place:place});

    
};



// delete place by id 
exports.deletePlaceById = async(req, res, next) => {
    const placeId = req.params.pid;
    try{
        await Place.findByIdAndRemove(placeId);
        res.status(200).json({msg:"deleted place successfully"});


    }catch(err){
        return (new HttpError("something went wrong, could not delete place"), 500);

    }
    
};