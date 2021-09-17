import { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import { Context } from "./Context/GlobalState";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user } = useContext(Context);

  return (
    <Route
      {...rest}
      render={(props) =>
        user.uid !== undefined ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: "/", state: { from: props.location } }} />
        )
      }
    />
  );
};
