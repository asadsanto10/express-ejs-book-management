const express = require('express');

const router = express.Router();
const Booksmodal = require('../modals/books');

router.get('/', async (req, res) => {
  let books;
  try {
    books = await Booksmodal.find().sort({ createAt: 'desc' }).limit(10).exec();
  } catch (error) {
    books = [];
  }
  res.render('index', {
    books,
  });
});

module.exports = router;
