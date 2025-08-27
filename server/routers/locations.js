const { Router } = require('express')

const locationController = require("../controllers/locations");

const locationRouter = Router()

locationRouter.get("/GetAllCountries", locationController.getAll);
locationRouter.get("/:id", locationController.getCountry);

//locationRouter.get("/:", locationController.getFunFact);

module.exports = locationRouter;