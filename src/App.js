import "./index.css";
import { ReactComponent as BellIcon } from "./icons/bell.svg";
import { ReactComponent as MessengerIcon } from "./icons/messenger.svg";
import { ReactComponent as CaretIcon } from "./icons/caret.svg";
import { ReactComponent as PlusIcon } from "./icons/plus.svg";
import { ReactComponent as CogIcon } from "./icons/cog.svg";
import { ReactComponent as ChevronIcon } from "./icons/chevron.svg";
import { ReactComponent as ArrowIcon } from "./icons/arrow.svg";
import { ReactComponent as BoltIcon } from "./icons/bolt.svg";

import React, { useState, useEffect, useRef } from "react";
import { CSSTransition } from "react-transition-group";

function App() {
  return (
    <Navbar>
      {/* <NavItem icon={<PlusIcon />} />
      <NavItem icon={<BellIcon />} />
      <NavItem icon={<MessengerIcon />} /> */}

      <NavItem icon={<CaretIcon />}>
        <DropdownMenu></DropdownMenu>
      </NavItem>
    </Navbar>
  );
}

function Navbar(props) {
  return (
    <nav className="navbar">
      <ul className="navbar-nav">{props.children}</ul>
    </nav>
  );
}

function NavItem(props) {
  const [open, setOpen] = useState(false);

  return (
    <li className="nav-item">
      <a href="#" className="icon-button" onClick={() => setOpen(!open)}>
        {props.icon}
      </a>

      {open && props.children}
    </li>
  );
}

function DropdownMenu() {
  const [activeMenu, setActiveMenu] = useState("main");
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight);
  }, []);

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  function DropdownItem(props) {
    return (
      <a
        href="#"
        className="menu-item"
        onClick={() => props.goToMenu && setActiveMenu(props.goToMenu)}
      >
        <span className="icon-button">{props.leftIcon}</span>
        {props.children}
        <span className="icon-right">{props.rightIcon}</span>
      </a>
    );
  }

  return (
    <div className="dropdown" style={{ height: menuHeight }} ref={dropdownRef}>
      <CSSTransition
        in={activeMenu === "main"}
        timeout={500}
        classNames="menu-primary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem>Equipment</DropdownItem>
          <DropdownItem rightIcon=">" goToMenu="evaluation">
            Evaluation
          </DropdownItem>
          <DropdownItem>Loss Expectancy</DropdownItem>
          <DropdownItem>Occupancy Area</DropdownItem>
          <DropdownItem rightIcon=">" goToMenu="recommendation">
            Recommendation
          </DropdownItem>
          <DropdownItem>Structure</DropdownItem>
        </div>
      </CSSTransition>

{/* Evaluation Menu */}
      <CSSTransition
        in={activeMenu === "evaluation"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Back</h2>
          </DropdownItem>
          <DropdownItem rightIcon=">" goToMenu="">
            Construction
          </DropdownItem>
          <DropdownItem rightIcon=">" goToMenu="">
            Contamination
          </DropdownItem>
          <DropdownItem rightIcon=">" goToMenu="">
            Human Element
          </DropdownItem>
          <DropdownItem rightIcon=">" goToMenu="">
            Natural Hazards
          </DropdownItem>
          <DropdownItem rightIcon=">" goToMenu="">
            Special
          </DropdownItem>
          <DropdownItem rightIcon=">" goToMenu="">
            Storages
          </DropdownItem>
          <DropdownItem rightIcon={<BoltIcon />} goToMenu="">
            Other
          </DropdownItem>
        </div>
      </CSSTransition>
{/* Recommendation Menu */}
      <CSSTransition
        in={activeMenu === "recommendation"}
        timeout={500}
        classNames="menu-secondary"
        unmountOnExit
        onEnter={calcHeight}
      >
        <div className="menu">
          <DropdownItem goToMenu="main" leftIcon={<ArrowIcon />}>
            <h2>Back</h2>
          </DropdownItem>
          <DropdownItem>Flood</DropdownItem>
          <DropdownItem rightIcon="🦘">Hall</DropdownItem>
          <DropdownItem>Earth Movement</DropdownItem>
          <DropdownItem>Wind</DropdownItem>
        </div>
      </CSSTransition>
    </div>
  );
}

export default App;
