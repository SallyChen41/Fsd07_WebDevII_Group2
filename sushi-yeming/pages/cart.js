import React from "react";
import styles from "../styles/Cart.module.css";
import Image from "next/legacy/image";

const cart = () => {
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.trTitle}>
              <th className={styles.trTitleTh}>Product</th>
              <th className={styles.trTitleTh}>Name</th>
              <th className={styles.trTitleTh}>Piece</th>
              <th className={styles.trTitleTh}>Price</th>
              <th className={styles.trTitleTh}>Quantity</th>
              <th className={styles.trTitleTh}>Total</th>
            </tr>
            <tr className={styles.tr}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    src="/img/sashimi1.png"
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                </div>
              </td>
              <td>
                <span className={styles.name}>SALMON NIGIRI</span>
              </td>
              <td>
                <span className={styles.size}>1 Piece</span>
              </td>
              <td>
                <span className={styles.price}>$3.99</span>
              </td>
              <td>
                <span className={styles.quantity}>2</span>
              </td>
              <td>
                <span className={styles.total}>$7.98</span>
              </td>
            </tr>
            <tr className={styles.tr}>
              <td>
                <div className={styles.imgContainer}>
                  <Image
                    src="/img/sashimi1.png"
                    layout="fill"
                    objectFit="cover"
                    alt=""
                  />
                </div>
              </td>
              <td>
                <span className={styles.name}>SALMON NIGIRI</span>
              </td>
              <td>
                <span className={styles.size}>2 Pieces</span>
              </td>
              <td>
                <span className={styles.price}>$5.99</span>
              </td>
              <td>
                <span className={styles.quantity}>2</span>
              </td>
              <td>
                <span className={styles.total}>$11.98</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>$19.96
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>$0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>$19.96
          </div>
          <button className={styles.button}>CHECKOUT NOW!</button>
        </div>
      </div>
    </div>
  );
};

export default cart;
