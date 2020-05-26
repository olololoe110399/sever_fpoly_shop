const express = require ('express');
const fileUpload = require ('express-fileupload');
const path = require ('path');
const bodyParser = require ('body-parser');
const exphbs = require ('express-handlebars');
const mongose = require ('mongoose');
const flash = require ('connect-flash');
const session = require ('express-session');
const PORT = process.env.PORT || 5000;
const passport = require ('passport');

const app = express ();

//configure Passport
require ('./config/passport') (passport);

// configure Mongodb
const db = require ('./config/keys').mongoURI;

//connect to Mongo
mongose
  .connect (db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then (() => {
    console.log ('MongoDB Connected... ');
  })
  .catch (err => console.log (err));

// configure fileupload
app.use (fileUpload ());

// configure body-parser
app.use (bodyParser.json ({limit: '50mb'}));// parse form data client
app.use (bodyParser.urlencoded ({limit: '50mb', extended: true}));


//express sesstion
app.use (
  session ({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

//Passport midleware
app.use (passport.initialize ());
app.use (passport.session ());

//connect flash
app.use (flash ());

// Golbal Vars
app.use ((req, res, next) => {
  res.locals.success_msg = req.flash ('success_msg');
  res.locals.error_msg = req.flash ('error_msg');
  res.locals.error = req.flash ('error');
  next ();
});

// configure path static
const rootDir = path.dirname (process.mainModule.filename);
app.use (express.static (path.join (rootDir, 'public')));

// configure handlebar
app.engine ('.hbs', exphbs ());
app.set ('view engine', '.hbs');

// Routes
app.use ('/', require ('./routes/index.js'));
app.use ('/admin', require ('./routes/admins.js'));
app.use ('/api', require ('./routes/API.js'));

app.listen (PORT, console.log (`Server started on port ${PORT}`));
var hbs = require ('handlebars');
//helper
hbs.registerHelper ('isSelected_genre', function (select, id) {
  return select === id ? 'selected' : '';
});
hbs.registerHelper ('isSelected_prodution', function (select, id) {
  return select === id ? 'selected' : '';
});
hbs.registerHelper ('isSelected_category', function (select, options) {
  return options
    .fn (this)
    .replace (new RegExp (' value="' + select + '"'), '$& selected="selected"');
});

