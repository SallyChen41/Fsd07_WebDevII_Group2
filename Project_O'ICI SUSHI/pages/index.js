import styles from '../styles/Home.module.css'
import Head from "next/head";
import Features from '../components/Features';
import SushiList from '../components/SushiList';
import SushiCategory from '../components/SushiCategory';


export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>O'ICI SUSHI</title>
        <meta name="description" content="Best sushi restaurant in MTL" />
        <link rel="icon" href="/sushii.ico" />
      </Head>
      <Features></Features>
      <SushiCategory></SushiCategory>
      <SushiList></SushiList>
    </div>
  );
}