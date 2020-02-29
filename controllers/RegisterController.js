const { User } = require(`../models`)

class RegisterController {

    static registerForm (req, res) {
        res.render(`register`)
    }

    static register (req, res) {
        let register = {
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            address : req.body.address,
            email : req.body.email,
            username : req.body.username,
            password : req.body.password
        }

        User.create(register)
        .then(data => {
            res.redirect(`/login`)
        })
        .catch(err => {
            res.send(err.errors)
        })
    }
}

module.exports = RegisterController