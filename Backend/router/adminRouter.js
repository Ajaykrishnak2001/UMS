import express from 'express'
const adminRouter = express.Router()
import * as adminController from '../controller/adminController.js'

adminRouter.post('/adminLogin',adminController.adminLogin)
            .get('/fetchData',adminController.fetchData)
            .post('/editUser',adminController.editUser)
            .post('/deleteUser',adminController.deleteUser)

export default adminRouter