const sequelize = require("../models");
const {
    Op
} = require('sequelize');

exports.create = async (req, res) => {
    const userId = req.auth.id;
    const data = await sequelize.models.review.create({
        ...req.body,
        userId,
    });
    res.json({
        code: 200,
        msg: "New successfully added!",
        data
    });
};
// update
exports.update = async (req, res) => {
    await sequelize.models.review.update(req.body, {
        where: {
            id: req.params.id
        }
    });
    const data = await sequelize.models.review.findOne({
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
    await sequelize.models.review.destroy({
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
        bookId
    } = req.query;
    let where = {};
    if (bookId) {
        where.bookId = bookId;
    }
    const data = await sequelize.models.review.findAll({
        where: {
            ...where
        },
        include: [sequelize.models.user, sequelize.models.book],
        order: [['created_at', 'DESC']]
    });
    res.json({
        code: 200,
        msg: "Query successful!",
        data
    });
};
// detail
exports.detail = async (req, res, next) => {
    const data = await sequelize.models.review.findOne({
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