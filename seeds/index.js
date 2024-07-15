// Import the JSON seed data files
const blogPostSeeds = require("./blogPostSeeds.json");
const commentSeeds = require("./commentSeeds.json");
const userSeeds = require("./userSeeds.json");

const sequelize = require("../config/connection");
const { BlogPost, Comment, User } = require("../Models/index");

// Seed function
const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  // Seed users
  await User.bulkCreate(userSeeds);

  // Seed blog posts
  const blogPosts = await BlogPost.bulkCreate(blogPostSeeds);

  // Seed comments
  const commentData = commentSeeds.map((comment) => ({
    ...comment,
    blog_post_id: blogPosts[Math.floor(Math.random() * blogPosts.length)].id,
  }));
  await Comment.bulkCreate(commentData);

  console.log("Database seeded successfully!");

  process.exit(0);
};

seedDatabase();
