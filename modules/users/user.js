const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();
const users = require("../../users");

// GET - All users
router.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "All users", data: users });
});

// GET - Single user
router.get("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "User does not exist", data: null });
  }
  res.status(200).json({ success: true, message: "User found", data: user });
});

// POST - Create user
router.post(
  "/",
  [
    body("email", "invalid email").isEmail(),
    body("name", "please provide the name").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);
    const { email, name } = req.body;

    if (!error.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.array(),
      });
    }

    const user = users.find((u) => u.email === email);
    if (user) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please login",
        data: null,
      });
    }

    // This works fine since users array already has data
    const newId = users[users.length - 1].id + 1;
    users.push({ id: newId, name, email });

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: users,
    });
  },
);

// PUT - Complete user update
router.put(
  "/:id",
  [
    body("email", "invalid email").isEmail(),
    body("name", "please provide the name").notEmpty(),
  ],
  (req, res) => {
    const error = validationResult(req);
    const { email, name } = req.body;

    if (!error.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: "Validation error",
        error: error.array(),
      });
    }

    const id = parseInt(req.params.id);
    const index = users.findIndex((u) => u.id === id);

    if (index === -1) {
      return res
        .status(404)
        .json({ success: false, message: "User not found", data: null });
    }

    users[index] = { id, name, email };
    res.json({
      success: true,
      message: "User updated successfully",
      data: users,
    });
  },
);

// PATCH - Partial user update
router.patch("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: "User not found", data: null });
  }

  users[index] = { ...users[index], ...req.body };
  res.json({
    success: true,
    message: "User updated successfully",
    data: users,
  });
});

// DELETE - Remove user
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = users.findIndex((user) => user.id === id);

  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: "User not found", data: null });
  }

  users.splice(index, 1);
  res.json({
    success: true,
    message: "User deleted successfully",
    data: users,
  });
});

module.exports = router;
