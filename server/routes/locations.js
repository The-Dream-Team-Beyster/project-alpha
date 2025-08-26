const { Router } = require('express')

const locationRouter = require("../controllers/locations");

const locationRouter = Router()

locationRouter.get("/", locationRouter.getCountry);
locationRouter.get("/:country", locationRouter.revealCountry);

module.exports = locationRouter;