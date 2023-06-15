import React, { useContext, useState, useEffect } from "react";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import Link from "next/link";
import { cartContext } from "../pages/cartContext";
import { useRouter } from "next/router";
import { auth, isAdmin } from "../config/firebase";

const Navbar = () => {
  const { cart, logout } = useContext(cartContext);
  // State to hold the current user
  const [contactClicked, setContactClicked] = useState(false);
  const [user, setUser] = useState(null);
  const [isAdminUser, setIsAdminUser] = useState(false);

  const router = useRouter();

  useEffect(() => {
    // Effect hook to listen for changes in the authentication state

    const unsubscribe = auth.onAuthStateChanged(async (currentUser) => {
      console.log("onAuthStateChanged - currentUser:", currentUser); // Debug statement

      if (currentUser) {
        setUser(currentUser); // Set the user state if a user is logged in

        const userIsAdmin = await isAdmin(currentUser); // Check if the user is admin
        setIsAdminUser(userIsAdmin); // Set the isAdminUser state accordingly
      } else {
        setUser(null); // Set the user state to null if no user is logged in
        setIsAdminUser(false); // Reset the isAdminUser state
      }
    });
    // Clean up the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (contactClicked) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [contactClicked]);

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign out the user using the authentication service

      logout(); // Call the logout function from the cart context

      router.push("/"); // Redirect to the home page after successful logout
    } catch (error) {
      console.log("Logout error:", error.message);
    }
  };
  
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Link href="/">
          <Image src="/img/logo.png" alt="logo" width={200} height={85} />
        </Link>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/" className={styles.linkText}>
            <li className={styles.listItem}>Home</li>
          </Link>
          <Link href="/menu" className={styles.linkText}>
            <li className={styles.listItem}>Menu</li>
          </Link>
          <li
            className={`${styles.listItem} ${styles.pointer}`}
            onClick={() => setContactClicked(true)}
          >
            Contact
          </li>
          <Link href="/order" className={styles.linkText}>
            <li className={styles.listItem}>My Orders</li>
          </Link>
          {isAdminUser && ( // Render the admin link only if the user is an admin
            <Link href="/admin" className={styles.linkText}>
              <li className={styles.listItem}>Admin Dashboard</li>
            </Link>
          )}
          {user ? (
            <>
              <li className={styles.listItem}>Welcome, {user.email}</li>

              <li className={styles.listItem}>
                <button onClick={handleLogout} className={styles.button}>
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={styles.listItem}>
                <Link href="/register" className={styles.linkText}>
                  Register
                </Link>
              </li>

              <li className={styles.listItem}>
                <Link href="/login" className={styles.linkText}>
                  Login
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
      <div className={styles.item}>
        <Link href="/cart" className={styles.linkText}>
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="cart" width={33} height={30} />
            <div className={styles.counter}>{cart.items.length}</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
