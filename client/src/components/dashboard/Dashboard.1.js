import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Moment from "react-moment";
import { getProfile } from "../../actions/profileActions";
import Spinner from "../common/Spinner";

class Profile extends Component {
  componentDidMount() {
    this.props.getProfile();
  }

  render() {
    const { user } = this.props.auth;
    const { loading, profile } = this.props.profile;
    const materialEnvio = this.props.material.envio.map(mat => (
      <tr key={mat._id}>
        <td>{mat.description}</td>
        <td>{mat.link}</td>
        <td>
          <Moment format="DD/MM/YYYY">{mat.date}</Moment>
        </td>
      </tr>
    ));

    let materialContent;

    if (material === null || loading) {
      materialContent = <Spinner />;
    } else {
      // Check if loged in user has material data
      if (Object.keys(material).length > 0) {
        materialContent = (
          <div>
            <p className="lead text-muted">Bienvenido {user.name}</p>
            <div style={{ marginBottom: "50px" }} />
            <h4 className="mb-4 display-6">Material de las Clases</h4>
            <table className="table">
              <thead>
                <tr>
                  <th>Descripción</th>
                  <th>Enlace</th>
                  <th>Fecha</th>
                  <th />
                </tr>
              </thead>
              {materialEnvio}
            </table>
          </div>
        );
      } else {
        // User is logged in but has no material data
        materialContent = (
          <div>
            <p className="lead text-muted">Bienvenido {user.name}</p>
            <p>Aun no se ha preparado material</p>
          </div>
        );
      }
    }

    return <div>{materialContent}</div>;
  }
}

Material.propTypes = {
  getMaterial: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  material: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  material: state.material,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getMaterial }
)(Material);
