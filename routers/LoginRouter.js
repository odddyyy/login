const router = require(`express`).Router()
const LoginController = require(`../controllers/LoginController`)

router.get(`/`, LoginController.logForm)
router.post(`/`, LoginController.doLogin)

module.exports = router