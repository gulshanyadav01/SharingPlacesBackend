const { v4: uuidv4 } = require('uuid');

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
    }
]


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


exports.getPlaceByUserId = (req, res, next) => { 
    const userId = req.params.uid;
    const place = DUMMY_PLACES.find(p => { 
        return p.creator === userId;
    })
    if(!place){
        
        
       return next(new HttpError("could not find a place for the provided user id "));

    }
     res.status(200).json({ data: place}); // {place } => {place: place}
};


exports.createPlace = (req, res, next) => { 
    const {title, description, coordinates, address, creator} = req.body;

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