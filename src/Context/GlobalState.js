import { useState, createContext } from "react";
import { auth, db } from "../firebase/config";
import firebase from "firebase";
import { useHistory } from "react-router-dom";

export const Context = createContext({});

export default function ContextProvider({ children }) {
  const history = useHistory();
  const [user, setUser] = useState({});
  const [isPageLoading, setIsPageLoading] = useState(true);
  const [OAuthError, setOAuthError] = useState(null);
  const [authError, setAuthError] = useState(null);

  const login = (email, password, redirect, disableLoading) => {
    auth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        db.collection("users")
          .where("uid", "==", result.user.uid)
          .get()
          .then((snapshot) => {
            setUser(
              snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))[0]
            );

            disableLoading(); // Disable loading button
            redirect();
          });
      })
      .catch((err) => {
        setAuthError(err.message);
        disableLoading(); // Disable loading button
      });
  };

  const signup = (
    email,
    username,
    fullName,
    password,
    redirect,
    disableLoading
  ) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        // Setting the user in firestore
        db.collection("users").add({
          uid: result.user.uid,
          username,
          fullName,
          photoURL: result.user.photoURL,
        });

        // Setting user to state from users collection
        db.collection("users")
          .where("uid", "==", result.user.uid)
          .get()
          .then((snapshot) => {
            setUser(snapshot.docs.map((doc) => ({ ...doc.data() }))[0]);

            disableLoading(); // Disable the signup button loading

            // Redirect to home component
            redirect();
          });
      })
      .catch((err) => {
        disableLoading(); // Disable the signup button loading
        setAuthError(err.message);
      });
  };

  const logout = (redirect) => {
    auth
      .signOut()
      .then(() => {
        // Signing out user
        setUser({});

        // redirect back to login page
        redirect();
      })
      .catch((err) => alert(err));
  };

  const loginWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    auth
      .signInWithPopup(provider)
      .then((result) => {
        // Check if user already exists, if exists then direcly log him/her in
        db.collection("users")
          .where("uid", "==", result.user.uid)
          .get()
          .then((snapshot) => {
            const userExists = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }))[0];

            if (
              userExists === {} ||
              userExists === null ||
              userExists === undefined
            ) {
              // Setting the user in firestore
              const googleUser = {
                uid: result.user.uid,
                username: "",
                fullName: "",
                photoURL: result.user.photoURL,
              };

              db.collection("users")
                .add(googleUser)
                .then(() => {
                  // Setting the global state user
                  setUser(googleUser);
                })
                .then(() => {
                  // Redirect to set-profile component
                  history.push("/set-profile");
                });
            } else {
              // Turn off loading
              setIsPageLoading(false);
              // If user already exists in the firestore database, then log him in with his data as state
              setUser(userExists);
              history.push("/home");
            }
          });
      })
      .catch((err) => {
        console.log(err.message);
        setOAuthError(err.message);
      });
  };

  const value = {
    user,
    setUser,
    signup,
    login,
    logout,
    loginWithGoogle,
    isPageLoading,
    setIsPageLoading,
    OAuthError,
    authError
  };

  return <Context.Provider value={value}>{children}</Context.Provider>;
}
