import { useState, useEffect, useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import { db, auth } from "../firebase/config";
import { Context } from "../Context/GlobalState";
import { useHistory } from "react-router-dom";
import LoadingInstagram from "./LoadingInstagram";

export default function SetProfile() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  const { setUser, user, isPageLoading, setIsPageLoading } = useContext(
    Context
  );

  useEffect(() => {
    setIsPageLoading(true);
  }, [setIsPageLoading]);

  const handleUpdate = (e) => {
    e.preventDefault();

    setIsLoading(true);

    // update user's password
    const currentUser = auth.currentUser;
    currentUser
      .updatePassword(password)
      .then(() => {
        // update user in database
        db.collection("users").doc(user.id).update({
          fullName,
          username,
        });

        // Update the user in the global up
        setUser((user) => ({ ...user, fullName, username }));

        setIsLoading(false);
        history.push("/home");
      })
      .catch((err) => console.log(err));
  };

  if (isPageLoading) {
    return <LoadingInstagram />;
  }

  return (
    <section className="section__setProfile">
      <div className="container">
        <Avatar src={user.photoURL} />
        <form onSubmit={handleUpdate}>
          <div className="form__field">
            <input
              type="text"
              id="FullName"
              name="FullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <label htmlFor="FullName">Full name</label>
          </div>
          <div className="form__field">
            <input
              type="text"
              id="Username"
              name="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <label htmlFor="Username">Username</label>
          </div>
          <div className="form__field">
            <input
              type="password"
              id="Password"
              name="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="Password">Password</label>
          </div>
          <button className="primary-insta-btn" disabled={isLoading}>
            {!isLoading ? (
              "Update"
            ) : (
              <CircularProgress size={20} color="inherit" />
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
