import React from "react";
import styled from "styled-components";
import ImageIcon from "@material-ui/icons/Image";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Avatar from "@material-ui/core/Avatar";
import Drawer from "@material-ui/core/Drawer";
import { Divider, TextField } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import io from "socket.io-client";
import { usersRef } from "../firebase.config";

const Container = styled(Grid)`
  && {
    width: 100vw;
    height: calc(100vh - 64px);

    overflow: auto;
    padding: 24px;
    padding-left: 264px;
    padding-bottom: 0;
  }
`;

const styles = theme => ({
  drawerPaper: {
    position: "absolute",
    top: 64,
    left: 0,
    width: 240,
    position: "fixed"
  }
});

const MessageInput = styled(TextField)`
  && {
    margin-left: -12px;
    margin-right: -12px;
    margin-top: 10px;
    margin-bottom: 10px;
    width: calc(100vw - 260px);
    position: fixed;
    bottom: 0;
  }
`;

const Divid = styled(Divider)`
  && {
    margin-left: -24px;
    width: calc(100vw - 240px);
    position: fixed;
    bottom: 65px;
  }
`;

class Chat extends React.Component {
  constructor(props) {
    super(props);
    // this.socket = io("localhost:8080");
    this.state = {
      users: null
    };
  }

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

  render() {
    const { classes } = this.props;
    return (
      <div>
        <Drawer
          variant="permanent"
          anchor={"left"}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <List>
            {this.state.users &&
              this.state.users.map(user => (
                <div key={user.email}>
                  <ListItem button>
                    <Avatar>
                      <ImageIcon />
                    </Avatar>
                    <ListItemText
                      primary={user.pseudo}
                      secondary={user.connected ? "Connected" : "Not connected"}
                    />
                  </ListItem>
                  <Divider />
                </div>
              ))}
          </List>
        </Drawer>
        <Container>
          <Divid />
          <MessageInput fullWidth label="Tape tour message" />
        </Container>
      </div>
    );
  }
}

export default withStyles(styles)(Chat);
