import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../Context/GlobalState";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function Signup({ history }) {
  const { signup, authError } = useContext(Context);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  // const [height, setHeight] = useState(0);
  // const [weight, setWeight] = useState(0);
  // const [colorSkin, setColorSkin] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    setIsLoading(true);
    signup(
      email,
      username,
      fullName,
      password,
      () => history.push("/home"),
      () => setIsLoading(false)
    );
  };

  return (
    <div className="signup__container">
      <h1>Instagram Clone</h1>
      <div className="form__area">
        <div className="form">
          <h4>Sign up to see photos and videos from your friends.</h4>
          <form onSubmit={handleSignup}>
            <div className="form__field">
              <input
                type="email"
                id="Email"
                name="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <label htmlFor="Email">Email</label>
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
                type="text"
                id="FullName"
                name="FullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <label htmlFor="FullName">Full Name</label>
            </div>
            <div className="form__field">
              <input
                type="password"
                id="password"
                name="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <label htmlFor="Password">Password</label>
            </div>
            <button className="primary-insta-btn" disabled={isLoading}>
              {!isLoading ? (
                "Sign up"
              ) : (
                <CircularProgress size={20} color="inherit" />
              )}
            </button>
            <div className="auth__error">
              <small>{authError}</small>
            </div>
          </form>
          <p className="policies">
            By signing up, you agree to our Terms , Data Policy and Cookies
            Policy .
          </p>
        </div>
        <div className="signup__area">
          <p>
            Have an account <Link to="/">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
