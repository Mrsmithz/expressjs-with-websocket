const logger = require('morgan')
const express = require('express')
const app = express()

app.use(express.json())
app.use(logger('dev'))



const PORT = process.env.PORT || 8889
const server = app.listen(PORT, () => {
    console.log('server started')
})

const socket = require('socket.io')(server)

const event = socket.of('/msg')

event.on('connection', client => {
    client.on('sent-msg', async data => {
        let result = `we recieved : ${data.message}`
        event.emit(data.uuid, result)

    })
    client.on('disconnect', data => {
        console.log('disconnect')
    })
})