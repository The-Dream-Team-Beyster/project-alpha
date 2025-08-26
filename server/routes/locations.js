const { Router } = require('express')

const locationRouter = Router()

module.exports = locationRouter

locationRouter.get("/", locationRouter.getCountry);
locationRouter.get("/:country", locationRouter.revealCountry)