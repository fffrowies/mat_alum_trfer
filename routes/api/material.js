const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

// Load Material model
const Material = require("../../models/Material");

// Load User model
const User = require("../../models/User");

// @route   GET api/material/test
// @desc    Test material route
// @access  Public route
router.get("/test", (req, res) => res.json({ msg: "Material Works" }));

// @route   GET api/material
// @desc    Get user material data
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    Material.find({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(material => {
        if (!material) {
          errors.nomaterial = "No hay material para este alumno";
          return res.status(404).json(errors);
        }
        res.json(material);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
