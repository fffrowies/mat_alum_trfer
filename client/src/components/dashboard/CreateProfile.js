import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/InputGroup";
import { createProfile } from "../../actions/profileActions";

class CreateProfile extends Component {
  state = {
    location: "",
    celphone: "",
    facebook: "",
    twitter: "",
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

    const profileData = {
      location: this.state.location,
      celphone: this.state.celphone,
      facebook: this.state.facebook,
      twitter: this.state.twitter
    };

    this.props.createProfile(profileData, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Cree Su Perfil</h1>
              <p className="lead text-center">
                Información personal para el perfil
              </p>
              <small className="d-block pb-3">* = campos obligatorios</small>
              <form onSubmit={this.handleOnSubmit}>
                <TextFieldGroup
                  placeholder="Localidad"
                  name="location"
                  value={this.state.location}
                  onChange={this.handleOnChange}
                  error={errors.location}
                  info="Localidad donde reside (ej. Lomas de Zamora)"
                />
                <TextFieldGroup
                  placeholder="* Teléfono Celular"
                  name="celphone"
                  value={this.state.celphone}
                  onChange={this.handleOnChange}
                  error={errors.celphone}
                  info="Teléfono celular de contacto (ej. 1152559876)"
                />
                <InputGroup
                  placeholder="Enalce a Perfil de Facebook"
                  name="facebook"
                  icon="fab fa-facebook"
                  value={this.state.facebook}
                  onChange={this.handleOnChange}
                  error={errors.facebook}
                />
                <InputGroup
                  placeholder="Enalce a Perfil de Twitter"
                  name="twitter"
                  icon="fab fa-twitter"
                  value={this.state.twitter}
                  onChange={this.handleOnChange}
                  error={errors.twitter}
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile }
)(withRouter(CreateProfile));
