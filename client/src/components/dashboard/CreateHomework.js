import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import TextFieldGroup from "../common/TextFieldGroup";
import SelectListGroup from "../common/SelectListGroup";
import {
  createHomework,
  getUsersHomework
} from "../../actions/homeworkActions";

class CreateHomework extends Component {
  state = {
    filepath: "",
    description: "",
    user_id: "",
    users: [
      { label: "David Bowie", value: "123123123" },
      { label: "Albert Sanborn", value: "567567567" },
      { label: "Stefan Gratberg", value: "4543454345" }
    ],
    errors: {}
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  componentWillMount() {
    this.props.getUsersHomework();
  }

  handleOnChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleOnSubmit = e => {
    e.preventDefault();

    const homeworkData = {
      description: this.state.description,
      filepath: this.state.filepath,
      user_id: this.state.user_id
    };

    this.props.createHomework(homeworkData, this.props.history);
  };

  render() {
    const { errors, users } = this.state;

    // Select options for users
    users.unshift({ label: "* ID de Usuario", value: 0 });
    console.log(users);

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">
                Material de la Clase de ...
              </h1>
              <p className="lead text-center">
                Preparación de material para creación de Link
              </p>
              <small className="d-block pb-3">* = campos obligatorios</small>
              <form onSubmit={this.handleOnSubmit}>
                <TextFieldGroup
                  placeholder="Descripción"
                  name="description"
                  value={this.state.description}
                  onChange={this.handleOnChange}
                  error={errors.description}
                  info="Descripción del material a enviar"
                />
                <TextFieldGroup
                  placeholder="* Archivo"
                  name="filepath"
                  value={this.state.filepath}
                  onChange={this.handleOnChange}
                  error={errors.filepath}
                  info="Ruta del archivo a enviar"
                />
                <SelectListGroup
                  placeholder="* ID de Usuario"
                  name="user_id"
                  value={this.state.user_id}
                  onChange={this.handleOnChange}
                  options={users}
                  error={errors.user_id}
                  info="Código Identificador de Usuario"
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

CreateHomework.propTypes = {
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.users,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { createHomework, getUsersHomework }
)(withRouter(CreateHomework));
