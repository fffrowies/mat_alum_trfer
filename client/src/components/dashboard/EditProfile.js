import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import InputGroup from "../common/InputGroup";
import { createProfile, getProfile } from "../../actions/profileActions";
import isEmpty from "../../validation/is-empty";

class EditProfile extends Component {
  state = {
    location: "",
    celphone: "",
    facebook: "",
    twitter: "",
    errors: {}
  };

  componentDidMount() {
    this.props.getProfile();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    // first profile is state, second profile object
    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      // Check profile field content to avoid null values
      profile.location = !isEmpty(profile.location) ? profile.location : "";
      profile.celphone = !isEmpty(profile.celphone) ? profile.celphone : "";

      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : "";
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : "";

      // Set component fields state
      this.setState({
        location: profile.location,
        celphone: profile.celphone,
        facebook: profile.facebook,
        twitter: profile.twitter
      });
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
              <h1 className="display-4 text-center">Modifique Su Perfil</h1>
              <p className="lead text-center">
                Información personal del perfil
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

EditProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
  getProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createProfile, getProfile }
)(withRouter(EditProfile));
