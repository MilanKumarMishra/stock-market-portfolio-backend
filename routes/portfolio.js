const express = require('express');
const router = express.Router();
const { getPortfolio, addStock, removeStock } = require('../controllers/portfolioController');
const auth = require('../middleware/auth');

router.get('/', auth, getPortfolio);
router.post('/add', auth, addStock);
router.delete('/remove/:symbol', auth, removeStock);

module.exports = router;