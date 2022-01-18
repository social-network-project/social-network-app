import * as FaIcons from "react-icons/fa";

export default function ToggleBtn(props) {
  return (
    <>
      <button className="toggle" onClick={props.click}>
        <FaIcons.FaBars />
      </button>
    </>
  );
}
