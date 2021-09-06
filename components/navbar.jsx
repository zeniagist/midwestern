/* eslint-disable @next/next/no-img-element */
import React from "react";
import { Nav } from "react-bootstrap";
import Link from "next/link";

import styles from "../styles/navbar.module.scss";

export default function Navbar({ pathName }) {
  return (
    <Nav
      className={
        "navbar " +
        (pathName === "/contact" ? styles.contactNav : styles.homeNav)
      }
    >
      <div className="container-xl">
        <img src="Logo.png" alt="Logo" className="navLogo" />
        <div>
          <ul>
            {pathName === "/contact" && (
              <li>
                <Link href="/">
                  <a className={styles.navLink}>
                    home<span className="sr-only">(current)</span>
                  </a>
                </Link>
              </li>
            )}
            {pathName === "/" && (
              <li className="nav-item">
                <Link href="/contact">
                  <a className={styles.navLink}>
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
