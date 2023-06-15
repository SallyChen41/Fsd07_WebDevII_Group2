import React, { useState, useEffect } from 'react';
import styles from '../styles/Menu.module.css';
import SushiCategory from '../components/SushiCategory';
import SushiCard from '../components/SushiCard';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../config/firebase';

const Menu = () => {
  // State to store menu data
  const [menuData, setMenuData] = useState([]);
  // State to store categories
  const [categories, setCategories] = useState([]); 

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

        // Update the menu data state
        setMenuData(menuItems); 
        // Update the categories state
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
          <SushiCategory categories={categories} /> {/* Render sushi categories */}
        </div>
      </div>
      {menuData.length > 0 ? (
        menuData.map((item) => (
          <div key={item.id} id={item.name}>
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
                /> // Render sushi cards for each menu item
              ))}
            </div>
          </div>
        ))
      ) : (
        // Render message if no menu items available
        <div>No menu items available</div> 
      )}
    </div>
  )
}

export default Menu