import React, { useContext, useState } from 'react';
import styles from '../../styles/Item.module.css';
import Image from 'next/image';
import { cartContext } from '../cartContext';
import Link from 'next/link';

const Item = () => {
  const { addItemToCart } = useContext(cartContext);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);

  const sushi = {
    id: 1,
    img: "/img/toro.PNG",
    name: "TUNA NIGIRI",
    price: 4.99,
  };

  const handleSoySauceChange = (event) => {
    if (event.target.checked) {
      setExtras((prevExtras) => [...prevExtras, "Soy Sauce"]);
    } else {
      setExtras((prevExtras) => prevExtras.filter((extra) => extra !== "Soy Sauce"));
    }
  };

  const handleWasabiChange = (event) => {
    if (event.target.checked) {
      setExtras((prevExtras) => [...prevExtras, "Wasabi"]);
    } else {
      setExtras((prevExtras) => prevExtras.filter((extra) => extra !== "Wasabi"));
    }
  };

  const handleGingerChange = (event) => {
    if (event.target.checked) {
      setExtras((prevExtras) => [...prevExtras, "Ginger"]);
    } else {
      setExtras((prevExtras) => prevExtras.filter((extra) => extra !== "Ginger"));
    }
  };

  const handleAddToCart = () => {
    const selectedSushi = {
      id: sushi.id,
      img: sushi.img,
      name: sushi.name,
      price: sushi.price,
      extras: extras,
      quantity: quantity,
    };
    addItemToCart(selectedSushi);
    setIsItemAdded(true);
    setTimeout(() => setIsItemAdded(false), 1000); // Reset the added item animation after 1 second
  };

  return (
    <div className={styles.container}>
      {isItemAdded && <div className={styles.notification}>Item added to the cart!</div>}
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={sushi.img} width={300} height={300} objectFit="contain" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{sushi.name}</h1>
        <span className={styles.price}>${sushi.price}</span>
        <h3 className={styles.choose}>Optional</h3>
        <div className={styles.ingredients}>
          <div className={styles.option}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="soy-sauce"
              name="soy-sauce"
              onChange={handleSoySauceChange}
            />
            <label htmlFor="soy-sauce">Extra Soy Sauce</label>
          </div>
          <div className={styles.option}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="wasabi"
              name="wasabi"
              onChange={handleWasabiChange}
            />
            <label htmlFor="wasabi">Wasabi</label>
          </div>
          <div className={styles.option}>
            <input
              className={styles.checkbox}
              type="checkbox"
              id="ginger"
              name="ginger"
              onChange={handleGingerChange}
            />
            <label htmlFor="ginger">Ginger</label>
          </div>
        </div>
        <div className={styles.add}>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            className={styles.quantity}
          />
          <button className={styles.button} onClick={handleAddToCart}>
            Add to Cart
          </button>
        </div>
        <div className={styles.backLink}>
          <Link href="/menu">&larr; Back to Menu</Link>
        </div>
      </div>
    </div>
  )
}

export default Item;