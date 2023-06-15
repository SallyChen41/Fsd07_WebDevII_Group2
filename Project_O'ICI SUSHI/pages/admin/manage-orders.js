import React, { useState, useEffect } from "react";
import { firestore } from "../../config/firebase";
import { collection, getDocs, getDoc, doc } from "firebase/firestore";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // create a collection reference
        const ordersCollection = collection(firestore, "orders");
        // retrieve all the documents
        const ordersSnapshot = await getDocs(ordersCollection);
        // use await Promise.all() asynchronously execute multiple promises in parallel
        const ordersData = await Promise.all(
          ordersSnapshot.docs.map(async (orderDoc) => {
            const orderData = orderDoc.data();
            const userDataRef = doc(firestore, "users", orderData.userId);
            const userData = await getDoc(userDataRef);
            const username = userData.data().username;

            // Retrieve items as an array of objects
            const items = Array.isArray(orderData.items)
              ? [...orderData.items]
              : [];

            return {
              id: orderDoc.id,
              username: username,
              total: orderData.total,
              items: items,
              paymentTime: new Date(orderData.paymentTime).toLocaleString(),
              // ...orderData,
            };
          })
        );

        setOrders(ordersData);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching orders:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const columns = [
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Item Name",
      selector: (row) => row.items.map((item) => item.name).join(", "),
      sortable: true,
    },
    {
      name: "Total Amount",
      selector: (row) => `$${row.total}`,
      sortable: true,
    },
    {
      name: "Payment Date",
      selector: (row) => row.paymentTime,
      sortable: true,
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container">
      <h1>Manage Orders</h1>
      <DataTable
        columns={columns}
        data={orders}
        pagination
        striped
        highlightOnHover
        responsive
        className="bootstrap-table"
      />
    </div>
  );
};

export default ManageOrders;
