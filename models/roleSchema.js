const {Schema, model} = require('mongoose')

const roleSchema = new Schema({
    value: {type: String, required: true, unique: true, default: 'User'}
})
module.exports = model('roleSchema', roleSchema)