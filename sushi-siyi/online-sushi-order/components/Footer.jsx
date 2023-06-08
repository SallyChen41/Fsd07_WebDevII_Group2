import React from "react";
import styles from "../styles/Footer.module.css";
import Image from "next/legacy/image";

const Footer = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <Image src="/img/bg.png" objectFit="cover" layout="fill" alt="" />
      </div>
      <div className={styles.item}>
        <div className={styles.card}>
          <h2 className={styles.motto}>
            HERE WE ARE! <br />
            THE KOI SUSHI LOUNGE, EXPERIENCE THE ART OF SUSHI.
          </h2>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>FIND OUR RESTAURANTS</h1>
          <p className={styles.text}>
            1654 R. Don Road #304.
            <br /> Montreal, A1A1A1
            <br /> (123) 456-7890
          </p>
          <p className={styles.text}>
            2356 K. Laquie Rd #235.
            <br /> Montreal, A2A2A2
            <br /> (123) 456-7890
          </p>
          <p className={styles.text}>
            1614 E. Erwin St #104.
            <br /> Montreal, A3A3A3
            <br /> (123) 456-7890
          </p>
        </div>
        <div className={styles.card}>
          <h1 className={styles.title}>WORKING HOURS</h1>
          <p className={styles.text}>
            MONDAY - FRIDAY
            <br /> 9:00 – 22:00
          </p>
          <p className={styles.text}>
            SATURDAY - SUNDAY
            <br /> 12:00 – 24:00
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
