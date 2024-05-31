const express = require('express');
const router = express.Router();
const path = require('path');
let fileName = path.basename(__filename, '.js');
const controller = require(`../controllers/${fileName}`);

router.get('/', controller.index)
router.post('/', controller.create)
  
module.exports = router;
