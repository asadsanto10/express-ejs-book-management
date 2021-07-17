const express = require('express');
const expressLayout = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const indexRoute = require('./routes/index');
const authorsRoute = require('./routes/authors');
const booksRoute = require('./routes/books');
require('dotenv').config({ path: './.env' });
require('./db/connect');

const app = express();

// vire engins set
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.set('layout', 'layouts/layout');
app.use(expressLayout);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false, limit: '10mb' }));

// router
app.use('/', indexRoute);
app.use('/authors', authorsRoute);
app.use('/books', booksRoute);

app.listen(process.env.PORT || 5000, () => {
  console.log('listeing on port 5000');
});
