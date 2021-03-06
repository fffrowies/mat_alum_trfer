import React, { Component } from "react";
import PropTypes from "prop-types";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import TextFieldGroup from "../common/TextFieldGroup";

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
    password2: "",
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="register">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Registro</h1>
              <p className="lead text-center">
                Registre su cuenta en CSZS Material de Estudio
              </p>
              <form noValidate onSubmit={this.handleOnSubmit}>
                <TextFieldGroup
                  placeholder="Nombre y Apellido"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleOnChange}
                  error={errors.name}
                />
                <TextFieldGroup
                  placeholder="Correo Electrónico"
                  name="email"
                  type="email"
                  value={this.state.email}
                  onChange={this.handleOnChange}
                  error={errors.email}
                  info="Si usted desea una imagen de perfil registre su correo electrónico en Gravatar.com"
                />
                <TextFieldGroup
                  placeholder="Clave de Acceso"
                  name="password"
                  type="password"
                  value={this.state.password}
                  onChange={this.handleOnChange}
                  error={errors.password}
                />
                <TextFieldGroup
                  placeholder="Reingrese Clave de Acceso"
                  name="password2"
                  type="password"
                  value={this.state.password2}
                  onChange={this.handleOnChange}
                  error={errors.password2}
                />
                <input
                  type="submit"
                  value="Enviar"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
