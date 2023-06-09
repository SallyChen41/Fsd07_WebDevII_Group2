import React from "react";
import styles from "../../styles/Product.module.css";
import Image from "next/legacy/image";
import { useState } from "react";

const Product = () => {
  const [size, setSize] = useState(0);

  const item = {
    id: 1,
    img: "/img/sashimi1.png",
    name: "SALMON NIGIRI",
    price: [3.99, 5.99],
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.",
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={item.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{item.name}</h1>
        <span className={styles.price}>${item.price[size]}</span>
        <p className={styles.desc}>{item.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSize(0)}>
            <Image src="/img/icono-sushi1.png" layout="fill" alt="" />
            <span className={styles.number}>1PC</span>
          </div>
          <div className={styles.size} onClick={() => setSize(1)}>
            <Image src="/img/icono-sushi2.png" layout="fill" alt="" />
            <span className={styles.number}>2PC</span>
          </div>
        </div>
        <div className={styles.add}>
          <input type="number" defaultValue={1} className={styles.quantity} />
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
