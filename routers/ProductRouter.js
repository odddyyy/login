const router = require (`express`).Router()

router.use(`/`, (req, res) => {
    res.send(`product page`)
})

module.exports = router