import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
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
        dashboardContent = (
          <div>
            <div className="row">
              <div class="col-md-5">
                <div className="row">
                  <div className="card card-body bg-info text-white mb-4">
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
                          <p>{profile.location}</p>
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
                <div className="row">
                  <h4 className="display-5 mb-3">Enlaces de utilidad</h4>
                  <a
                    className="text-dark p-2"
                    href="http://www.saxopedia.com/transcriptions-sax/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe fa-1x" /> Saxopedia:
                    Transcripciones de Solos
                  </a>
                  <a
                    className="text-dark p-2"
                    href="http://www.saxpics.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe fa-1x" /> Saxpics: The Vintage
                    Saxophone Gallery
                  </a>
                  <a
                    className="text-dark p-2"
                    href="http://www.saxandwoodwind.com.au/images/Alto-sax-MP-comparison-char.gif"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe fa-1x" /> Vandoren: Alto Sax
                    Mouthpiece Comparisson Chart
                  </a>
                  <a
                    className="text-dark p-2"
                    href="https://jodyjazz.com/facing-page/tenor-saxophone-mouthpiece-facing-chart/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe fa-1x" /> JodyJazz: Tenor Sax
                    Mouthpiece Comparisson Chart
                  </a>
                  <a
                    className="text-dark p-2"
                    href="https://www.wfg.woodwind.org/sax/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="fas fa-globe fa-1x" /> Woodwind.org: Saxophone
                    Fingering Charts
                  </a>
                </div>
              </div>
              <div class="col-md-7">
                <div className="card card-body bg-light text-dark mb-4">
                  <h1 className="display-4">Material de las Clases</h1>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Reiciendis in veniam saepe eaque dignissimos voluptate id
                  rerum culpa, modi vero autem dolor deleniti minus aliquid!
                  Blanditiis debitis magni eligendi assumenda tempore dolorum
                  aliquid reprehenderit maxime beatae mollitia, repellat enim
                  porro optio, est ad distinctio molestias possimus facilis
                  temporibus expedita rem harum nisi? Quo iusto natus nihil nam.
                  Tenetur labore nihil sapiente nulla neque maxime dicta beatae,
                  ducimus, repellat esse quo? Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Saepe, mollitia temporibus quod,
                  cumque laborum quisquam dicta odit libero dolores voluptate
                  iure earum accusamus fuga assumenda aperiam deleniti dolorum
                  eius nobis beatae officiis soluta perspiciatis veniam? Aliquam
                  sit beatae quibusdam eveniet similique repudiandae dignissimos
                  cum explicabo? Autem, voluptatum eius! Recusandae commodi aut
                  dolorem voluptas numquam, tempore pariatur voluptatem
                  necessitatibus dolore voluptatibus alias voluptatum nobis,
                  molestias quam autem repellendus nemo? Praesentium illo ipsa
                  ratione ducimus, omnis dignissimos laboriosam culpa tenetur
                  consequuntur deserunt?
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
