const sequelize = require("../models");

exports.create = async (req, res) => {
    const userId = req.auth.id;
    const data = await sequelize.models.type.create({
        ...req.body,
        userId
    });
    res.json({
        code: 200,
        msg: "New successfully added!",
        data
    });
};
// update
exports.update = async (req, res) => {
    await sequelize.models.type.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    const data = await sequelize.models.type.findOne({
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
// delete
exports.destroy = async (req, res, next) => {
    await sequelize.models.type.destroy({
        where: {
            id: req.params.id
        }
    });
    res.json({
        code: 200,
        msg: "Delete successful!",
    });
};
// Query
exports.index = async (req, res) => {
    const userId = req.auth.id;
    const data = await sequelize.models.type.findAll({
        where: {
            userId
        },
    });
    res.json({
        code: 200,
        msg: "Query successful!",
        data
    });
};
// detail
exports.detail = async (req, res, next) => {
    const data = await sequelize.models.type.findOne({
        where: {
            id: req.params.id
        },
    });
    res.json({
        code: 200,
        msg: "Query successful!",
        data
    });
};