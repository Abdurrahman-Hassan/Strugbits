import logo from "../assets/logo.png";
import "./sidebar.css";
import customersicon from "../assets/customers icon.png";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {window.innerWidth < 768 && (
        <div className="mobiletogglebtn">
          <button className="toggle-button" onClick={toggleSidebar}>
            <span>
              <AiOutlineMenu />
            </span>
          </button>
        </div>
      )}
      {window.innerWidth > 768 ? (
        <div className="sidebarmaindiv">
          <div className="sidebarlogodiv">
            <img src={logo} alt="logo" />
          </div>
          <div>
            <button className="customersbutton">
              <img src={customersicon} alt="customersicon" />
              <span>Customers</span>
            </button>
          </div>
        </div>
      ) : (
        <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
          {isSidebarOpen && (
            <div className="sidebarmaindiv">
              <div className="sidebarlogodiv">
                <img src={logo} alt="logo" />
              </div>
              <div>
                <button className="customersbutton">
                  <img src={customersicon} alt="customersicon" />
                  <span>Customers</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
