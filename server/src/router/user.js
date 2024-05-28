const express = require('express');
const router = express.Router();
const path = require('path');
let fileName = path.basename(__filename, '.js');
const controller = require(`../controllers/${fileName}`);

router.put('/:id', controller.update)
router.post('/login', controller.login);
router.post('/register', controller.register);

module.exports = router;
