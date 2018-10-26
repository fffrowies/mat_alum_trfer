const express = require("express");
const router = express.Router();
const createWTClient = require("@wetransfer/js-sdk");
const fs = require("fs");

// Load validation
const validateHomeworkInput = require("../../validation/homework");

// Load Profile model
const ProfileModel = require("../../models/Profile");

// Load User model
const User = require("../../models/User");

// @route   GET api/homework/test
// @desc    Test homework route
// @access  Public route
router.get("/test", (req, res) => res.json({ msg: "Homework Works" }));

// @route   POST api/homework/users
// @desc    List users to populate SelectListGroup
// @access  Admin
router.get("/users", (req, res) => {
  User.find()
    .then(users => {
      res.json(users);
    })
    .catch(err => res.status(404).json({ profile: "There are no users" }));
});

// @route   POST api/homework
// @desc    Add homework to profile
// @access  Admin
router.post("/", (req, res) => {
  const { errors, isValid } = validateHomeworkInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  // Get fields (no lo estoy usando)
  // const homeworkFields = {};
  // if (req.body.archivo) homeworkFields.archivo = req.body.archivo;
  // if (req.body.description) homeworkFields.description = req.body.description;

  ProfileModel.findOne({ user: req.body.user_id }).then(profile => {
    if (!profile) {
      errors.noprofile = "No existe perfil para este usuario";
      res.status(404).json(errors);
    } else {
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
        const filePaths = [req.body.filepath];
        // const filePaths = [
        //   "./prueba/one.jpg",
        //   "./prueba/two.jpg",
        //   "./prueba/three.png"
        // ];

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

module.exports = router;
