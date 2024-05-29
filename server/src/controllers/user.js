const bcrypt = require('bcrypt');
const saltRounds = 10;
const sequelize = require("../models");
const {
    secret
} = require('../config');
const jwt = require('jsonwebtoken');

function randomNum(minNum, maxNum) {
    switch (arguments.length) {
        case 1:
            return parseInt(Math.random() * minNum + 1, 10);
            break;
        case 2:
            return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
            break;
        default:
            return 0;
            break;
    }
}
// login
exports.login = async (req, res) => {
    const {
        username,
        pwd,
    } = req.body;

    const user = await sequelize.models.user.findOne({
        where: {
            username
        },
        raw: true
    });
    if (!user) {
        res.json({
            code: -1,
            msg: "A non-existent username!",
        });
        return;
    }
    bcrypt.compare(pwd, user.pwd, async (err, result) => {
        if (result == true) {
            let token = jwt.sign(user, secret, {
                expiresIn: '1d'
            })
            user.token = token;
            res.json({
                code: 200,
                msg: "Login successful!",
                data: user
            });
        } else {
            res.json({
                code: -1,
                msg: "Password error!",
            });
        }
    });


};
// register
exports.register = async (req, res) => {
    const {
        nickname,
        username,
        pwd
    } = req.body;
    const user = await sequelize.models.user.findOne({
        where: {
            username
        }
    });
    if (user) {
        res.json({
            code: -1,
            msg: "Existing account!",
        });
        return;
    }
    let headpic = `/pic${randomNum(1, 10)}.png`;
    bcrypt.hash(pwd, saltRounds, async (err, hashPassword) => {
        const data = await sequelize.models.user.create({
            headpic,
            nickname,
            username,
            pwd: hashPassword
        });
        res.json({
            code: 200,
            msg: "registered successfully",
            data
        });
    });
};

// update
exports.update = async (req, res) => {
    await sequelize.models.user.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    const data = await sequelize.models.user.findOne({
        where: {
            id: req.params.id
        }
    });
    res.json({
        code: 200,
        msg: "Update successful!",
        data
    });
};