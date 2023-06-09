import React, { useContext, useState,useEffect } from 'react';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css'
import Link from "next/link";
import { cartContext } from '../pages/cartContext';
import { useRouter } from "next/router";
import { auth } from "../config/firebase";

const Navbar = () => {
  const { cart } = useContext(cartContext);
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
        <Link href="/">
          <Image src="/img/Logo.png" alt="logo" width={200} height={60} />
        </Link>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <Link href="/">
            <li className={styles.listItem}>Home</li>
          </Link>
          <Link href="/menu">
            <li className={styles.listItem}>Menu</li>
          </Link>
          <li className={styles.listItem}>Conatct</li>
          <li className={styles.listItem}>Reservation</li>
          <li className={styles.listItem}>My Orders</li>
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
        <Link href="/cart">
          <div className={styles.cart}>
            <Image src="/img/cart.png" alt="cart" width={33} height={30} />
            <div className={styles.counter}>{cart.items.length}</div>
          </div>
        </Link>
      </div>
    </div>
  )
}

export default Navbar
