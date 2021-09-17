import { useState, useContext } from "react";
import HomeSharpIcon from "@material-ui/icons/HomeSharp";
import SearchIcon from '@material-ui/icons/Search';
import Avatar from "@material-ui/core/Avatar";
import AddIcon from "@material-ui/icons/Add";
import { Context } from "../Context/GlobalState";
import UploadModal from "./UploadModal";
import { Link, useHistory } from "react-router-dom";
import useDropdownMenu from "react-accessible-dropdown-menu-hook";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import In4 from './In4';
import Setting from "./Setting"
export default function Navbar() {
  const { user, logout } = useContext(Context);
  const [open, setOpen] = useState(false);
  const { buttonProps, itemProps, isOpen } = useDropdownMenu(2);
  const history = useHistory();

  const handleClose = () => setOpen(false);

  const handleOpen = (e) => {
    e.preventDefault();

    setOpen(true);
  };

  const handleLogout = (e) => {
    e.preventDefault();

    logout(() => history.push("/"));
  };

  return (
    <nav>
      <div className="nav__container">
        <Setting/>
        <div className="nav__navlogo">
          <Link to="/home">Instgram Clone</Link>
        </div>

        <div className="nav__menu">
        
          <Link to="/home">
            <HomeSharpIcon />
          </Link>
          <Link onClick={handleOpen}>
            <AddIcon />
          </Link>
          <Link to="/search">
            <SearchIcon />
          </Link>
          {open && <UploadModal open={open} handleClose={handleClose} />}
          <div className="avatar__menu">
            <Avatar
              alt={user?.displayName}
              src={user?.photoURL}
              {...buttonProps}
            />
            <div className={isOpen ? "visible" : ""} role="menu">
            <Link {...itemProps[1]} to="/">
              <In4 />
              </Link>
              <Link {...itemProps[0]} to="/">
                <AccountCircleIcon /> My Profile
              </Link>
              <Link {...itemProps[1]} to="/" onClick={handleLogout}>
                <ExitToAppIcon /> Logout
              </Link>
             

            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
