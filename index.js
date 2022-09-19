const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
const UserSchema = require('./Schemas/userSchema')
let db = mongoose.connection
const User = mongoose.model('User', UserSchema)

mongoose.connect('mongodb+srv://gepeto:Alimento@cluster0.kg0uz.mongodb.net/financeiro?retryWrites=true&w=majority')


app.use(express.json())
app.use(cors())

app.post('/', async (req, res) => {

    const email = req.body.email
    const psswd = req.body.psswd


    const selectedUser = await User.findOne({ email: email })

    if (selectedUser) {

        if (selectedUser._id === undefined) {
            res.send('não encontrado')
        } else {
            res.json({ id: selectedUser._id })
        }
    } else {
        res.send(null)
    }

})

app.post('/home', async (req, res) => {

    const id = req.body.id

    const selectedUser = await User.findOne({ _id: id })

    if (selectedUser) {
        res.json({ name: selectedUser.name, id: selectedUser._id, email: selectedUser.email, movements: selectedUser.movements })
    } else {
        res.send(null)
    }


})

app.post('/add', async (req, res) => {
    const date = req.body.date
    const classe = req.body.classe
    const entrada = req.body.entrada
    const saida = req.body.saida
    const id = Math.random()
    const currentUserId = req.body.currId

    const selectedUser = await User.findOne({ _id: currentUserId })

    db.collection("users").updateOne({
        email: selectedUser.email
    },
        {
            $push: {
                movements: { classe: classe, entrada: entrada, saida: saida, date: date, id: id }
            }
        }

    )

    res.json({ data: date, classe: classe, entrada: entrada, saida: saida, currentUserId: currentUserId })


})

app.post('/delete', async (req, res) => {
    const id = req.body.id

    db.collection("users").updateOne({
        email: 'teste@gabriel.com'
    },
        {
            $pull: {
                movements: { id: id }
            }
        }

    )

    res.json({ msg: 'yes' })


})





db.on('error', () => { console.log('Houve um erro') })
db.once('open', () => { console.log('DataBase loaded') })
app.listen(3001, res => {
    console.log('funcionando')
})