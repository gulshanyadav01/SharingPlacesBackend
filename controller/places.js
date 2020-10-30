const { v4: uuidv4 } = require('uuid');
const { validationResult } = require("express-validator");

const HttpError = require("../model/http-error");
const DUMMY_PLACES = [
    {
        id: "p1",
        title: "empire state building",
        description: "one of the most famous sky scappers in the world",
        imageUrl:"https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
        address: "Noida",
        location: {
            lat:123,
            lng:13
        },
        creator: "u1"
    },
    {
        id: "p2",
        title: "Noida state building",
        description: "one of the most famous sky scappers in the world",
        imageUrl:"https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
        address: "Noida",
        location: {
            lat:123,
            lng:13
        },

        creator: "u2"
    },
    {
        id: "p2",
        title: "Noida state building",
        description: "one of the most famous sky scappers in the world",
        imageUrl:"https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
        address: "Noida",
        location: {
            lat:123,
            lng:13
        },

        creator: "u2"
    },
    {
        id: "p2",
        title: "Noida state building",
        description: "one of the most famous sky scappers in the world",
        imageUrl:"https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
        address: "Noida",
        location: {
            lat:123,
            lng:13
        },

        creator: "u2"
    },
    {
        id: "p2",
        title: "Noida state building",
        description: "one of the most famous sky scappers in the world",
        imageUrl:"https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
        address: "Noida",
        location: {
            lat:123,
            lng:13
        },

        creator: "u2"
    },
    {
        id: "p2",
        title: "Noida state building",
        description: "one of the most famous sky scappers in the world",
        imageUrl:"https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
        address: "Noida",
        location: {
            lat:123,
            lng:13
        },

        creator: "u2"
    },
    {
        id: "p2",
        title: "Noida state building",
        description: "one of the most famous sky scappers in the world",
        imageUrl:"https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
        address: "Noida",
        location: {
            lat:123,
            lng:13
        },

        creator: "u2"
    },
    {
        id: "p2",
        title: "Noida state building",
        description: "one of the most famous sky scappers in the world",
        imageUrl:"https://i.picsum.photos/id/10/2500/1667.jpg?hmac=J04WWC_ebchx3WwzbM-Z4_KC_LeLBWr5LZMaAkWkF68",
        address: "Noida",
        location: {
            lat:123,
            lng:13
        },

        creator: "u2"
    }
]

// get the places by id 
exports.getPlaceById = (req, res, next) => { 
    console.log("get request in places");
    const placeId  = req.params.pid;

    const place = DUMMY_PLACES.find(p => {
        return p.id === placeId;
    })
    if(!place){
        // res.status(400).json({msg:"could not find a place for the provided id."});
        throw new HttpError("could not find the place for the provided id ", 404);   

    }
    res.status(200).json({ data: place}); // {place } => {place: place}
};



// get the place by user id
exports.getPlacesByUserId = (req, res, next) => { 
    const userId = req.params.uid;

    // a user might have multiple places.
    // const place = DUMMY_PLACES.find(p => { 
    //     return p.creator === userId;
    // })
    // so tweek the logic 
    const place = DUMMY_PLACES.filter(p=>{
        return p.creator === userId;
    })

    if(!place || place.length == 0){
       return next(new HttpError("could not find a place for the provided user id "));
    }
     res.status(200).json({ data: place}); // {place } => {place: place}
};


// create new place 
exports.createPlace = async (req, res, next) => { 
    const error = validationResult(req);
    if(!error.isEmpty()){
        console.log(error);
        throw new HttpError("invalid inputs passed, please check the data", 422);
    }
    const {title, description, address, creator} = req.body;
   const  coordinates = {
       lat:1,
       lan:2,
   }
    const createdPlace = {
        id:uuidv4(),
        description,
        title,
        location: coordinates,
        address,
        creator
    }

    DUMMY_PLACES.push(createdPlace);
    res.status(201).json({places: createdPlace});
}


// update place by id 
exports.updatePlaceById = (req, res, next) =>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        throw new HttpError("please input the valid title and description", 422);
    }
    const {title, description } = req.body;
    const placeId = req.params.pid;

    const updatedPlace = {...DUMMY_PLACES.find(p => p.id === placeId)}

    const placeIndex = DUMMY_PLACES.findIndex(p => {
        return p.id === placeId;
    })

    updatedPlace.title = title;
    updatedPlace.description = description;

    DUMMY_PLACES[placeIndex] = updatedPlace;

    res.status(200).json({place: updatedPlace});
};



// delete place by id 
exports.deletePlaceById = (req, res, next) => {
    const placeId = req.params.pid;
    if(!DUMMY_PLACES.find(p => p.id === placeId)){
        throw new HttpError("could not find places for that id ", 404);
    }
    let newPlace = DUMMY_PLACES.filter(p => {
        return p.id !== placeId;
    })
    res.status(200).json({msg:"deleted place successfully", newPlace});
};