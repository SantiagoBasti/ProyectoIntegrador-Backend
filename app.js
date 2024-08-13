const express = require("express")
const app = express();
const cors = require('cors')
const { rateLimit } = require('express-rate-limit')
const api_routes = require("./routes/index");

const limiter = rateLimit({
    windowMs:5 * 60 * 1000,
    limit: 15,
    message: {
        ok: false,
        message: 'Ha excedido el numero de peticiones'
    }
})


app.use(limiter)

app.use(express.static('public'));
app.use(cors())


app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", api_routes)

module.exports = app;