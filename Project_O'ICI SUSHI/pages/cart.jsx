import React, { useContext, useState, useEffect } from "react";
import Image from "next/legacy/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import {
  PayPalScriptProvider,
  PayPalButtons,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { auth, firestore, firebase } from "../config/firebase";
import styles from "../styles/Cart.module.css";
import { cartContext } from "./cartContext";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

const Cart = () => {
  const { cart, updateItemQuantity, removeItemFromCart } =
    useContext(cartContext);

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

  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);
  const amount = total;
  const currency = "CAD";
  const style = { layout: "vertical" };

  const createOrder = async (orderData) => {
    try {
      const userId = auth.currentUser.uid;
      const orderRef = collection(firestore, "orders");
      const newOrder = {
        ...orderData,
        userId,
        items: [...cart.items],
        id: "",
        userId: userId,
      };
      const docRef = await addDoc(orderRef, newOrder);
      const orderId = docRef.id;
      const orderWithId = { ...newOrder, id: orderId };
      console.log("Order created with ID:", orderId);
      return orderId;
    } catch (error) {
      console.error("Error creating order:", error);
      return null;
    }
  };

  const clearCart = () => {
    cart.items.forEach((item) => {
      removeItemFromCart(item.id);
    });
    updateItemQuantity(null, 0);
  };

  const ButtonWrapper = ({ currency, showSpinner }) => {
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

    useEffect(() => {
      dispatch({
        type: "resetOptions",
        value: {
          ...options,
          currency: currency,
        },
      });
    }, [currency, showSpinner]);

    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          disabled={false}
          forceReRender={[amount, currency, style]}
          fundingSource={undefined}
          createOrder={(data, actions) => {
            return actions.order
              .create({
                purchase_units: [
                  {
                    amount: {
                      currency_code: currency,
                      value: amount,
                    },
                  },
                ],
              })
              .then((orderId) => {
                return orderId;
              });
          }}
          onApprove={function (data, actions) {
            return actions.order.capture().then(function (details) {
              const shipping = details.purchase_units[0].shipping;
              const orderData = {
                customer: shipping.name.full_name,
                address: shipping.address.address_line_1,
                total: total,
                method: 1,
                id: "",
              };
              const userId = auth.currentUser.uid;
              createOrder(orderData).then((orderId) => {
                if (orderId) {
                  const updatedOrderData = {
                    ...orderData,
                    id: orderId,
                    userId: userId,
                  };
                  setDoc(doc(firestore, "orders", orderId), updatedOrderData)
                    .then(() => {
                      console.log("Order saved to Firebase:", orderId);
                      clearCart();
                    })
                    .catch((error) => {
                      console.error("Error saving order to Firebase:", error);
                    });
                } else {
                  console.error("Failed to create order.");
                }
              });
            });
          }}
        />
      </>
    );
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
                  <span className={styles.extras}>
                    {item.extras.join(", ")}
                  </span>
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
          {open ? (
            <div className={styles.paymentMethods}>
              <button
                className={styles.payButton}
                onClick={() => setCash(true)}
              >
                CASH ON DELIVERY
              </button>
              <PayPalScriptProvider
                options={{
                  "client-id":
                    "Af4eEHK9SLC7TlZ29e9AKCdwtxnk3--ZHZvF6cv--qrvdq5bYKYuxq9bsuVh3w13nTxKpFOLd_5SWlns",
                  components: "buttons",
                  currency: "USD",
                  "disable-funding": "credit,card,p24",
                }}
              >
                <ButtonWrapper currency={currency} showSpinner={false} />
              </PayPalScriptProvider>
            </div>
          ) : (
            <button onClick={() => setOpen(true)} className={styles.button}>
              CHECKOUT NOW!
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
