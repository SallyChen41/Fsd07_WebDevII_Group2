import React from 'react'
import styles from '../styles/SushiCard.module.css';
import Image from 'next/image';

const SushiCard = () => {
  return (
    <div className={styles.container}>
      <Image src="/img/nigiri.jpg" alt="" width="350" height="300" />
      <h1 className={styles.title}>SAKE NIGIRI</h1>
      <span className={styles.price}>$5.00</span>
      {/* <p className={styles.desc}>
        Salmon
      </p> */}
    </div>
  )
}

export default SushiCard
