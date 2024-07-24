import db from '../models/index.js';
import { validationResult } from 'express-validator';

const { sequelize, User } = db;

export const increaseBalance = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId } = req.body;

  try {
    const result = await sequelize.query(
      'SELECT adjust_balance(:userId, :delta) AS success',
      {
        replacements: { userId, delta: 2 },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!result[0].success) {
      return res.status(400).json({ error: 'Unable to increase balance' });
    }

    const user = await User.findByPk(userId);
    res.json(user);
  } catch (error) {
    console.error('Error increasing balance:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const getUserBalance = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ balance: user.balance });
  } catch (error) {
    console.error('Error getting user balance:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const decreaseBalance = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { userId } = req.body;

  try {
    const result = await sequelize.query(
      'SELECT adjust_balance(:userId, :delta) AS success',
      {
        replacements: { userId, delta: -2 },
        type: sequelize.QueryTypes.SELECT,
      }
    );

    if (!result[0].success) {
      return res.status(400).json({ error: 'Unable to decrease balance' });
    }

    const user = await User.findByPk(userId);
    res.json(user);
  } catch (error) {
    console.error('Error decreasing balance:', error.message);
    res.status(500).json({ error: 'Internal server error' });
  }
};