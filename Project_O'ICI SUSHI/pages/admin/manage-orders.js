import React, { useState, useEffect } from "react";
import { firestore } from "../../config/firebase";
import { collection, getDocs, getDoc } from "firebase/firestore";
import DataTable from "react-data-table-component";
import "bootstrap/dist/css/bootstrap.min.css";

const ManageOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersCollection = collection(firestore, "orders");
        const ordersSnapshot = await getDocs(ordersCollection);
        const ordersData = await Promise.all(
          ordersSnapshot.docs.map(async (doc) => {
            const orderData = doc.data();
            const { username } = (
              await getDoc(doc.ref.collection("users").doc(orderData.userId))
            ).data();
            const { itemName } = (
              await getDoc(doc.ref.collection("items").doc(orderData.itemId))
            ).data();

            return {
              id: doc.id,
              username,
              itemName,
              ...orderData,
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
      selector: (row) => row.itemName,
      sortable: true,
    },
    {
      name: "Order Date",
      selector: (row) => row.orderDT,
      sortable: true,
    },
    {
      name: "Amount",
      selector: (row) => row.amount,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Payment Date",
      selector: (row) => row.paymentDT,
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
