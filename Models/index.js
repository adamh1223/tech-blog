//Start here, build models for the challenge, then controllers - post, get, put, etc.
//Views will become easier because the models and the logic to get and make data will exist

const User = require("./User");
const BlogPost = require("./BlogPost");
const Comment = require("./Comment");

BlogPost.belongsTo(User, {
  foreignKey: "id",
  onDelete: "cascade",
});

BlogPost.hasMany(Comment, {
  foreignKey: "id",
  onDelete: "cascade",
});

Comment.belongsTo(User, {
  foreignKey: "id",
  onDelete: "cascade",
});

module.exports = { BlogPost, User, Comment };
