import React, { useState, useEffect } from "react";
import { firestore } from "../../config/firebase";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
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
        // create a collection reference
        const categoriesCollection = collection(firestore, "categories");
        // retrieve all the documents
        const categoriesSnapshot = await getDocs(categoriesCollection);
        // process the categoriesSnapshot.docs array asynchronously
        const categoriesData = await Promise.all(
          categoriesSnapshot.docs.map(async (doc) => {
            const categoryData = {
              id: doc.id,
              ...doc.data(),
            };
            categoryData.hasRelatedItems = await hasRelatedItems(
              categoryData.name
            );
            return categoryData;
          })
        );
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
      // create a collection reference
      const categoriesCollection = collection(firestore, "categories");
      // create a new object, contains the name property
      const newCategory = {
        name: newCategoryName,
      };
      // add a new document
      const docRef = await addDoc(categoriesCollection, newCategory);
      console.log("Category added successfully!");
      setNewCategoryName("");
      // Refresh the categories list after adding a new category
      // create a new document reference
      const newCategoryRef = doc(categoriesCollection, docRef.id);
      // retrieve the document
      const newCategoryDoc = await getDoc(newCategoryRef);
      const newCategoryData = {
        id: newCategoryDoc.id,
        ...newCategoryDoc.data(),
        // check if there are any related items based on the category name
        hasRelatedItems: await hasRelatedItems(newCategoryDoc.data().name),
      };
      setCategories([...categories, newCategoryData]);
    } catch (error) {
      console.log("Error adding category:", error.message);
      setError(error.message);
    } finally {
      setShowModal(false);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      // create a document reference
      const categoryRef = doc(firestore, "categories", categoryId);
      await deleteDoc(categoryRef);
      console.log("Category deleted successfully!");
      // Filter out the deleted category from the categories state
      const updatedCategories = categories.filter(
        (category) => category.id !== categoryId
      );
      setCategories(updatedCategories);
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
          disabled={row.hasRelatedItems}
        >
          Delete
        </button>
      ),
      sortable: false,
    },
  ];

  // check if there are any related items in a collection based on a specific category
  const hasRelatedItems = async (categoryName) => {
    try {
      const itemsCollection = collection(firestore, "items");
      // filter the items based on their "category" field
      const querySnapshot = await getDocs(
        query(itemsCollection, where("category", "==", categoryName))
      );

      return querySnapshot.size > 0;
    } catch (error) {
      console.log("Error checking related items:", error.message);
      setError(error.message);
      return false;
    }
  };

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
