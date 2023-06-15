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
  // Retrieve cart information from the context
  const { cart, updateItemQuantity, removeItemFromCart } =
    useContext(cartContext);

  // Calculate the total price of items in the cart
  const total = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  // Handle quantity change for an item
  const handleQuantityChange = (itemId, e) => {
    const newQuantity = parseInt(e.target.value);
    updateItemQuantity(itemId, newQuantity);
  };

  // Handle item removal from the cart
  const handleRemoveItem = (itemId) => {
    removeItemFromCart(itemId);
  };

  // State variables for payment options
  const [open, setOpen] = useState(false);
  const [cash, setCash] = useState(false);

  // Payment amount and currency
  const amount = total;
  const currency = "CAD";
  // Payment style
  const style = { layout: "vertical" };

  // Create an order in the Firebase Firestore
  const createOrder = async (orderData) => {
    try {
      // Get the current user ID from the authentication
      const userId = auth.currentUser.uid;
      // Create a reference to the "orders" collection in Firestore
      const orderRef = collection(firestore, "orders");
      // Prepare the new order data with additional fields
      const newOrder = {
        ...orderData,
        userId,
        items: [...cart.items],
        id: "",
        userId: userId,
        paymentTime: new Date().toISOString(),
      };
      // Add the new order to the Firestore collection and get the document reference
      const docRef = await addDoc(orderRef, newOrder);
      // Get the ID of the newly created order document
      const orderId = docRef.id;
      // Create a new object with the order data and the ID
      const orderWithId = { ...newOrder, id: orderId };
      // Log the successful creation of the order
      console.log("Order created with ID:", orderId);
      // Return the ID of the created order
      return orderId;
    } catch (error) {
      // Log and handle any errors that occurred during order creation
      console.error("Error creating order:", error);
      // Return null to indicate an error occurred
      return null;
    }
  };

  // Clear the cart
  const clearCart = () => {
    cart.items.forEach((item) => {
      removeItemFromCart(item.id);
    });
    updateItemQuantity(null, 0);
  };

  // Wrapper component for PayPal buttons
  const ButtonWrapper = ({ currency, showSpinner }) => {
    // Retrieve the state and dispatch function from the PayPalScriptProvider's reducer
    const [{ options, isPending }, dispatch] = usePayPalScriptReducer();
    // Update the options state when the currency or showSpinner value changes
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
        {/* Render the spinner if showSpinner is true and isPending is true */}
        {showSpinner && isPending && <div className="spinner" />}
        {/* Render the PayPal buttons */}
        <PayPalButtons
          style={style} // Style configuration for the PayPal buttons
          disabled={false} // Disable the buttons
          forceReRender={[amount, currency, style]} // Re-render the buttons when these dependencies change
          fundingSource={undefined} // Specify a funding source (optional)
          // Callback function to create the order
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
                return orderId; // Return the created order ID
              });
          }}
          // Callback function when the order is approved
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
              // Get the current user's ID from the authentication
              const userId = auth.currentUser.uid;
              // Create the order in Firebase and obtain the order ID
              createOrder(orderData).then((orderId) => {
                if (orderId) {
                  // Prepare the updated order data object with the obtained order ID, items, user ID, and payment time
                  const updatedOrderData = {
                    ...orderData,
                    id: orderId,
                    items: [...cart.items],
                    userId: userId,
                    paymentTime: new Date().toISOString(),
                  };
                  // Save the updated order data to Firebase using the order ID as the document reference
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
      {/* Left side - Cart items */}
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
      {/* Right side - Cart summary and payment options */}
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>${total.toFixed(2)}
          </div>
          {/* Payment methods section */}
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
            // Checkout button
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
