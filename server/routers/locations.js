const { Router } = require('express')

const locationController = require("../controllers/locations");

const locationRouter = Router()

locationRouter.get("/:id", locationController.getCountryName);
locationRouter.get("/:", locationController.getFunFact);

module.exports = locationRouter;