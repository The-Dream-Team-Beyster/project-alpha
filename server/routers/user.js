const { Router } = require('express');

const userController = require('../controllers/user.js');

const userRouter = Router();

userRouter.get("/scores", userController.getHighscore)
userRouter.post("/register", userController.register);
userRouter.post("/login", userController.login);
userRouter.patch("/", userController.update)

module.exports = userRouter;