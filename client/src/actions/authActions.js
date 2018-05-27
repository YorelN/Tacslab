import Firebase from "firebase";
import { firebase, usersRef } from "../firebase.config";

export function login({ credential }) {
  console.log(credential);

  return async function(dispatch) {
    firebase
      .auth()
      .signInWithEmailAndPassword(credential.email, credential.password)
      .then(user => {
        usersRef
          .child(credential.id)
          .update(credential)
          .then(user => dispatch({ type: "LOGIN", payload: credential }));
      })
      .catch(({ message }) => console.error(message));
  };
}

export function signup({ credential }) {
  return async function(dispatch) {
    firebase
      .auth()
      .createUserWithEmailAndPassword(credential.email, credential.password)
      .then(({ user }) => {
        usersRef
          .push(credential)
          .then(user => dispatch({ type: "SIGNUP", payload: credential }));
      })
      .catch(function({ message }) {
        console.error(message);
      });
  };
}

export function logout({ credential }) {
  console.log(credential);
  return async function(dispatch) {
    firebase
      .auth()
      .signOut()
      .then(() =>
        usersRef
          .child(credential.id)
          .update(credential)
          .then(() => dispatch({ type: "LOGOUT", payload: credential }))
          .catch(({ message }) => console.error(message))
      );
  };
}
