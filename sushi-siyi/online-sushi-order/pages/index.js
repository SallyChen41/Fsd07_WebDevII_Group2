import Head from "next/head";
import styles from "../styles/Home.module.css";
import Featured from "../components/Featured";
import ProductList from "../components/ProductList";

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sushi Lounge in Montreal</title>
        <meta name="description" content="Best Sushi Lounge in Canada" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Featured />
      <ProductList />
    </div>
  );
}
