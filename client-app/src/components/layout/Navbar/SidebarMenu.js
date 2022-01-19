import { useState } from "react";
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

  const sidebarCloseHandler = (e) => {
    e.preventDefault();
    setSidebarClass("sidebar close");
    setTimeout(() => {
      props.close();
    }, 1000);
  };

  return (
    <div className={sidebarClass}>
      <>
        <button className="toggle" onClick={sidebarCloseHandler}>
          <FaIcons.FaTimes />
        </button>
      </>

      <UserIcon />
      <Menu vertical>
        <MenuItem>
          <Link to="/groups/:id">Home</Link>
        </MenuItem>
        <Dropdown text="Create New" pointing="left" className="link item">
          <DropdownMenu>
            <DropdownItem>Post</DropdownItem>
            <DropdownItem>Group</DropdownItem>
          </DropdownMenu>
        </Dropdown>

        <MenuItem>
          <Link to="/settings/:id">Settings</Link>
        </MenuItem>
        <MenuItem>
          {/* <SignoutBtn></SignoutBtn> */}
          <Link to="/">Sign Out</Link>
        </MenuItem>
      </Menu>
    </div>
  );
}
