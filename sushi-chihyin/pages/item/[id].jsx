import React from 'react'
import styles from "../../styles/Item.module.css";
import Image from "next/legacy/image";
import { useState } from "react";


const Item = () => {

  const [size, setSize] = useState(0);
  const sushi = {
    id: 1,
    img: "/img/tuna_nigiri.jpg",
    name: "NIGIRI",
    price: [3.9, 3.9, 4.9],
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={sushi.img} objectFit="contain" layout="fill" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{sushi.name}</h1>
        <span className={styles.price}>${sushi.price[size]}</span>
        <h3 className={styles.choose}>Choose the fish</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSize(0)}>
            {/* <Image src="/img/size.png" layout="fill" alt="" /> */}
            <span className={styles.number}>TUNA</span>
          </div>
          <div className={styles.size} onClick={() => setSize(1)}>
            {/* <Image src="/img/size.png" layout="fill" alt="" /> */}
            <span className={styles.number}>SALMON</span>
          </div>
          <div className={styles.size} onClick={() => setSize(2)}>
            {/* <Image src="/img/size.png" layout="fill" alt="" /> */}
            <span className={styles.number}>OTHERS</span>
          </div>
        </div>
        <br />
        <h3 className={styles.choose}>Additional</h3>
        <div className={styles.ingredients}>
          <div className={styles.option}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="soy-sauce"
              name="soy-sauce"
            />
            <label htmlFor="soy-sauce">Extra Soy Sauce</label>
          </div>
          <div className={styles.option}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="wasabi"
              name="wasabi"
            />
            <label htmlFor="wasabi">Wasabi</label>
          </div>
          <div className={styles.option}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="ginger"
              name="ginger"
            />
            <label htmlFor="ginger">Ginger</label>
          </div>
        </div>
        <div className={styles.add}>
          <input type="number" defaultValue={1} className={styles.quantity} />
          <button className={styles.button}>Add to Cart</button>
        </div>
      </div>
    </div>
  )
}

export default Item
