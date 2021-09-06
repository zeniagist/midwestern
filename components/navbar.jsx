import React from "react";
import Image from "next/image";
import { Nav } from "react-bootstrap";
import Link from "next/link";

export default function Navbar({ pathName }) {
  return (
    <Nav
      className={
        "navbar " + (pathName === "/contact" ? "contactNav" : "homeNav")
      }
    >
      <div className="container-xl">
        <Image src="Logo.png" alt="Logo" className="navLogo" />
        <div>
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
