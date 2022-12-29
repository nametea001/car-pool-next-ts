import React, { ReactNode, useState, useEffect } from "react";
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

// bootstap
// import * as Bootstap from "react-bootstrap-v5";
import {
  Button,
  Navbar,
  Container,
  Nav,
  ListGroup,
  NavDropdown,
} from "react-bootstrap-v5";

// type props
type Props = {
  children: ReactNode;
  // title?: string;
  // userName?: string;
};

function Layout({ children }: Props) {
  // master
  function showListMaster(e: any) {
    let master = document.getElementsByClassName("master");
    let el = master[0].getElementsByClassName("active");
    let chill = master[0].querySelectorAll(".sidebar-nav .sidebar-nav-chill");
    console.log(master[0]);
    console.log(chill[0]);

    try {
      el[0].className = el[0].className.replace(" active", "");
      chill[0].className = chill[0].className.replace(" show", "");
    } catch (err) {
      e.currentTarget.className += " active";
      chill[0].classList.add("show");
    }
  }
  return (
    <>
      <div className="wrapper">
        <Navbar className="sidebar">
          <div className="">
            <Link className="sidebar-brand text-dark" href={"/"}>
              <FontAwesomeIcon icon={IconSolid.faHouse} />
              <span className="ps-1"> Carpool</span>
            </Link>
            <hr />
            {/* master */}
            <Nav className="master sidebar-nav">
              <Nav.Item className="sidebar-nav-item">
                <a className="sidebar-nav-item-link" onClick={showListMaster}>
                  <FontAwesomeIcon
                    className="click-active"
                    icon={IconSolid.faDatabase}
                    size="lg"
                  />
                  <span className="text">Master</span>
                  {/* <div className="ms-5 ps-4"> */}
                  <FontAwesomeIcon
                    className="arrow"
                    icon={IconSolid.faAngleLeft}
                    size="lg"
                  />
                  {/* </div> */}
                </a>
                <Nav className="sidebar-nav-chill">
                  <Nav.Item className="sidebar-nav-chil-item ">
                    <Link href={"/"} className="sidebar-nav-chil-item-link">
                      <div>
                        <FontAwesomeIcon icon={IconSolid.faUser} />
                        <span className="ps-2">Users</span>
                      </div>
                    </Link>
                  </Nav.Item>
                  <Nav.Item className="sidebar-nav-chil-item">
                    <Link href={"/"} className="sidebar-nav-chil-item-link">
                      <FontAwesomeIcon icon={IconSolid.faUser} />
                      <span className="ps-2">Users</span>
                    </Link>
                  </Nav.Item>
                </Nav>
              </Nav.Item>
            </Nav>

            <hr />
          </div>
        </Navbar>

        <div className="content-wrapper">
          <Navbar className="navbar-top " bg="light" variant="dark">
            <Container fluid>
              <a className="">
                <FontAwesomeIcon icon={IconSolid.faBars} size="xl" />
              </a>
              <div className="me-1 ">
                <Nav className="">
                  {/* Bell */}
                  <Nav.Item className="mt-2">
                    <a className="position-relative">
                      <FontAwesomeIcon icon={IconSolid.faBell} size="xl" />
                      <span className=" ms-1 position-absolute start-100 translate-middle badge rounded-pill bg-danger">
                        99+
                      </span>
                    </a>
                  </Nav.Item>
                  {/* user ui */}
                  <Nav.Item className="ms-4">
                    <a>
                      <span className="me-2 text-profile">sssssss</span>
                      <img
                        className="img-profile "
                        src="img/undraw_profile.svg"
                      />
                    </a>
                  </Nav.Item>
                </Nav>
              </div>
            </Container>
          </Navbar>
          {children}
        </div>
      </div>
    </>
  );
}

export default Layout;
