const express = require("express");
const router = express.Router();
const passport = require("passport");
const createWTClient = require("@wetransfer/js-sdk");
const fs = require("fs");

// Load validation
const validateProfileInput = require("../../validation/profile");

// Load Material model
const ProfileModel = require("../../models/Profile");

// Load User model
const User = require("../../models/User");

// @route   GET api/profile/test
// @desc    Test profile route
// @access  Public route
router.get("/test", (req, res) => res.json({ msg: "Profile Works" }));

// @route   GET api/profile
// @desc    Get user profile data
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const errors = {};

    ProfileModel.findOne({ user: req.user.id })
      .populate("user", ["name", "avatar"])
      .then(profile => {
        if (!profile) {
          errors.noprofile = "No hay perfil para este alumno";
          return res.status(404).json(errors);
        }
        res.json(profile);
      })
      .catch(err => res.status(404).json(err));
  }
);

// @route   POST api/profile
// @desc    Create or update profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const { errors, isValid } = validateProfileInput(req.body);

    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    // Get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if (req.body.location) profileFields.location = req.body.location;
    if (req.body.celphone) profileFields.celphone = req.body.celphone;
    // Social
    profileFields.social = {};
    if (req.body.facebook) profileFields.social.facebook = req.body.facebook;
    if (req.body.twitter) profileFields.social.twitter = req.body.twitter;

    ProfileModel.findOne({ user: req.user.id }).then(profile => {
      if (profile) {
        // Update
        ProfileModel.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        ).then(profile => res.json(profile));
      } else {
        // Create
        new ProfileModel(profileFields)
          .save()
          .then(profile => res.json(profile));
      }
    });
  }
);

// @route   POST api/profile/homework
// @desc    Add homework to profile
// @access  Private
router.post(
  // //////////
  // // Create a promise-based function to read files.
  // function readFile(path) {
  //   return new Promise((resolve, reject) => {
  //     fs.readFile(path, (error, data) => {
  //       if (error) {
  //         return reject(error);
  //       }

  //       resolve(data);
  //     });
  //   });
  // }

  // (async function() {
  //   // This is variable, and will depend on your application.
  //   const filePaths = ["pru1.jpg", "pru2.jpg", "pru3.jpg"];

  //   // Read the content of the files, in parallel
  //   const fileContents = await Promise.all(filePaths.map(readFile));

  //   // Create the files array with names, sizes and content.
  //   const files = filePaths.map((file, index) => {
  //     const content = fileContents[index];
  //     return {
  //       name: file.split("/").pop(),
  //       size: content.length,
  //       content: content
  //     };
  //   });

  //   const wtClient = await createWTClient(
  //     "vAhXILcud48BjlLkHLFjq8FaSy6cfDvl8M2UIQDv"
  //   );

  //   const transfer = await wtClient.transfer.create({
  //     message: "My very first transfer!",
  //     files: files
  //   });

  //   console.log(transfer.url); // https://we.tl/t-Sa7dYYlOdF
  // })();
  // //////////
  "/homework",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    ProfileModel.findOne({ user: req.user.id }).then(profile => {
      const newHomework = {
        link: req.body.link,
        description: req.body.description
      };

      // Add to homework array
      profile.homework.unshift(newHomework);

      profile.save().then(profile => res.json(profile));
    });
  }
);

// @route   DELETE api/profile
// @desc    Delete user and profile
// @access  Private
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Profile.findOneAndRemove({ user: req.user.id }).then(() => {
      User.findOneAndRemove({ _id: req.user.id }).then(() =>
        res.json({ success: true })
      );
    });
  }
);

module.exports = router;
