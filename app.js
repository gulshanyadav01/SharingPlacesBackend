const express = require("express");
const bodyParser = require("body-parser");

const placesRoutes = require("./routes/places-routes");
const userRoutes = require("./routes/user-routes");
const HttpError = require("./model/http-error")

const app = express();

app.use(bodyParser.json());

app.use("/api/places/", placesRoutes);// /api/places/..

app.use("/api/users/", userRoutes);


// error middle ware 
app.use((req, res, next) => { 
    const error = new HttpError("could not find this route", 404);
    throw error;

})

app.use((error, req, res, next) => { 
    if(res.headerSent) { 
      
        return next(error);
    }
     // something went on the server
    res.status(error.code || 500)
    res.json({message:error.message || "an unknown error occured!"});
});




app.listen(5000);