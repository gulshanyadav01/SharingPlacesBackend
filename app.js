const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");

const app = express();

app.use(bodyParser.json());

app.use("/api/places/", placesRoutes);// /api/places/..

app.use((error, req, res, next) => { 
    if(res.headerSent) { 
      
        return next(error);
    }
   
    // something went on the server
    res.status(error.code || 500)
    res.json({message:error.message || "an unknown error occured!"});



})




app.listen(5000);