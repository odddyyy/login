const { User } = require(`../models`)
const bcrypt = require('bcrypt')
const saltRounds = 10

class LoginController {

    static logForm (req, res) {
        res.render(`login`)
    }

    static doLogin (req, res) {
        let password = req.body.password
        let username = req.body.username
        let hash = null
        let userdata = null

        User.findOne({where:{username:username}})
        .then(data => {
            userdata = data
            hash = data.password
            return bcrypt.compare(password, hash)
        })
        .then(res => {
            if (res) {
                return User.findOne({where:{password:userdata.password}})
            } else {
                res.send(`invalid username / password`)
            }
        })
        .then(data => {
            req.session.user = {
                id: data.id,
                name: data.getFullName(),
                role: data.role
            }
            res.redirect(`/`)
        })
        .catch(err => {
            res.send(err)
        })
    }
}

module.exports = LoginController