const roleSchema = require('./models/roleSchema')
const userSchema = require('./models/userSchema')
const bcrypt = require('bcryptjs')
const mongoose = require('mongoose')

const HASH_SALT = 5

class authController {

    async postRegistration(req, res){
        console.log('post request registration ' + req.query.id)
        try{
            const candidate = await userSchema.findOne({usr: req.query.usr})
            if(candidate) {
                return res.status(400).json('Account have being')
            }
            await bcrypt.genSalt(HASH_SALT, async function(err, salt) {
                await bcrypt.hash(req.query.pwd, salt, async function(err, pwdHash) {
                    const simpleRole = await roleSchema.findOne({value: "User"})
                    const newUser = new userSchema({usr: req.query.usr, pwd: pwdHash, roles: [simpleRole.value]})
                    await newUser.save()
                    res.status(400).json({message: "Account was maded"})
                });
            });

        }catch (e) {
            console.log('some error with authController')
            console.log(e)
            res.status(500).json('Server error')
        }
    }

    async postLogin(req, res){
        console.log('post request login ' + req.query.id)
    }

    async getUsers(req, res){
        try {
            console.log('get request get users ' + req.query.id)
            res.json(req.query.id)

        } catch (e) {
            console.log(e)
        }
    }

    async getFirstInit(req, res){
        const userRole = await roleSchema.findOne({value: 'User'})
        const adminRole = await roleSchema.findOne({value: 'Admin'})
        if(!userRole && !adminRole) {
            const userRole = new roleSchema()
            const adminRole = new roleSchema({value: 'Admin'})
            await userRole.save()
            await adminRole.save()
            res.status(200).json('Default roles got create')
        } else{
            res.status(200).json('Roles has been created!')
        }
    }

}

module.exports = new authController()