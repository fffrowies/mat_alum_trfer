const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateHomeworkInput(data) {
  let errors = {};

  data.decription = !isEmpty(data.decription) ? data.decription : "";
  data.filepath = !isEmpty(data.filepath) ? data.filepath : "";

  if (Validator.isEmpty(data.description)) {
    errors.description = "El campo Descripción es obligatorio";
  }

  if (Validator.isEmpty(data.filepath)) {
    errors.filepath = "El campo Archivo es obligatorio";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
