import React, { useContext, useState, useEffect } from 'react';
import styles from '../../styles/Item.module.css';
import Image from 'next/image';
import { cartContext } from '../cartContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../config/firebase';

const Item = () => {
  const { addItemToCart } = useContext(cartContext);
  const [isItemAdded, setIsItemAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [extras, setExtras] = useState([]);

  const router = useRouter();
  const { id } = router.query;
  const [sushi, setSushi] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsCollection = collection(firestore, 'items');
        const categoriesCollection = collection(firestore, 'categories');

        // Fetch items and categories from Firestore
        const [itemsSnapshot, categoriesSnapshot] = await Promise.all([
          getDocs(itemsCollection),
          getDocs(categoriesCollection),
        ]);
  
        // Create a map of category names to category IDs
        const categoriesMap = categoriesSnapshot.docs.reduce((map, doc) => {
          const category = doc.data();
          map[category.name] = doc.id;
          return map;
        }, {});
  
        // Process items data and categorize them by category
        const itemsData = itemsSnapshot.docs.map((doc) => {
          const itemData = doc.data();
          const categoryId = categoriesMap[itemData.category];
          if (categoryId === undefined) {
            throw new Error(`Category ID not found for category: ${itemData.category}`);
          }
          return {
            id: doc.id,
            ...itemData,
            category: itemData.category,
          };
        });
  
        // Create an array of menu items with their respective categories and items
        const menuItems = categoriesSnapshot.docs.map((doc) => {
          const category = doc.data();
          const categoryId = doc.id;
          const categoryItems = itemsData.filter((item) => item.category === category.name);
          return {
            id: categoryId,
            name: category.name,
            items: categoryItems,
          };
        });
  
        // Find the specific sushi item based on the id
        const sushiItem = itemsData.find((item) => item.id === id);
        setSushi(sushiItem);
      } catch (error) {
        console.log('Error fetching items and categories:', error.message);
      }
    };
  
    fetchData();
  }, [id]);

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
    // Create an object representing the selected sushi item with its details
    const selectedSushi = {
      id: sushi.id,
      img: sushi.image,
      name: sushi.itemName,
      price: sushi.price,
      extras: extras,
      quantity: quantity,
    };
    // Add the selected sushi item to the cart
    addItemToCart(selectedSushi);
    // Set the item added state to show a notification
    setIsItemAdded(true);
    setTimeout(() => setIsItemAdded(false), 1000); // Reset the added item animation after 1 second
  };

  // Render loading state or error message if sushi is null
  if (sushi === null) {
    return <div>Loading...</div>; // Or display an error message
  }

  return (
    <div className={styles.container}>
      {isItemAdded && <div className={styles.notification}>Item added to the cart!</div>}
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <Image src={sushi.image} width={300} height={300} objectFit="contain" alt="" />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{sushi.itemName}</h1>
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