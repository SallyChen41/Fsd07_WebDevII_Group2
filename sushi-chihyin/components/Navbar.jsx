import React from 'react'
import Image from 'next/image';
import styles from '../styles/Navbar.module.css'
import Link from "next/link";

const Navbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Link href="/">
          <Image src="/img/Logo.png" alt="logo" width={200} height={60} />
        </Link>
        {/* <div className={styles.callButton}>
          <Image src="/img/phone.png" alt="phone" width={30} height={30}></Image>
        </div> */}
        {/* <div className={styles.texts}>
          <div className={styles.text}>ORDER NOW!</div>
          <div className={styles.text}>000-123-4567</div>
        </div> */}
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
        <div className={styles.cart}>
        <Image src='/img/cart.png' alt='cart' width={33} height={30}></Image>
        <div className={styles.counter}>2</div>
        </div>
      </div>
    </div>
  )
}

export default Navbar
