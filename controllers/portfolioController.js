const User = require('../models/User');

const getPortfolio = async (req, res) => {
  try {
    console.log('getPortfolio: req.user:', req.user); // Debug
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized: No user ID' });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user.portfolio || []);
  } catch (error) {
    console.error('Get portfolio error:', error.stack); // Full stack trace
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

const addStock = async (req, res) => {
  const { symbol, shares, purchasePrice } = req.body;

  if (!symbol || !shares || !purchasePrice) {
    return res.status(400).json({ error: 'All fields are required' });
  }

  try {
    console.log('addStock: req.user:', req.user, 'body:', req.body); // Debug
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized: No user ID' });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const newStock = { 
      symbol, 
      shares: Number(shares), 
      purchasePrice: Number(purchasePrice) 
    };
    user.portfolio = user.portfolio || [];
    user.portfolio.push(newStock);
    await user.save();
    res.json(user.portfolio);
  } catch (error) {
    console.error('Add stock error:', error.stack); // Full stack trace
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

const removeStock = async (req, res) => {
  const { symbol } = req.params;

  try {
    console.log('removeStock: req.user:', req.user, 'symbol:', symbol); // Debug
    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: 'Unauthorized: No user ID' });
    }
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    user.portfolio = user.portfolio.filter(stock => stock.symbol !== symbol);
    await user.save();
    res.json(user.portfolio);
  } catch (error) {
    console.error('Remove stock error:', error.stack); // Full stack trace
    res.status(500).json({ error: 'Server error', details: error.message });
  }
};

module.exports = { getPortfolio, addStock, removeStock };