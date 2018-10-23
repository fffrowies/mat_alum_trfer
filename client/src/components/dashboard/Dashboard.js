import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { getProfile, deleteAccount } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

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
            <p className="lead text-muted">Bienvenido {user.name}</p>
            <div className="btn-group mb-4" role="group">
              <Link to="/edit-profile" className="btn btn-light">
                <i className="fas fa-user-circle text-info mr-1" />
                Editar Perfil
              </Link>
            </div>
            <div style={{ marginBottom: "60px" }} />
            <button
              onClick={this.handleDeleteOnClick}
              className="btn btn-danger"
            >
              Eliminar Cuenta
            </button>
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
            <div className="col-md-12">
              <h1 className="display-4">Material de las Clases</h1>
              {dashboardContent}
            </div>
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
