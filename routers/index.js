const router = require(`express`).Router()
const login = require(`./LoginRouter`)
const register = require(`./RegisterRouter`)
const product = require (`../routers/ProductRouter`)



const isLogin = (req, res, next) => {
    if (req.session.user){
        next()
    } else {
        res.redirect(`/login`)
    }
}

router.get(`/`, (req, res) => { //root to homepage (no need login)
    res.render(`homepage`)
})


router.use(`/register`, register)

router.use(`/login`, login)

router.use(`/products`, isLogin, product) //must logged in to view product page




module.exports = router