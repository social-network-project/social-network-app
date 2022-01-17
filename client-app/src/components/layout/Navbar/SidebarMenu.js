import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Item, ItemGroup } from "semantic-ui-react";
import UserIcon from "../../UserComponents/UserIcon";
import * as FaIcons from "react-icons/fa";
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
        <Menu.Item>
          <Link>Home</Link>
        </Menu.Item>
        <Menu.Item>
          <Link>Create New Group</Link>
        </Menu.Item>
        <Menu.Item>
          <Link>Settings</Link>
        </Menu.Item>
        <Menu.Item>
          <Link>Help</Link>
        </Menu.Item>
        <Menu.Item>
          <Link to="/">Sign Out</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
}
