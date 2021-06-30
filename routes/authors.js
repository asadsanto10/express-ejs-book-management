const express = require('express');
// author modal
const AuthorsModal = require('../modals/authors');

const router = express.Router();

// all author get
router.get('/', async (req, res) => {
  const search = {};
  if (req.query.name != null && req.query.name !== '') {
    search.name = new RegExp(req.query.name, 'i');
  }
  try {
    const authors = await AuthorsModal.find(search);
    res.render('authors/index', { authors, serach: req.query });
  } catch {
    res.render('/');
  }
});

// new author route
router.get('/new', (req, res) => {
  res.render('authors/new', { author: new AuthorsModal() });
});

// create new authore route
router.post('/', async (req, res) => {
  const author = new AuthorsModal({
    name: req.body.name,
  });
  try {
    const newAuthor = await author.save();
    // console.log(newAuthor);
    // res.redirect(`authors/${newAuthor.id}`);
    res.redirect(`authors`);
  } catch (err) {
    // console.log(err);
    // console.log(error);
    res.render('authors/new', {
      author,
      errorMessage: 'error creating author',
    });
  }
});

module.exports = router;
