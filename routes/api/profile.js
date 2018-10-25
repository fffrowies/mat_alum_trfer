const express = require("express");
const router = express.Router();
const passport = require("passport");
const createWTClient = require("@wetransfer/js-sdk");
const fs = require("fs");

// Load validation
const validateHomeworkInput = require("../../validation/homework");

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
router.post("/homework", (req, res) => {
  const { errors, isValid } = validateHomeworkInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Get fields
  const homeworkFields = {};
  if (req.body.archivo) homeworkFields.archivo = req.body.archivo;
  if (req.body.description) homeworkFields.description = req.body.description;

  ProfileModel.findOne({ user: req.body.user_id }).then(profile => {
    if (!profile) {
      errors.noprofile = "No existe perfil para este usuario";
      res.status(404).json(errors);
    } else {
      //////////
      // Create a promise-based function to read files.
      function readFile(path) {
        return new Promise((resolve, reject) => {
          fs.readFile(path, (error, data) => {
            if (error) {
              return reject(error);
            }

            resolve(data);
          });
        });
      }

      (async function() {
        // This is variable, and will depend on your application.
        const filePaths = [
          "./prueba/one.jpg",
          "./prueba/two.jpg",
          "./prueba/three.png"
        ];

        // Read the content of the files, in parallel
        const fileContents = await Promise.all(filePaths.map(readFile));

        // Create the files array with names, sizes and content.
        const files = filePaths.map((file, index) => {
          const content = fileContents[index];
          return {
            name: file.split("/").pop(),
            size: content.length,
            content: content
          };
        });

        const wtClient = await createWTClient(
          "vAhXILcud48BjlLkHLFjq8FaSy6cfDvl8M2UIQDv"
        );

        const transfer = await wtClient.transfer.create({
          message: req.body.description,
          files: files
        });

        console.log(transfer.url); // https://we.tl/t-Sa7dYYlOdF

        const newHomework = {
          link: transfer.url,
          description: req.body.description
        };

        // Add to homework array
        profile.homework.unshift(newHomework);

        profile.save().then(profile => res.json(profile));
      })();
    }
  });
});

// router.get("/user/:user_id", (req, res) => {
//   const errors = {};

//   Profile.findOne({ user: req.params.user_id })
//     .populate("user", ["name", "avatar"])
//     .then(profile => {
//       if (!profile) {
//         errors.noprofile = "There is no profile for this user";
//         res.status(404).json(errors);
//       }

//       res.json(profile);
//     })
//     .catch(err =>
//       res.status(404).json({ profile: "There is no profile for this user" })
//     );
// });

// // @route   DELETE api/profile/experience/:exp_id
// // @desc    Delete experience from profile
// // @access  Private
// router.delete(
//   "/experience/:exp_id",
//   passport.authenticate("jwt", { session: false }),
//   (req, res) => {
//     Profile.findOne({ user: req.user.id })
//       .then(profile => {
//         // Get remove index
//         const removeIndex = profile.experience
//           .map(item => item.id)
//           .indexOf(req.params.exp_id);

//         // Splice out of array
//         profile.experience.splice(removeIndex, 1);

//         // Save
//         profile.save().then(profile => res.json(profile));
//       })
//       .catch(err => res.status(404).json(err));
//   }
// );

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
