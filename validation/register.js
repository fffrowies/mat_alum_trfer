const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Ingrese un Nombre entre 2 y 30 caracteres";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "El campo Nombre es obligatorio";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Ingrese un Email válido";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "El campo Email es obligatorio";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Ingrese una Clave de al menos 6 caracteres";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "El campo Clave es obligatorio";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Los campos Clave deben coincidir";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "El campo Confirmación de Clave es obligatorio";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

// devolver solo error y chequear si isEmpty en users.js
// cuando recibe el argumento
// hacer arrow function y exportar al final
