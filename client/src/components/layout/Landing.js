import React, { Component } from "react";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";
import { connect } from "react-redux";

class Landing extends Component {
  render() {
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Clases de Saxo en Zona Sur</h1>
                <p className="lead">
                  {" "}
                  Transferencia de material de estudio para alumnos de las
                  clases de saxo.
                </p>
                <hr />
                <Link to="/register" className="btn btn-lg btn-info mr-2">
                  Registro
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Ingreso
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
