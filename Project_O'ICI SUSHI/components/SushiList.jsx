import React from 'react'
import styles from '../styles/SushiList.module.css';
import SushiCard from './SushiCard';
import Image from 'next/image';

const SushiList = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>THE MOST AUTHENTIC SUSHI IN MTL</h1>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut blandit arcu
        in pretium molestie. Interdum et malesuada fames acme. Lorem ipsum dolor
        sit amet, consectetur adipiscing elit.
      </p>

      <div className={styles.wrapper}>

      </div>
    </div>
  )
}

export default SushiList
