const express = require("express");

const app = express();
const PORT = process.env.PORT || 3001;
const sequelize = require("./config/connection");
const routes = require("./Controller/index");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(routes);

// sync sequelize models to the database, then turn on the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log(`App listening on port http://localhost:${PORT}!`);
  });
});
