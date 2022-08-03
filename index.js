const express = require('express')
const mongoose = require('mongoose')
const authRouter = require('./authRouter')

const PORT = process.env.PORT || 14

const app = express()

app.use(express.json())
app.use('/auth', authRouter)

const start = async () => {
    try {
        await mongoose.connect('mongodb+srv://C20H25N3O:Lysergide@cluster0.vtpvo.mongodb.net/?retryWrites=true&w=majority')
        app.listen(PORT, () => console.log("Server has been started on port " + PORT))
    } catch (e) {
        console.log(e)
    }
}
start()