import { useContext } from "react";
import Avatar from "@material-ui/core/Avatar";
import { Context } from "../Context/GlobalState";

export default function Sidebar() {
  const { user } = useContext(Context);

  return (
        <div className="">
          <b><h6 className="currentUser__username">{user?.fullName}</h6></b>
          {/* <p className="currentUser__fullName">{user?.username}</p> */}
        </div>

  );
}
