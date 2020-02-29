const router = require(`express`).Router()
const RegisterController = require(`../controllers/RegisterController`)

router.get(`/`, RegisterController.registerForm)
router.post(`/`, RegisterController.register)


module.exports = router