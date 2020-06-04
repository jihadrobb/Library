const express = require('express');
const app = express();
const router = require('./routes');
const PORT = process.env.PORT || 3000;
const session = require('express-session');

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended: false}));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
  }))

app.use('/', router);

app.listen(PORT, () => {
    console.log('App listening on port ' + PORT);
})