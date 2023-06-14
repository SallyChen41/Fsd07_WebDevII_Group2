import React from 'react'
import styles from "../styles/Menu.module.css";
import SushiCategory from '../components/SushiCategory';
import SushiCard from '../components/SushiCard';
import { firestore } from '../config/firebase';

const menu = () => {
  const [sushiList, setSushiList] = useState([]);
  return (
    <div className={styles.container}>
      <div className={styles.menuContainer}>
        <div className={styles.menu}>
          <SushiCategory></SushiCategory>
        </div>
      </div>
      <h2>NIGIRI</h2>
      <div className={styles.itemCategory} id='nigiri'>
        <SushiCard></SushiCard>
        <SushiCard></SushiCard>
        <SushiCard></SushiCard>
      </div>
      <h2>MAKI</h2>
      <div className={styles.itemCategory} id='maki'>
        <SushiCard></SushiCard>
        <SushiCard></SushiCard>
        <SushiCard></SushiCard>
      </div>
      <h2>POKE</h2>
      <div className={styles.itemCategory} id='poke'>
        <SushiCard></SushiCard>
        <SushiCard></SushiCard>
        <SushiCard></SushiCard>
      </div>
      <h2>BENTO</h2>
      <div className={styles.itemCategory} id='sushipizza'>
        <SushiCard></SushiCard>
        <SushiCard></SushiCard>
        <SushiCard></SushiCard>
      </div>
      <h2>SOUP</h2>
      <div className={styles.itemCategory} id='soup'>
        <SushiCard></SushiCard>
        <SushiCard></SushiCard>
        <SushiCard></SushiCard>
      </div>
      <h2>SIDES</h2>
      <div className={styles.itemCategory} id='sides'>
        <SushiCard></SushiCard>
        <SushiCard></SushiCard>
        <SushiCard></SushiCard>
      </div>
      <h2>DRINKS</h2>
      <div className={styles.itemCategory} id='drinks'>
        <SushiCard></SushiCard>
        <SushiCard></SushiCard>
        <SushiCard></SushiCard>
      </div>
    </div>
  )
}

export default menu
