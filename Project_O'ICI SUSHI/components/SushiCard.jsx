import React from 'react';
import styles from '../styles/SushiCard.module.css';
import Image from 'next/image';
import Link from 'next/link';

const SushiCard = ({ id, itemName, description, price, image }) => {
  return (
    <div className={styles.container}>
      {/* retrieve [id].jsx page */}
      <Link href={`/item/${id}`}>
        <a>
          <Image src={image} alt={itemName} width={200} height={200} />
        </a>
        <h1 className={styles.title}>{itemName}</h1>
        <span className={styles.price}>${price}</span>
      </Link>
    </div>
  )
}

export default SushiCard