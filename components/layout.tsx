import React, { ReactNode, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
// fontasesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
import * as IconSolid from "@fortawesome/free-solid-svg-icons";
import * as IconRegular from "@fortawesome/free-regular-svg-icons";
config.autoAddCss = false;

// bootstap
// import * as Bootstap from "react-bootstrap-v5";
import {
  Button,
  Navbar,
  Container,
  Nav,
  ListGroup,
  NavDropdown,
  Dropdown,
  DropdownButton,
} from "react-bootstrap-v5";

import Loading from "./loading";
// type props
type Props = {
  children: any;
  // children: ReactNode;
  // title?: string;
};

function Layout({ children }: Props) {
  const { data: session, status } = useSession();
  if (status == "loading") {
    <Loading />;
  }
  const router = useRouter();
  const [chilActive, setChillActive] = useState(0);
  function setChillActiveIndex(index: any) {
    setChillActive(index);
  }
  // master
  const [masterActive, setMasterActive] = useState(false);
  function showListMaster() {
    // let master = document.getElementsByClassName("master");
    // let el = master[0].getElementsByClassName("active");
    // let chill = master[0].getElementsByClassName("master-chill");
    // try {
    //   el[0].className = el[0].className.replace(" active", "");
    //   chill[0].className = chill[0].className.replace(" show", "");
    // } catch (err) {
    //   e.currentTarget.className += " active";
    //   chill[0].classList.add("show");
    // }
    setMasterActive(!masterActive);
  }

  return (
    <>
      <div className="wrapper">
        {/* sidebar */}
        <Navbar className="sidebar">
          <div className="">
            {/* brand */}
            <Navbar.Brand className="sidebar-brand text-dark" href={"/"}>
              {/* <FontAwesomeIcon icon={IconSolid.faHouse} /> */}
              {/* <span className="ps-1">CARSHARING</span> */}
              <span className="ps-1">RIDESHARE</span>
            </Navbar.Brand>
            <hr />
            {/* master */}
            <Nav className="master sidebar-nav">
              <Nav.Item className="sidebar-nav-item">
                <a
                  className={`sidebar-nav-item-link ${
                    masterActive === true ? "active" : ""
                  }`}
                  onClick={showListMaster}
                >
                  <FontAwesomeIcon
                    className="click-active"
                    icon={IconSolid.faDatabase}
                    size="lg"
                  />
                  <span className="text">Master</span>
                  <FontAwesomeIcon
                    className="arrow"
                    icon={IconSolid.faAngleLeft}
                    size="lg"
                  />
                </a>
                <Nav
                  className={`master-chill sidebar-nav-chill ${
                    masterActive === true ? "show" : ""
                  }`}
                >
                  <Nav.Item className="sidebar-nav-chil-item">
                    <Link
                      href={"/"}
                      className="sidebar-nav-chil-item-link"
                      onClick={() => {
                        setChillActiveIndex(1);
                      }}
                    >
                      <FontAwesomeIcon
                        className={`${chilActive === 1 ? "active" : ""}`}
                        icon={IconSolid.faUserFriends}
                      />
                      <span className="ps-2">Users</span>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="sidebar-nav-chil-item">
                    <Link
                      href={"/"}
                      className="sidebar-nav-chil-item-link"
                      onClick={() => {
                        setChillActiveIndex(2);
                      }}
                    >
                      <FontAwesomeIcon
                        icon={IconSolid.faUserGear}
                        className={`${chilActive === 2 ? "active" : ""}`}
                      />
                      <span className="ps-2">Users Roles</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Nav.Item>
            </Nav>

            <hr />
          </div>
        </Navbar>

        {/* navbar */}
        <div className="content-wrapper">
          <Navbar className="navbar-top" bg="light" variant="dark">
            <Container fluid>
              <a className="">
                <FontAwesomeIcon icon={IconSolid.faBars} size="xl" />
              </a>
              {/* <div className="me-1 d-flex flex-row"> */}
              <Nav className="navbar-top-conten">
                {/* Bell */}
                <Nav.Item className="">
                  <a className="position-relative">
                    <FontAwesomeIcon icon={IconSolid.faBell} size="xl" />
                    <span className=" ms-1 position-absolute start-100 translate-middle badge rounded-pill bg-danger">
                      99+
                    </span>
                  </a>
                </Nav.Item>
                <Nav.Item className="ms-4">
                  {/* <a>
                        <span className="me-2 text-profile">sssssss</span>
                        <img
                          className="img-profile "
                          src="img/undraw_profile.svg"
                        />
                      </a> */}
                  <NavDropdown
                    id=""
                    style={{ minWidth: "9vw" }}
                    // menuVariant="light"
                    className="ms-2 me-4"
                    title=<>
                      <span className="me-2 text-profile">
                        {session?.user?.username}
                      </span>
                      <img
                        className="img-profile"
                        src="img/undraw_profile.svg"
                      />
                    </>
                  >
                    <NavDropdown.Item href="">
                      <FontAwesomeIcon icon={IconSolid.faUser} />
                      <span className="ps-2">Profile</span>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="">
                      <FontAwesomeIcon icon={IconSolid.faCircleInfo} />
                      <span className="ps-2">Support</span>
                    </NavDropdown.Item>
                    <NavDropdown.Item href="">
                      <FontAwesomeIcon icon={IconSolid.faWrench} />
                      <span className="ps-2">Setting</span>
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item
                      onClick={() => {
                        signOut();
                        router.push("/login");
                      }}
                    >
                      <FontAwesomeIcon
                        icon={IconSolid.faArrowRightFromBracket}
                      />
                      <span className="ps-2">Logout</span>
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav.Item>
              </Nav>
              {/* </div> */}
            </Container>
          </Navbar>
          {children}
        </div>
      </div>
    </>
  );
}
export default Layout;
