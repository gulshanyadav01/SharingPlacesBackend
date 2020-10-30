const express = require("express");

const router = express.Router();

const placeController = require('../controller/places');

router.get("/:pid", placeController.getPlaceById);

// get the places by user id 
router.get("/user/:uid", placeController.getPlaceByUserId);

router.post("/", placeController.createPlace);


module.exports = router;