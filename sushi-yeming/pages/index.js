import styles from "../styles/Home.module.css";
import Head from "next/head";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";

const HomePage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sushi Website - Home</title>
        <meta name="description" content="My Sushi Website" />

        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <ProductList />
    </div>
  );
};

export default HomePage;
