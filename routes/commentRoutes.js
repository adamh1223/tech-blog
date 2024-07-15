const router = require("express").Router();
const { Comment } = require("../../Models");

// Get all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.findAll();
    res.status(200).json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Get a comment by ID
router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findByPk(req.params.id);
    if (!comment) {
      res
        .status(404)
        .json({ message: `No comment found with ID: ${req.params.id}` });
      return;
    }
    res.status(200).json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

// Create a new comment
router.post("/", async (req, res) => {
  try {
    const newComment = await Comment.create(req.body);
    res.status(201).json(newComment);
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Update a comment by ID
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
        .json({ message: `No comment found with ID: ${req.params.id}` });
      return;
    }
    res.status(200).json({ message: "Comment updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(400).json(err);
  }
});

// Delete a comment by ID
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
        .json({ message: `No comment found with ID: ${req.params.id}` });
      return;
    }
    res.status(200).json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

module.exports = router;
