import React, { Fragment } from "react";
import MUIAppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import { Link, withRouter } from "react-router-dom";
import { firebase, usersRef } from "../firebase.config";
import { connect } from "react-redux";
import LogoutIcon from "@material-ui/icons/PowerSettingsNew";
import MessageIcon from "@material-ui/icons/Message";
import { bindActionCreators, compose } from "redux";
import { logout } from "../actions/authActions";
class Appbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: null,
      users: []
    };
  }

  // setUser = data => {
  //   const USERS = Object.values(data);
  //   const IDS = Object.keys(data);

  //   let USER = [];

  //   for (let i = 0; i < IDS.length; i++) {
  //     USER.push({
  //       id: IDS[i],
  //       email: USERS[i].email,
  //       pseudo: USERS[i].pseudo,
  //       connected: USERS[i].connected
  //     });
  //   }

  //   return USER;
  // };

  // componentDidMount() {
  //   firebase.auth().onAuthStateChanged(user => {
  //     if (user && !this.state.isLoggedIn) {
  //       this.setState({ isLoggedIn: user });
  //     }
  //   });
  //   usersRef.on("value", snapshot => {
  //     this.setState({
  //       ...this.state.users,
  //       users: this.setUser(snapshot.val())
  //     });
  //   });
  //   this.setState({
  //     isLoggedIn: firebase.auth().currentUser
  //   });
  // }

  logout = () => {
    const { infos } = this.props.auth;
    const credential = {
      ...infos,
      connected: false
    };

    this.props
      .logout({ credential })
      .then(() => this.props.history.push("/login"));
  };

  render() {
    const AuthButtonGroup = (
      <div>
        <Link to="/chat" style={{ color: "#FFF" }}>
          <IconButton color="inherit">
            <MessageIcon />
          </IconButton>
        </Link>
        <IconButton color="inherit" onClick={this.logout}>
          <LogoutIcon />
        </IconButton>
      </div>
    );
    return (
      <Fragment>
        <MUIAppBar
          position="sticky"
          style={{ zIndex: 420, boxShadow: "none", position: "fixed" }}
        >
          <Toolbar>
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography
              component={Link}
              to="/"
              variant="title"
              color="inherit"
              style={{ flex: 1 }}
            >
              Tacslab
            </Typography>

            {!this.props.auth.isLoggedIn ? (
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
            ) : (
              AuthButtonGroup
            )}
          </Toolbar>
        </MUIAppBar>
      </Fragment>
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
      logout
    },
    dispatch
  );
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Appbar));
