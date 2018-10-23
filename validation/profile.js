const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateProfileInput(data) {
  let errors = {};

  data.location = !isEmpty(data.location) ? data.location : "";
  data.celphone = !isEmpty(data.celphone) ? data.celphone : "";

  if (Validator.isEmpty(data.celphone)) {
    errors.celphone = "El campo Teléfono Celular es obligatorio";
  }

  if (!isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Ingrese una dirección de Facebook válida";
    }
  }

  if (!isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Ingrese una dirección de Twitter válida";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
