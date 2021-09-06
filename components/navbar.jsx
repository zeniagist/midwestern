/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { Nav } from "react-bootstrap";
import Link from "next/link";

export default function Navbar({ pathName }) {
  return (
    <Nav
      // background color for home and contact pages
      className={
        "navbar " + (pathName === "/contact" ? "contactNav" : "homeNav")
      }
    >
      <div className="container-xl">
        <img src="/Logo.png" alt="Logo" className="navLogo" />
        <div>
          {/* nav link  for home and contact pages*/}
          <ul>
            {pathName === "/contact" && (
              <li>
                <Link href="/">
                  <a className="nav-link">
                    home<span className="sr-only">(current)</span>
                  </a>
                </Link>
              </li>
            )}
            {pathName === "/" && (
              <li className="nav-item">
                <Link href="/contact">
                  <a className="nav-link">
                    contact<span className="sr-only">(current)</span>
                  </a>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </Nav>
  );
}
