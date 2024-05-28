const sequelize = require("../models");
const Sequelize = require("sequelize");
const {
    Op
} = require("sequelize");

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
    const user = await sequelize.models.user.findOne({
        where: req.body
    });
    if (!user) {
        res.json({
            code: -1,
            msg: "Account or password error",
        });
        return;
    }
    res.json({
        code: 200,
        msg: "Login successful!",
        data: user
    });
};
// register
exports.register = async (req, res) => {
    try {
        const {
            username
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
        const data = await sequelize.models.user.create({
            headpic,
            ...req.body
        });
        res.json({
            code: 200,
            msg: "registered successfully",
            data
        });
    } catch (error) {
        console.log("error = ", error)
    }

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