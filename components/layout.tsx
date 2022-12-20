import React, { ReactNode, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { useRouter } from "next/router";

// fontasesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import * as IconSolid from "@fortawesome/free-solid-svg-icons";
import * as IconRegular from "@fortawesome/free-regular-svg-icons";
config.autoAddCss = false;

// type props
type Props = {
  children: ReactNode;
  title?: string;
  userName?: string;
};
function Layout({ children, title = "Test", userName = "No" }: Props) {
  // sidebar
  const [stateSideBar, setStateSideBar] = useState(false);
  let sideBarDnone = stateSideBar ? "d-none" : "";
  function sideBarToggle() {
    setStateSideBar((stateSideBar) => !stateSideBar);
  }
  // Show master detail ** toggleClass in react
  const [stateShowMesterDetail, setStateShowMesterDetail] = useState(true);
  let detailMaster = stateShowMesterDetail ? "d-none" : "";
  function showMesterDetail() {
    setStateShowMesterDetail((stateShowMesterDetail) => !stateShowMesterDetail);
  }

  // session
  const router = useRouter();
  async function Logout(e: any) {
    // e.preventDefault();
    // console.log("SS");
    await signOut();
    // router.push("/login");
  }
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        {/* <meta http-equiv="X-UA-Compatible" content="ie=edge" /> */}
      </Head>

      {/* body */}
      <div className="wrapper">
        {/* nav + sidebar */}
        <nav className={`sidebar js-sidebar ${sideBarDnone}`}>
          {/* sidebar */}
          <div className="sidebar-content js-simplebar">
            {/* Brabd */}
            <Link className="sidebar-brand" href={"/"}>
              <FontAwesomeIcon icon={IconSolid.faHouse} size="2x" />
              <span className="display-6"> Carpool</span>
            </Link>
            {/* Master */}
            <ul className="sidebar-nav">
              <li className="sidebar-item active">
                <a className="sidebar-link" onClick={showMesterDetail}>
                  <div className="d-flex">
                    <FontAwesomeIcon icon={IconSolid.faDatabase} size="lg" />
                    <span className="align-middle">Master</span>
                  </div>
                </a>
                {/* MasterDetail */}
                <ul className={`sidebar-nav ${detailMaster}`}>
                  <li className="sidebar-item ">
                    <Link href={"/"} className="sidebar-link ps-5">
                      <FontAwesomeIcon icon={IconSolid.faUser} />
                      <span>Users</span>
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </nav>
        <div className="main">
          {/* Navbar */}
          <nav className="navbar navbar-expand navbar-light navbar">
            {/* sideBar on/off */}
            <a
              className="sidebar-toggle js-sidebar-toggle"
              onClick={sideBarToggle}
            >
              <i className="hamburger align-self-center"></i>
            </a>
            {/* icon user */}
            <ul className="navbar-nav ms-auto ">
              {/* Bell */}
              <li className="nav-item dropdown me-3">
                <a className="nav-link">
                  <FontAwesomeIcon icon={IconSolid.faBell} size="lg" />
                  <span className="position-absolute top-75 start-100 translate-middle badge rounded-pill bg-danger ">
                    99+
                  </span>
                </a>
              </li>
              {/* user ui */}
              <li className="nav-item dropdown no-arrow">
                <a
                  className="nav-link  text-white"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <span className="me-3 text-dark fw-bolder">{userName}</span>
                  <img className="img-profile " src="img/undraw_profile.svg" />
                </a>
                <ul
                  className="dropdown-menu dropdown-menu-end"
                  aria-labelledby="navbarDropdown"
                >
                  <li>
                    <a className="dropdown-item">
                      <FontAwesomeIcon
                        icon={IconSolid.faAddressCard}
                        size="lg"
                      />
                      <span> Profile</span>
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item">
                      <FontAwesomeIcon icon={IconSolid.faGear} size="lg" />
                      <i className="fa-solid fa-gear" />
                      <span> Setting</span>
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" onClick={Logout}>
                      <i className="fa-solid fa-arrow-right-from-bracket" />
                      <FontAwesomeIcon
                        icon={IconSolid.faArrowRightFromBracket}
                        size="lg"
                      />
                      <span> Logout</span>
                    </a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          {/* main content */}
          <main className="content">{children}</main>
        </div>
      </div>
    </>
  );
}

export default Layout;
