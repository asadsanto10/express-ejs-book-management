const express = require('express');
// const multer = require('multer');

// author modal
const path = require('path');
// const fs = require('fs');

const Booksmodal = require('../modals/books');
// book modal
const Authorsmodal = require('../modals/authors');

// const uploadPath = path.join('public', Booksmodal.coverImageBasePath);
const router = express.Router();

// file uploade
const imageMimeTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg'];
// const upload = multer({
//   dest: uploadPath,
//   fileFilter: (req, file, callback) => {
//     callback(null, imageMimeType.includes(file.mimetype));
//   },
// });

// all book get

// render new book and create book page functional
const renderNewPage = async (res, book, haserr = false) => {
  try {
    const authors = await Authorsmodal.find({});

    res.render('books/new', {
      authors,
      book,
      errorMessage: haserr ? 'Error creating book' : null,
    });
  } catch (error) {
    res.redirect('/books');
  }
};

// save cover image with base64
// eslint-disable-next-line no-shadow
function saveCover(book, coverEncoded) {
  if (coverEncoded == null) return;
  const cover = JSON.parse(coverEncoded);
  if (cover != null && imageMimeTypes.includes(cover.type)) {
    // eslint-disable-next-line no-param-reassign
    book.coverImage = new Buffer.from(cover.data, 'base64');
    // eslint-disable-next-line no-param-reassign
    book.coverImageType = cover.type;
  }
}

router.get('/', async (req, res) => {
  // seacrh books
  let bookQuery = Booksmodal.find({});
  if (req.query.title != null && req.query.title !== '') {
    bookQuery = bookQuery.regex('title', new RegExp(req.query.title, 'i'));
  }
  if (req.query.publishBefore != null && req.query.publishBefore !== '') {
    bookQuery = bookQuery.lte('publishDate', req.query.publishBefore);
  }
  if (req.query.publishAfter != null && req.query.publishAfter !== '') {
    bookQuery = bookQuery.gte('publishDate', req.query.publishAfter);
  }
  try {
    // show all books
    const books = await bookQuery.exec();
    res.render('books/index', {
      books,
      serachBook: req.query,
    });
  } catch (error) {
    res.redirect('/');
  }
});

// new book route
router.get('/new', async (req, res) => {
  renderNewPage(res, new Booksmodal());
});

// create new Book route
router.post('/', async (req, res) => {
  const { title, author, publishDate, pageCount, description } = req.body;

  const book = new Booksmodal({
    title,
    description,
    publishDate: new Date(publishDate),
    pageCount,
    author,
  });

  saveCover(book, req.body.coverImage);
  // console.log(book);
  // console.log(req.coverImage);

  try {
    const newBook = await book.save();
    // res.redirect(`books/${newBook.id}`);
    res.redirect('books');
  } catch (error) {
    console.log(error.message);
    renderNewPage(res, book, true);
  }
});

module.exports = router;
