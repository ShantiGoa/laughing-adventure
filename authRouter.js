const Router = require('express')
const authController = require('./authController')

const router = new Router()

router.post('/registration', authController.postRegistration)
router.post('/login', authController.postLogin)
router.get('/users', authController.getUsers)
router.get('/firstInit', authController.getFirstInit)

module.exports = router

