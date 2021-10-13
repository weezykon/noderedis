const express = require('express');
const router = express.Router();

// controller
const homeCtrl = require('../controllers/home');


// routes
router.get('/', homeCtrl.home);

// export
module.exports = router;