const moment = require("moment");

// Helper to format dates
const formatDate = (date) => {
  return moment(date).format("MMMM Do, YYYY");
};

// Authentication helper
const withAuth = (req, res, next) => {
  if (!req.session.logged_in) {
    res.redirect("/login");
  } else {
    next();
  }
};

module.exports = {
  formatDate,
  withAuth,
};
