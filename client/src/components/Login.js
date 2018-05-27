import React, { Component } from "react";
import Paper from "./Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import { firebase, usersRef } from "../firebase.config";
import { withRouter, Link } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators, compose } from "redux";
import { login } from "../actions/authActions";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      users: []
    };
  }

  handleChangeInputValue = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  setUser = data => {
    const USERS = Object.values(data);
    const IDS = Object.keys(data);

    let USER = [];

    for (let i = 0; i < IDS.length; i++) {
      USER.push({
        id: IDS[i],
        email: USERS[i].email,
        pseudo: USERS[i].pseudo,
        connected: USERS[i].connected
      });
    }

    return USER;
  };

  componentDidMount() {
    usersRef.on("value", snapshot => {
      this.setState({
        ...this.state.users,
        users: this.setUser(snapshot.val())
      });
    });
  }

  componentWillUnmount() {
    usersRef.off();
  }

  login = () => {
    const [currentUser] = this.state.users.filter(
      user => user.email === this.state.email
    );
    const credential = {
      ...currentUser,
      connected: true,
      password: this.state.password
    };
    this.props
      .login({ credential })
      .then(response => this.props.history.push("/"));
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
              label="Mot de passe"
              margin="dense"
              onChange={this.handleChangeInputValue("password")}
            />
            <Grid container justify="flex-end" alignItems="center">
              <Grid item>
                <Button variant="raised" onClick={this.login}>
                  Connexion
                </Button>
              </Grid>
              <Grid item>
                <Button variant="raised" component={Link} to="/signup">
                  Inscription
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      login
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Login));
