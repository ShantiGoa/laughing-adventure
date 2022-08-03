const {Schema, model} = require('mongoose')

const user = new Schema({
    usr: {type: String, unique: true, required: true},
    pwd: {type: String, required: true},
    roles: [{type: String, ref: 'roleSchema'}]
})
module.exports = model('userSchema', user)
