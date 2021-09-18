const logger = require('morgan')
const express = require('express')
const app = express()
const uuid = require('uuid')
app.use(express.json())
app.use(logger('dev'))


const SocketIO = require('socket.io-client')

const socket = SocketIO('http://localhost:8889/msg')


app.get('/', (req, res) => {
    let genId = uuid.v4()
    let message = {
        message:req.body.message,
        uuid:genId
    }
    socket.emit('sent-msg', message)
    socket.on(genId, data => {
        console.log(data)
    })
    res.send('test')
})


const PORT = process.env.PORT || 8888
const server = app.listen(PORT, () => {
    console.log('server started')
})