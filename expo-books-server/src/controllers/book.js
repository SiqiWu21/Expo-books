const sequelize = require("../models");
const {
    Op
} = require('sequelize');

exports.create = async (req, res) => {
    const userId = req.auth.id;
    const data = await sequelize.models.book.create({
        ...req.body,
        userId,
        status: 'Unread'
    });
    res.json({
        code: 200,
        msg: "New successfully added!",
        data
    });
};
// update
exports.update = async (req, res) => {
    await sequelize.models.book.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    const data = await sequelize.models.book.findOne({
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
    await sequelize.models.book.destroy({
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
    const {
        typeIds
    } = req.query;
    let where = {};
    if (typeIds) {
        where.typeId = {
            [Op.in]: typeIds
        }
    }
    const userId = req.auth.id;
    const data = await sequelize.models.book.findAll({
        where: {
            userId,
            ...where
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
    const data = await sequelize.models.book.findOne({
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