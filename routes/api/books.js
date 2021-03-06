const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const keys = require('../../config/keys');
const User = require('../../models/User');

// BOOKSHELF

router.get(
  '/:userId/bookshelf',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById({ _id: req.params.userId })
      .then((user) => res.json(user.books))
      .catch((error) => res.json(error));
  }
);

router.patch(
  '/:userId/bookshelf/addbook',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { books: req.body } },
      { new: true }
    )
      .then((user) => res.json(user.books))
      .catch((error) => res.json(error));
  }
);

// WISHLIST

router.get(
  '/:userId/wishlist',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findById({ _id: req.params.userId })
      .then((user) => res.json(user.wishlist))
      .catch((error) => res.json(error));
  }
);

router.patch(
  '/:userId/bookshelf/wishlist',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $push: { wishlist: req.body } },
      { new: true }
    )
      .then((user) => res.json(user.wishlist))
      .catch((error) => res.json(error));
  }
);

module.exports = router;
