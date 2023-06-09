import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { auth } from "../config/firebase";
import styles from "../styles/navbar.module.css";

function Navbarnew() {
  // State to hold the current user
  const [user, setUser] = useState({});
  const router = useRouter();

  useEffect(() => {
    // Effect hook to listen for changes in the authentication state
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      if (currentUser) {
        setUser(currentUser); // Set the user state if a user is logged in
      } else {
        setUser(null); // Set the user state to null if no user is logged in
      }
    });
    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user using the authentication service
      router.push("/"); // Redirect to the home page after successful logout
    } catch (error) {
      console.log("Logout error:", error.message);
    }
  };

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
            {user ? (
              <>
                <li className="nav-item">
                  <span className={`nav-link ${styles.navLink}`}>
                    Welcome, {user.email}
                  </span>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${styles.navLink}`}
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link href="/cart" passHref>
                    <span className={`nav-link ${styles.navLink}`}>Cart</span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/register" passHref>
                    <span className={`nav-link ${styles.navLink}`}>
                      Register
                    </span>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/login" passHref>
                    <span className={`nav-link ${styles.navLink}`}>Login</span>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbarnew;
