const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";

  if (!Validator.isEmail(data.email)) {
    errors.email = "Ingrese un Email válido";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "El campo Email es obligatorio";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "El campo Clave es obligatorio";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

// devolver solo error y chequear si isEmpty en users.js
// cuando recibe el argumento
// hacer arrow function y exportar al final
