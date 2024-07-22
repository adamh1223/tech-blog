const router = require("express").Router();
const { Comment, User, BlogPost } = require("../Models/index");

// GET all comments
router.get("/", async (req, res) => {
  try {
    const commentsData = await Comment.findAll({
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: BlogPost,
          attributes: ["title"],
        },
      ],
    });
    res.status(200).json(commentsData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// GET a single comment by id
router.get("/:id", async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ["name"],
        },
        {
          model: BlogPost,
          attributes: ["title"],
        },
      ],
    });

    if (!commentData) {
      res
        .status(404)
        .json({ message: `No comment found with id ${req.params.id}.` });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// CREATE a new comment
router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create({
      content: req.body.content,
      user_id: req.body.user_id,
      blogpost_id: req.body.blogpost_id,
    });

    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// UPDATE a comment by id
router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedComment[0] === 0) {
      res
        .status(404)
        .json({ message: `No comment found with id ${req.params.id}.` });
      return;
    }

    res.status(200).json({ message: "Comment updated successfully." });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// DELETE a comment by id
router.delete("/:id", async (req, res) => {
  try {
    const deletedComment = await Comment.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!deletedComment) {
      res
        .status(404)
        .json({ message: `No comment found with id ${req.params.id}.` });
      return;
    }

    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
