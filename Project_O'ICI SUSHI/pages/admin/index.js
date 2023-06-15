import React, { useEffect, useState } from "react";
import Link from "next/link";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { auth, isAdmin, firestore } from "../../config/firebase";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "../../styles/Admin.module.css";

const AdminPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const user = auth.currentUser;
      if (!user) {
        // Redirect to login if user is not authenticated
        router.push("/login");
      } else {
        // Check if the user has an admin role
        const userIsAdmin = await isAdmin(user);
        if (!userIsAdmin) {
          // Redirect to login page
          router.push("/login");
        }
      }
    };

    checkUser();
  }, []);

  const [usersCount, setUsersCount] = useState(0);
  const [categoriesCount, setCategoriesCount] = useState(0);
  const [itemsCount, setItemsCount] = useState(0);
  const [ordersCount, setOrdersCount] = useState(0);

  useEffect(() => {
    // Fetch quantity of users from Firestore
    const fetchUsersCount = async () => {
      const usersCollection = collection(firestore, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.size;
      setUsersCount(usersData);
    };

    // Fetch quantity of categories from Firestore
    const fetchCategoriesCount = async () => {
      const categoriesCollection = collection(firestore, "categories");
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesData = categoriesSnapshot.size;
      setCategoriesCount(categoriesData);
    };

    // Fetch quantity of items from Firestore
    const fetchItemsCount = async () => {
      const itemsCollection = collection(firestore, "items");
      const itemsSnapshot = await getDocs(itemsCollection);
      const itemsData = itemsSnapshot.size;
      setItemsCount(itemsData);
    };

    // Fetch quantity of items from Firestore
    const fetchOrdersCount = async () => {
      const ordersCollection = collection(firestore, "orders");
      const ordersSnapshot = await getDocs(ordersCollection);
      const ordersData = ordersSnapshot.size;
      setOrdersCount(ordersData);
    };

    fetchUsersCount();
    fetchItemsCount();
    fetchCategoriesCount();
    fetchOrdersCount();
  }, []);

  return (
    <div className="container">
      <h1>Admin Dashboard</h1>

      <div className="row">
        <div className="col-md-3">
          <Link href="/admin/manage-users" className={styles.cardLink}>
            <div className="card bg-primary text-white">
              <div className="card-body">
                <h2 className="card-title">Users</h2>
                <p className="card-text">Total Users: {usersCount}</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link href="/admin/manage-categories" className={styles.cardLink}>
            <div className="card bg-info text-white">
              <div className="card-body">
                <h2 className="card-title">Categories</h2>
                <p className="card-text">Total Categories: {categoriesCount}</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link href="/admin/manage-items" className={styles.cardLink}>
            <div className="card bg-danger text-white">
              <div className="card-body">
                <h2 className="card-title">Items</h2>
                <p className="card-text">Total Items: {itemsCount}</p>
              </div>
            </div>
          </Link>
        </div>

        <div className="col-md-3">
          <Link href="/admin/manage-orders" className={styles.cardLink}>
            <div className="card bg-warning text-white">
              <div className="card-body">
                <h2 className="card-title">Orders</h2>
                <p className="card-text">Total Orders: {ordersCount}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
