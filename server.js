const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path");

// Database connection
const sequelize = require("./config/connection");

// Initialize Express
const app = express();
const PORT = process.env.PORT || 3001;

// Session setup
const sess = {
  secret: process.env.SESSION_SECRET || "supersecretsecret",
  cookie: { maxAge: 3600000 }, // Session expires after 1 hour of inactivity
  resave: false,
  saveUninitialized: true,
};

app.use(session(sess));

// Handlebars middleware
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes"));

// Sync Sequelize models and start server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server started on http://localhost:${PORT}`)
  );
});
