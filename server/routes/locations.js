const { Router } = require('express')

const locationRouter = require("../controllers/locations");

const locationRouter = Router()

locationRouter.get("/:id", locationRouter.getCountry);
locationRouter.get("/:", locationRouter.revealCountry);

module.exports = locationRouter;