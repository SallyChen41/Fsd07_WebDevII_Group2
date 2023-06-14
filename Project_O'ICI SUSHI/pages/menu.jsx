import React, { useState, useEffect } from 'react';
import styles from '../styles/Menu.module.css';
import SushiCategory from '../components/SushiCategory';
import SushiCard from '../components/SushiCard';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebase';

const Menu = () => {
  const [menuData, setMenuData] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const itemsCollection = collection(firestore, 'items');
        const categoriesCollection = collection(firestore, 'categories');
    
        const [itemsSnapshot, categoriesSnapshot] = await Promise.all([
          getDocs(itemsCollection),
          getDocs(categoriesCollection),
        ]);
    
        const categoriesMap = categoriesSnapshot.docs.reduce((map, doc) => {
          const category = doc.data();
          map[category.name] = doc.id;
          return map;
        }, {});
    
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
    
        const menuItems = categoriesSnapshot.docs.map((doc) => {
          const category = doc.data();
          const categoryId = doc.id;
          const categoryItems = itemsData.filter(
            (item) => item.category === category.name
          );
          return {
            id: categoryId,
            name: category.name,
            items: categoryItems,
          };
        });
    
        setMenuData(menuItems);
        setCategories(categoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      } catch (error) {
        console.log('Error fetching items and categories:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.menuContainer}>
        <div className={styles.menu}>
          <SushiCategory categories={categories} />
        </div>
      </div>
      {menuData.map((item) => (
        <div key={item.id}>
          <h2>{item.name}</h2>
          <div className={styles.itemCategory}>
            {item.items && item.items.map((menuItem) => (
              <SushiCard
                key={menuItem.id}
                id={menuItem.id}
                itemName={menuItem.itemName}
                description={menuItem.description}
                price={menuItem.price}
                image={menuItem.image}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Menu;