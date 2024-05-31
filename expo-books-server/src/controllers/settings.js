const sequelize = require("../models");

exports.create = async (req, res) => {
    const userId = req.auth.id;
    let item = await sequelize.models.settings.findOne({
        where: {
            userId
        }
    })
    if (!item) {
        const data = await sequelize.models.settings.create({
            ...req.body,
            userId,
        });
        res.json({
            code: 200,
            msg: "Update successful!",
            data
        });
    } else {
        await sequelize.models.settings.update(req.body, {
            where: {
                userId
            }
        });
        res.json({
            code: 200,
            msg: "Update successful!",
        });
    }
};
// Query
exports.index = async (req, res) => {
    const userId = req.auth.id;
    const data = await sequelize.models.settings.findAll({
        where: {
            userId,
        },
    });
    res.json({
        code: 200,
        msg: "Query successful!",
        data
    });
};