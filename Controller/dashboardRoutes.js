const router = require("express").Router();
const { BlogPost } = require("../Models/index");

// Get all blog posts for the dashboard
router.get("/", async (req, res) => {
  try {
    const blogPosts = await BlogPost.findAll();
    res.status(200).json(blogPosts);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get a single blog post by ID for the dashboard
router.get("/:id", async (req, res) => {
  try {
    const blogPost = await BlogPost.findByPk(req.params.id);
    if (!blogPost) {
      res
        .status(404)
        .json({ message: `No blog post found with ID: ${req.params.id}` });
      return;
    }
    res.status(200).json(blogPost);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new blog post
router.post("/", async (req, res) => {
  try {
    const newBlogPost = await BlogPost.create(req.body);
    res.status(201).json(newBlogPost);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Update a blog post by ID
router.put("/:id", async (req, res) => {
  try {
    const updatedBlogPost = await BlogPost.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (updatedBlogPost[0] === 0) {
      res
        .status(404)
        .json({ message: `No blog post found with ID: ${req.params.id}` });
      return;
    }
    res.status(200).json({ message: "Blog post updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Delete a blog post by ID
router.delete("/:id", async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!deletedBlogPost) {
      res
        .status(404)
        .json({ message: `No blog post found with ID: ${req.params.id}` });
      return;
    }
    res.status(200).json({ message: "Blog post deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
