import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";
import { auth } from "../config/firebase";

const Navbar = () => {
  // State to hold the current user
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    // Effect hook to listen for changes in the authentication state
    const unsubscribe = auth.onAuthStateChanged((currentUser) => {
      console.log("onAuthStateChanged - currentUser:", currentUser); // Debug statement
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
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.callButton}>
          <Image src="/img/telephone.png" alt="" width="32" height="32" />
        </div>
        <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>012 345 6789</div>
        </div>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}>
            <Link href="/">Homepage</Link>
          </li>
          <li className={styles.listItem}>Products</li>
          <Image src="/img/logo.png" alt="" width="160" height="69" />
          <li className={styles.listItem}>Menu</li>
          <li className={styles.listItem}>Contact</li>

          {user ? (
            <>
              <li className={styles.listItem}>Welcome, {user.email}</li>
              <li className={styles.listItem}>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className={styles.listItem}>
                <Link href="/register">Register</Link>
              </li>
              <li className={styles.listItem}>
                <Link href="/login">Login</Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={styles.item}>
        <div className={styles.cart}>
          <Link href="/cart">
            <Image src="/img/cart.png" alt="" width="30" height="30" />
            <div className={styles.counter}>2</div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
