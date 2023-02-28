const express=require('express')
const { getEmployeeData, createData, updateData } = require('../Controllers/EmployeeDetails')
const CheckAuth = require('../Middlewares/CheckAuth')
const router=express.Router()

router.use(express.json())

router.route('/getData').get(getEmployeeData)
router.route('/createData').post([CheckAuth,createData])
router.route('/updateData/:id').put(updateData)


module.exports=router
