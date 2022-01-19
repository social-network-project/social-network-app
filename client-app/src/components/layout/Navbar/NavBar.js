// import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import ToggleBtn from "./ToggleBtn";
import SidebarMenu from "./SidebarMenu";
import { Menu } from "semantic-ui-react";
import HeaderLogo from "./HeaderLogo";

export default function NavBar({ children }) {
  const [sidebar, setSidebar] = useState(false);

  const openHandler = () => {
    if (!sidebar) {
      setSidebar(true);
    } else {
      setSidebar(false);
    }
  };

  const sidebarCloseHandler = () => {
    setSidebar(false);
  };

  let isOpen;
  if (sidebar) {
    isOpen = <SidebarMenu close={sidebarCloseHandler} sidebar={"sidebar"} />;
  }

  useEffect(() => {
    document.addEventListener("mousedown", (event) => {
      if (!event.target) {
        setSidebar(false);
      }
    });
  });
  return (
    <>
      <Menu>
        <ToggleBtn click={openHandler} />
        <HeaderLogo />
        {isOpen}
      </Menu>
    </>
  );
}
