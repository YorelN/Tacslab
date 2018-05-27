import React from "react";
import io from "socket.io-client";
import Appbar from "./components/Appbar";
import { Route, withRouter, Redirect, Switch } from "react-router-dom";
import Login from "./components/Login";
import Chat from "./components/Chat";
import Signup from "./components/Signup";
import Home from "./components/Home";
import styled, { injectGlobal } from "styled-components";
import Grid from "@material-ui/core/Grid";
import { firebase } from "./firebase.config";
import { connect } from "react-redux";
injectGlobal`
  a {
    text-decoration: none;
  }
  button:focus {outline:0;}

  a:hover {
    text-decoration: none;
    color: inherit;
    fill: inherit;
  }
`;

const Container = styled(Grid)`
  && {
    width: 100%;
    height: calc(100vh - 64px);
    overflow: auto;
    margin-top: 64px;
  }
`;

class App extends React.Component {
  render() {
    return (
      <div>
        <Appbar />
        <Container container spacing={0} alignItems="center" justify="center">
          <Route
            exact
            path="/chat"
            render={() =>
              this.props.auth.isLoggedIn ? <Chat /> : <Redirect to="/login" />
            }
          />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/" component={Home} />
            <Route exact path="/chat" component={Chat} />
          </Switch>
        </Container>
      </div>
    );
  }
}

function mapStateToProps({ auth }) {
  return {
    auth
  };
}

export default withRouter(connect(mapStateToProps)(App));
