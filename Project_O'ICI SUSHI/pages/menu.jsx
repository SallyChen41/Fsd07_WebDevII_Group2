import React, { useState, useEffect } from 'react'
import styles from "../styles/Menu.module.css";
import SushiCategory from '../components/SushiCategory';
import SushiCard from '../components/SushiCard';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebase';

const menu = () => {

  const [menuData, setMenuData] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      try {
        const menuCollection = collection(firestore, 'menu');
        const menuSnapshot = await getDocs(menuCollection);
        const menuItems = menuSnapshot.docs.map((doc) => doc.data());
        setMenuData(menuItems);
      } catch (error) {
        console.log('Error fetching menu data:', error.message);
      }
    };

    fetchMenuData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.menuContainer}>
        <div className={styles.menu}>
          <SushiCategory></SushiCategory>
        </div>
      </div>
      {menuData.map((category) => (
        <div key={category.categoryId}>
          <h2>{category.name}</h2>
          <div className={styles.itemCategory}>
            {category.items.map((item) => (
              <SushiCard
                key={item.itemId}
                itemName={item.itemName}
                description={item.description}
                price={item.price}
                image={item.image}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default menu
