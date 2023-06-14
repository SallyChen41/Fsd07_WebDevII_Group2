import React, { useState, useEffect } from "react";
import { firestore } from "../../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import Modal from "../../components/Modal";

const ManageCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [newCategoryName, setNewCategoryName] = useState("");

  useEffect(() => {
    const getCategories = async () => {
      console.log("Fetching categories..."); // Debug statement
      try {
        const categoriesCollection = collection(firestore, "categories");
        const categoriesSnapshot = await getDocs(categoriesCollection);
        const categoriesData = categoriesSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCategories(categoriesData);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching categories:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    getCategories();
  }, []);

  const handleAddCategory = async () => {
    try {
      const categoriesCollection = collection(firestore, "categories");
      const newCategory = {
        name: newCategoryName,
      };
      await addDoc(categoriesCollection, newCategory);
      console.log("Category added successfully!");
      setNewCategoryName("");
      // Refresh the categories list after adding a new category
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesData = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesData);
    } catch (error) {
      console.log("Error adding category:", error.message);
      setError(error.message);
    } finally {
      setShowModal(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const categoryRef = doc(firestore, "categories", categoryId);
      await deleteDoc(categoryRef);
      console.log("Category deleted successfully!");
      // Refresh the categories list after deleting the category
      const categoriesCollection = collection(firestore, "categories");
      const categoriesSnapshot = await getDocs(categoriesCollection);
      const categoriesData = categoriesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(categoriesData);
    } catch (error) {
      console.log("Error deleting category:", error.message);
      setError(error.message);
    } finally {
      setDeletingCategory(null);
      setShowModal(false);
    }
  };

  const openDeleteModal = (categoryId) => {
    setDeletingCategory(categoryId);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setDeletingCategory(null);
    setShowModal(false);
  };

  const columns = [
    { name: "Name", selector: (row) => row.name, sortable: true },
    {
      name: "Actions",
      cell: (row) => (
        <button
          className="btn btn-danger"
          onClick={() => openDeleteModal(row.id)}
        >
          Delete
        </button>
      ),
      sortable: false,
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
      <h1>Manage Categories</h1>

      <DataTable
        columns={columns}
        data={categories}
        pagination
        striped
        highlightOnHover
        responsive
        className="bootstrap-table"
      />

      <div className="mt-3">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Category
        </button>
      </div>

      {showModal && deletingCategory === null && (
        <Modal
          title="Add Category"
          content={
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="form-control"
              placeholder="Category Name"
            />
          }
          onConfirm={handleAddCategory}
          onCancel={closeDeleteModal}
        />
      )}

      {deletingCategory && (
        <Modal
          title="Delete Category"
          content="Are you sure you want to delete this category?"
          onConfirm={() => handleDeleteCategory(deletingCategory)}
          onCancel={closeDeleteModal}
        />
      )}
    </div>
  );
};

export default ManageCategories;
