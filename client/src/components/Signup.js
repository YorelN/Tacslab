import React, { Component } from "react";
import Paper from "./Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { firebase, usersRef } from "../firebase.config";
import { withRouter } from "react-router-dom";
import { signup } from "../actions/authActions";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      pseudo: ""
    };
  }

  handleChangeInputValue = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  signup = () => {
    const credential = {
      email: this.state.email,
      password: this.state.password,
      pseudo: this.state.pseudo
    };
    this.props.signup({ credential }).then(() => this.props.history.push("/"));
    // this.props.history.push("/login");
  };

  render() {
    return (
      <Grid container spacing={16} justify="center" alignItems="center">
        <Grid item sm={4}>
          <Paper withSpacing elevation={2} title="Connexion">
            <TextField
              fullWidth
              label="Email"
              margin="dense"
              onChange={this.handleChangeInputValue("email")}
            />
            <TextField
              fullWidth
              label="Pseudo"
              margin="dense"
              onChange={this.handleChangeInputValue("pseudo")}
            />
            <TextField
              fullWidth
              label="Mot de passe"
              margin="dense"
              onChange={this.handleChangeInputValue("password")}
            />
            <Grid container justify="flex-end" alignItems="center">
              <Grid item>
                <Button variant="raised" onClick={this.signup}>
                  S'inscrire
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      signup
    },
    dispatch
  );
};

export default withRouter(connect(null, mapDispatchToProps)(Signup));
