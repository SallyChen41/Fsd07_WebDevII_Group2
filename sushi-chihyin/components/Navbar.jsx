import React, { useContext } from 'react';
import Image from 'next/image';
import styles from '../styles/Navbar.module.css'
import Link from "next/link";
import { cartContext } from '../pages/cartContext';

const Navbar = () => {
  const { cart } = useContext(cartContext);

  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Link href="/">
          <Image src="/img/Logo.png" alt="logo" width={200} height={60} />
        </Link>
      </div>
      <div className={styles.item}>
        <ul className={styles.list}>
          <li className={styles.listItem}>Menu</li>
          <li className={styles.listItem}>Order Online</li>
          <li className={styles.listItem}>Locations</li>
          <li className={styles.listItem}>Conatct</li>
          <li className={styles.listItem}>Reservation</li>
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
