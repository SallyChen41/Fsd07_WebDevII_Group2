import React from "react";
import Link from "next/link";
import styles from "../styles/navbar.module.css";

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link href="/" passHref>
          <span className="navbar-brand">Sushi Website</span>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link href="/" passHref>
                <span className={`${styles.navLink} nav-link`}>Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/menu" passHref>
                <span className={`nav-link ${styles.navLink}`}>Menu</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/about" passHref>
                <span className={`nav-link ${styles.navLink}`}>About</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/contact" passHref>
                <span className={`nav-link ${styles.navLink}`}>Contact</span>
              </Link>
            </li>
          </ul>

          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link href="/cart" passHref>
                <span className={`nav-link ${styles.navLink}`}>Cart</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/register" passHref>
                <span className={`nav-link ${styles.navLink}`}>Register</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link href="/login" passHref>
                <span className={`nav-link ${styles.navLink}`}>Login</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
