import React from 'react'
import styles from '../styles/SushiCard.module.css';
import Image from 'next/image';
import Link from "next/link";

const SushiCard = () => {
  return (
    <div className={styles.container}>
      <Link href="/item/1">
        <Image src="/img/nigiri.jpg" alt="" width="350" height="300" />
      </Link>
      <h1 className={styles.title}>SAKE NIGIRI</h1>
      <span className={styles.price}>$5.00</span>
    </div>
  )
}

export default SushiCard
