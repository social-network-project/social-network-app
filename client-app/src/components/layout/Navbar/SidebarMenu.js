import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  MenuItem,
  Dropdown,
  DropdownItem,
  DropdownMenu,
} from "semantic-ui-react";
import UserIcon from "../../UserComponents/UserIcon";
import * as FaIcons from "react-icons/fa";
// import SignoutBtn from "../Navbar/SignoutBtn";
import "./Sidebar.css";

export default function SidebarMenu(props) {
  const [sidebarClass, setSidebarClass] = useState(props.sidebar);

  const menuRef = useRef();

  useEffect(() => {
    const isClickedOutside = (e) => {
      if (!menuRef.current.contains(e.target)) {
        e.preventDefault();
        props.close();
      }
    };
    document.addEventListener("click", sidebarCloseHandler);
    return () => {
      document.removeEventListener("click", sidebarCloseHandler);
    };
  }, []);

  const sidebarCloseHandler = (e) => {
    e.preventDefault();
    setSidebarClass("sidebar close");
    setTimeout(() => {
      props.close();
    }, 100);
  };

  return (
    <div className={sidebarClass} ref={menuRef}>
      <>
        <button className="toggle" onClick={sidebarCloseHandler}>
          <FaIcons.FaTimes />
        </button>
      </>

      <UserIcon connectedUser={props.connectedUser} />
      <Menu vertical style={{ border: "none", boxShadow: "none" }}>
        <Link to={`/groups/${localStorage.getItem("connectedUser")}`}>
          <MenuItem as="a">Home</MenuItem>
        </Link>

        <Dropdown text="Create New" pointing="left" className="link item">
          <DropdownMenu>
            <DropdownItem>Post</DropdownItem>
            <DropdownItem>Group</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <Link to={`/settings/${localStorage.getItem("connectedUser")}`}>
          <MenuItem as="a">Settings</MenuItem>
        </Link>
        {/* <SignoutBtn></SignoutBtn> */}
        <Link to="/">
          <MenuItem as="a">Sign Out</MenuItem>
        </Link>
      </Menu>
    </div>
  );
}
