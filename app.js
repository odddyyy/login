const express = require(`express`)
const app = express()
const port = 3000
const session = require(`express-session`)
const home = require(`./routers`)

//Setting middleware
app.set(`view engine`, `ejs`)
app.use(express.urlencoded({ extended : true }))
app.use(session({
    secret: `man robuka`,
    resave: false,
    saveUninitialized: true
}))

app.use(`/`, home)


//Port listening
app.listen(port, ()=> {console.log(`Listening on port: ${port}`)})