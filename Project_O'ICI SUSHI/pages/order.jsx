import React, { useEffect, useState } from "react";
import styles from "../styles/Order.module.css";
import Image from "next/image";
import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore, auth } from "../config/firebase";

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders when the component mounts
    const fetchOrders = async () => {
      try {
        // Get the current user's ID from authentication
        const userId = auth.currentUser?.uid;
        if (userId) {
          const ordersRef = collection(firestore, "orders");
          // Create a query to fetch orders of the current user
          const userOrdersQuery = query(
            ordersRef,
            where("userId", "==", userId)
          );
          // Retrieve the order documents from Firestore
          const snapshot = await getDocs(userOrdersQuery);
          // Map the document data and update the orders state
          const ordersData = snapshot.docs.map((doc) => doc.data());
          setOrders(ordersData);
        }
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    // Subscribe to changes in the authentication state
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // If a user is logged in, fetch their orders
        fetchOrders();
      } else {
        // If no user is logged in, clear the orders state
        setOrders([]);
      }
    });

    // Unsubscribe from the authentication state changes when the component unmounts
    return unsubscribe;
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tbody>
              {/* Table header */}
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer Full Name</th>
                <th>Address</th>
                <th>Payment Method</th>
                <th>Date and Time</th>
                <th>Order Total</th>
              </tr>
              {/* Render each order */}
              {orders.map((order) => (
                <tr className={styles.tr} key={order.id}>
                  <td>
                    <span className={styles.id}>{order.id}</span>
                  </td>
                  <td>
                    <span className={styles.name}>{order.customer}</span>
                  </td>
                  <td>
                    <span className={styles.address}>{order.address}</span>
                  </td>
                  <td>
                    <span className={styles.address}>{order.method}</span>
                  </td>
                  <td>
                    <span className={styles.address}>
                      {/* Format the paymentTime as a localized date and time string */}
                      {new Date(order.paymentTime).toLocaleString("en-US", {
                        year: "numeric",
                        month: "2-digit",
                        day: "2-digit",
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </td>
                  <td>
                    {order.total ? (
                      <span className={styles.total}>
                        ${order.total.toFixed(2)}
                      </span>
                    ) : (
                      <span className={styles.total}>N/A</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Order;
