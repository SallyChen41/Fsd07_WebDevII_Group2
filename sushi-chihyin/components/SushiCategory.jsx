import React from 'react'
import styles from '../styles/SushiCatogory.module.css';
import Image from 'next/image';
import { useRouter } from 'next/router';

const SushiCategory = () => {
  const router = useRouter();

  const handleClick = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.link} onClick={() => handleClick('nigiri')}>
        <div className={styles.imageContainer}>
          <Image src="/img/nigiri.svg" alt="nigiri" width="50" height="50" />
          <span className={styles.imageText}>NIGIRI</span>
        </div>
      </div>
      <div className={styles.link} onClick={() => handleClick('maki')}>
        <div className={styles.imageContainer}>
          <Image src="/img/maki.svg" alt="maki" width="50" height="50" />
          <span className={styles.imageText}>MAKI</span>
        </div>
      </div>
      <div className={styles.link} onClick={() => handleClick('poke')}>
        <div className={styles.imageContainer}>
          <Image src="/img/poke.png" alt="poke" width="50" height="50" />
          <span className={styles.imageText}>POKE</span>
        </div>
      </div>
      <div className={styles.link} onClick={() => handleClick('bento')}>
        <div className={styles.imageContainer}>
          <Image src="/img/Bento.png" alt="bento" width="50" height="50" />
          <span className={styles.imageText}>BENTO</span>
        </div>
      </div>
      <div className={styles.link} onClick={() => handleClick('soup')}>
        <div className={styles.imageContainer}>
          <Image src="/img/noodles.svg" alt="soup" width="50" height="50" />
          <span className={styles.imageText}>SOUP</span>
        </div>
      </div>
      <div className={styles.link} onClick={() => handleClick('sides')}>
        <div className={styles.imageContainer}>
          <Image src="/img/sides.svg" alt="sides" width="50" height="50" />
          <span className={styles.imageText}>SIDES</span>
        </div>
      </div>
      <div className={styles.link} onClick={() => handleClick('drinks')}>
        <div className={styles.imageContainer}>
          <Image src="/img/drinks.svg" alt="drinks" width="50" height="50" />
          <span className={styles.imageText}>DRINKS</span>
        </div>
      </div>
    </div>
  )
}

export default SushiCategory
