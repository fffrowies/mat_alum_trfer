import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Moment from "react-moment";
import { getProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";
import isEmpty from "../../validation/is-empty";

class Dashboard extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  handleDeleteOnClick = () => {
    this.props.deleteAccount();
  };

  render() {
    const { user } = this.props.auth;
    const { profile, loading } = this.props.profile;

    let dashboardContent;

    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check if loged in user has profile data
      if (Object.keys(profile).length > 0) {
        const homework = profile.homework.map(item => (
          <tr key={item._id}>
            <td>
              <a
                className="text-dark p-2"
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fas fa-globe fa-1x" /> {item.description}
              </a>
            </td>

            <td>
              <Moment format="DD/MM/YYYY">{item.date}</Moment>
            </td>
          </tr>
        ));

        dashboardContent = (
          <div>
            <div className="row">
              <div className="col-md-4">
                <div className="row">
                  <div className="card card-body bg-secondary text-white mb-4">
                    <div className="row">
                      <div className="col-4 col-md-3 m-auto">
                        <img
                          className="rounded-circle"
                          src={profile.user.avatar}
                          alt=""
                        />
                      </div>
                    </div>
                    <div className="text-center">
                      <h1 className="display-6 text-center">
                        {profile.user.name}
                      </h1>
                      {profile.celphone}
                      <p className="lead text-center">
                        {isEmpty(profile.location) ? null : (
                          <span>{profile.location}</span>
                        )}
                      </p>
                      <p className="mb-3">
                        {isEmpty(
                          profile.social && profile.social.facebook
                        ) ? null : (
                          <a
                            className="text-white p-2"
                            href={profile.social.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-facebook fa-2x" />
                          </a>
                        )}
                        {isEmpty(
                          profile.social && profile.social.twitter
                        ) ? null : (
                          <a
                            className="text-white p-2"
                            href={profile.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <i className="fab fa-twitter fa-2x" />
                          </a>
                        )}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="row mb-5">
                  <div>
                    <section className="row">
                      <div className="col-md-3 m-left">
                        <div className="btn-group mt-2" role="group">
                          <button
                            onClick={this.handleDeleteOnClick}
                            className="btn btn-danger"
                          >
                            Eliminar Cuenta
                          </button>
                          <Link to="/edit-profile" className="btn btn-light">
                            <i className="fas fa-user-circle text-info mr-1" />
                            Editar Perfil
                          </Link>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
              <div className="col-md-8">
                <div className="card card-body bg-light text-dark mb-4">
                  <h1 className="display-5 text-center">
                    Material de las Clases
                  </h1>
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Descripción / Enlace</th>
                        <th>Fecha</th>
                        <th />
                      </tr>
                    </thead>
                    {homework}
                  </table>
                </div>
              </div>
            </div>
          </div>
        );
      } else {
        // User is logged in but has no profile
        dashboardContent = (
          <div>
            <p className="lead text-muted">Bienvenido {user.name}</p>
            <p>No ha ingresado la información de su perfil</p>
            <Link to="/create-profile" className="btn btn-lg btn-info">
              Crear Perfil
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">{dashboardContent}</div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getProfile, deleteAccount }
)(Dashboard);
