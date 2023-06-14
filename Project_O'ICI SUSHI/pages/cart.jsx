import React, { useContext } from 'react';
import styles from '../styles/Cart.module.css';
import Image from 'next/legacy/image';
import { cartContext } from './cartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const { cart, updateItemQuantity, removeItemFromCart } = useContext(cartContext);

  const total = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleQuantityChange = (itemId, e) => {
    const newQuantity = parseInt(e.target.value);
    updateItemQuantity(itemId, newQuantity);
  };

  const handleRemoveItem = (itemId) => {
    removeItemFromCart(itemId);
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <table className={styles.table}>
          <tbody>
            {cart.items.map((item) => (
              <tr key={item.id} className={styles.tr}>
                <td>
                  <div className={styles.imgContainer}>
                    <Image
                      src={item.img}
                      layout="fill"
                      objectFit="cover"
                      alt=""
                    />
                  </div>
                </td>
                <td>
                  <span className={styles.name}>{item.name}</span>
                </td>
                <td>
                  <span className={styles.extras}>{item.extras.join(', ')}</span>
                </td>
                <td>
                  <span className={styles.price}>${item.price}</span>
                </td>
                <td>
                  <input
                    type="number"
                    min="1"
                    className={styles.quantityInput}
                    value={item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, e)}
                  />
                </td>
                <td>
                  <span className={styles.total}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </td>
                <td>
                <button
                    className={styles.deleteButton}
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${total.toFixed(2)}
          </div>
          <button className={styles.button}>CHECKOUT</button>
        </div>
      </div>
    </div>
  )
}

export default Cart;