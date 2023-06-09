import React, { useContext, useState } from 'react';
import styles from '../../styles/Item.module.css';
import Image from 'next/image';
import { cartContext } from '../cartContext';
import Link from 'next/link';

const Item = () => {
  const { addItemToCart } = useContext(cartContext);
  const [selectedFish, setSelectedFish] = useState(0);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);

  const sushi = {
    id: 1,
    img: ['/img/toro.PNG', '/img/sake.PNG', '/img/ebi.PNG'],
    name: ['TUNA NIGIRI', 'SALMON NIGIRI', 'SHRIMP NIGIRI'],
    price: [4.99, 4.99, 3.99],
  };

  const handleFishChange = (event) => {
    setSelectedFish(Number(event.target.value));
  };

  const handleExtrasChange = (event) => {
    const selectedExtras = Array.from(event.target.options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setExtras(selectedExtras);
  };

  const handleAddToCart = () => {
    const selectedSushi = {
      id: sushi.id,
      img: sushi.img[selectedFish],
      name: sushi.name[selectedFish],
      price: sushi.price[selectedFish],
      extras: extras,
      quantity: quantity,
    };
    addItemToCart(selectedSushi);
    setIsItemAdded(true);
    setTimeout(() => setIsItemAdded(false), 1000); // Reset the added item animation after 1 second
  };

  return (
    <div className={styles.container}>
      {isItemAdded && <div className={styles.notification}>Item added!</div>}
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={sushi.img[selectedFish]} width={300} height={300} objectFit="contain" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{sushi.name[selectedFish]}</h1>
        <span className={styles.price}>${sushi.price[selectedFish]}</span>
        <h3 className={styles.choose}>Find your taste</h3>
        <div className={styles.fish}>
          <div className={styles.option}>
            <input
              type="radio"
              id="tuna"
              name="fish"
              value={0}
              checked={selectedFish === 0}
              onChange={handleFishChange}
            />
            <label htmlFor="tuna">TUNA</label>
          </div>
          <div className={styles.option}>
            <input
              type="radio"
              id="salmon"
              name="fish"
              value={1}
              checked={selectedFish === 1}
              onChange={handleFishChange}
            />
            <label htmlFor="salmon">SALMON</label>
          </div>
          <div className={styles.option}>
            <input
              type="radio"
              id="shrimp"
              name="fish"
              value={2}
              checked={selectedFish === 2}
              onChange={handleFishChange}
            />
            <label htmlFor="shrimp">SHRIMP</label>
          </div>
        </div>
        <h3 className={styles.choose}>Optional</h3>
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