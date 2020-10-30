const express = require("express");

const { check } = require("express-validator"); 

const router = express.Router();

const placeController = require('../controller/places');



// get the place by place id 
router.get("/:pid", placeController.getPlaceById);

// get the places by user id;
router.get("/user/:uid", placeController.getPlacesByUserId);

// create the new place 
router.post("/",[
    check("title")
        .not()
        .isEmpty(),
    check("description")
        .isLength({min: 5}),
    check("address")
        .not()
        .isEmpty()    
], placeController.createPlace);


//update the place by id; 
router.patch("/:pid",[
    check("title")
        .not()
        .isEmpty(),
    check("description")
        .not()
        .isEmpty()
], placeController.updatePlaceById);

// delete Place by id; 
router.delete("/:pid",placeController.deletePlaceById);


module.exports = router;