import React from "react";
import styles from "../styles/Navbar.module.css";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
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
          <Link href="/">
            <Image src="/img/logo.png" alt="" width="160" height="69" />
          </Link>
          <li className={styles.listItem}>Contact</li>
          <li className={styles.listItem}>Order</li>
        </ul>
      </div>
      <div className={styles.item}>
        <div className={styles.cart}>
          <Link href="/cart">
            <Image src="/img/cart.png" alt="" width="30" height="30" />
          </Link>
          <div className={styles.counter}>4</div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
