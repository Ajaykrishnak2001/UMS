import express from 'express';
const userRouter =express.Router()
import * as userController from '../controller/userController.js'
import upload from '../utils/multer.js';


userRouter.post('/register',userController.registerUser)
            .post('/verifyLogin',userController.verifyLogin)
            .post('/profileEdit',userController.profileEdit)
            .post('/addImage',upload.single('file'),userController.addImage)
            

export default userRouter;