const path = require("path");
const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const controllers = require('./controllers/')

const app = express();
const PORT = process.env.PORT || 3001;

const sequelize = require("./config/connection.js");
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: "Super secret secret",
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));


app.listen(PORT, () => {
  console.log(`App listening on port http://${PORT}!`);
  sequelize.sync({ force: false });
});