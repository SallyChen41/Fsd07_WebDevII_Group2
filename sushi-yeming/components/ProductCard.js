import React from "react";
import styles from "../styles/ProductCard.module.css";
import Image from "next/image";
import Link from "next/link";

const ProductCard = () => {
  return (
    <div className={styles.container}>
      <Link href="/product/1">
        <Image src="/img/sashimi1.png" alt="" width={300} height={300} />
      </Link>
      <h1 className={styles.title}>SALMON NIGIRI</h1>
      <span className={styles.price}>$6.99</span>
      <p className={styles.desc}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </p>
    </div>
  );
};

export default ProductCard;
