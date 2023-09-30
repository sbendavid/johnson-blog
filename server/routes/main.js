const express = require("express");
const router = express.Router();

// Routes
router.get("", (req, res) => {
    res.render("index");
});

router.get("/chat", (req, res) => {
    res.render("chat");
});

router.get("/about", (req, res) => {
    res.render("about");
});

router.get("/post", (req, res) => {
    res.render("post");
});

module.exports = router;