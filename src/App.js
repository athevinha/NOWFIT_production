import { Switch, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import SetProfile from "./components/SetProfile";
import { PrivateRoute } from "./PrivateRoute";
import "./assets/css/styles.css";
import { useEffect } from "react";
// import Search from "./components/search/Main";
import Navbar from "./components/Navbar";
export default function App() {
  useEffect(() => {
    console.log(process.env);
  });
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" component={Login} exact />
        <Route path="/signup" component={Signup} />
        {/* <Route path="/search" component={Search} /> */}
        <PrivateRoute path="/home" component={Home} />
        <PrivateRoute path="/set-profile" component={SetProfile} />
      </Switch>
    </div>
  );
}
