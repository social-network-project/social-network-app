import { useState } from "react";
import ToggleBtn from "./ToggleBtn";
import SidebarMenu from "./SidebarMenu";
import { Menu } from "semantic-ui-react";
import HeaderLogo from "./HeaderLogo";

export default function NavBar({ connectedUser }) {
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
    isOpen = (
      <SidebarMenu
        close={sidebarCloseHandler}
        sidebar={"sidebar"}
        connectedUser={connectedUser}
      />
    );
  }

  return (
    <>
      <Menu>
        <ToggleBtn click={openHandler} />
        <HeaderLogo />
      </Menu>
      {isOpen}
    </>
  );
}
