const router = require("express").Router();
const { BlogPost, User, Comment } = require("../Models");

router.get("/", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findAll({
      include: [{ model: User, attributes: ["name"] }, { model: Comment }],
    });
    res.status(200).json(blogPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blogPostData = await BlogPost.findByPk(req.params.id, {
      include: [{ model: User, attributes: ["name"] }, { model: Comment }],
    });

    if (!blogPostData) {
      res.status(404).json({ message: "Blog post not found" });
      return;
    }

    res.status(200).json(blogPostData);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post("/", async (req, res) => {
  try {
    console.log("user_id:", req.session.user_id);
    const newBlogPost = await BlogPost.create({
      title: req.body.title,
      content: req.body.content,
      user_id: req.session.user_id,
    });
    res.status(200).json(newBlogPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedBlogPost = await BlogPost.update(req.body, {
      where: { id: req.params.id },
    });
    res.status(200).json(updatedBlogPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedBlogPost = await BlogPost.destroy({
      where: { id: req.params.id },
    });
    res.status(200).json(deletedBlogPost);
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
