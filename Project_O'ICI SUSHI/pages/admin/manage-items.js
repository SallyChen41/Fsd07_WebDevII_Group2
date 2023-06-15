import React, { useState, useEffect } from "react";
import { firestore, storage } from "../../config/firebase";
import {
  collection,
  updateDoc,
  getDoc,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import Modal from "../../components/Modal";
import SearchBar from "../../components/SearchBar";

const ManageItems = () => {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deletingItem, setDeletingItem] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [newItem, setNewItem] = useState({
    itemName: "",
    description: "",
    price: "",
    image: null,
    category: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching items..."); // Debug statement
      try {
        // create a collection reference
        const itemsCollection = collection(firestore, "items");
        const categoriesCollection = collection(firestore, "categories");

        // fetch the snapshots of the documents in those collections
        // use Promise.all() function to execute multiple promises in parallel
        const [itemsSnapshot, categoriesSnapshot] = await Promise.all([
          getDocs(itemsCollection),
          getDocs(categoriesCollection),
        ]);

        // map category document IDs to their respective category names
        const categoriesMap = categoriesSnapshot.docs.reduce((map, doc) => {
          //  extract the category data and assign it to the category variable
          const category = doc.data();
          // mapping is done by assigning the category.name value to the map[doc.id] property
          map[category.name] = doc.id;
          return map;
        }, {});

        // map over the itemsSnapshot.docs array and retrieve the data for each item
        const itemsData = itemsSnapshot.docs.map((doc) => {
          const itemData = doc.data();
          // look up the corresponding category ID
          const categoryId = categoriesMap[itemData.category];
          if (categoryId === undefined) {
            throw new Error(
              `Category ID not found for category: ${itemData.category}`
            );
          }
          return {
            id: doc.id,
            ...itemData,
            category: itemData.category,
          };
        });

        setItems(itemsData);
        // map over the categoriesSnapshot.docs array to create an array of objects
        setCategories(
          categoriesSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
        );
        setLoading(false);
      } catch (error) {
        console.log("Error fetching items and categories:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleAddItem = async () => {
    try {
      // create a collection reference
      const itemsCollection = collection(firestore, "items");
      // add a new document to the itemsCollection
      const newItemRef = await addDoc(itemsCollection, {
        itemName: newItem.itemName,
        description: newItem.description,
        price: newItem.price,
        category: newItem.category,
      });

      if (newItem.image) {
        // Upload image to Firebase Storage
        // create a storage reference
        const storageRef = ref(storage, `items/${newItem.image.name}`);
        // upload the bytes of the newItem.image file to the storageRef
        await uploadBytes(storageRef, newItem.image);
        // retrieve the download URL
        const downloadURL = await getDownloadURL(storageRef);
        console.log(downloadURL);

        // Update the item with the image URL
        // find the category object with the matching ID in the categories array.
        const category = categories.find((cat) => cat.id === newItem.category);
        await updateDoc(
          newItemRef,
          { image: downloadURL, category: category ? category.name : "" },
          { merge: true }
        );
      }

      console.log("Item added successfully!");
      // reset the new item
      setNewItem({
        itemName: "",
        description: "",
        price: "",
        image: null,
        category: "",
      });
      // Refresh the items list after adding a new item
      const itemsSnapshot = await getDocs(itemsCollection);
      const itemsData = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsData);
    } catch (error) {
      console.log("Error adding item:", error.message);
      setError(error.message);
    } finally {
      setShowModal(false);
    }
  };

  const handleDeleteItem = async (itemId) => {
    try {
      // create a document reference
      const itemRef = doc(firestore, "items", itemId);
      await deleteDoc(itemRef);
      console.log("Item deleted successfully!");
      // Refresh the items list after deleting the item
      const itemsCollection = collection(firestore, "items");
      const itemsSnapshot = await getDocs(itemsCollection);
      const itemsData = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsData);
    } catch (error) {
      console.log("Error deleting item:", error.message);
      setError(error.message);
    } finally {
      setDeletingItem(null);
      setShowModal(false);
    }
  };

  const handleUpdateItem = async (itemId) => {
    try {
      // create a document reference
      const itemRef = doc(firestore, "items", itemId);
      // Find the category object with the matching ID in the categories array
      const category = categories.find(
        (cat) => cat.id === editingItem.category
      );
      const categoryName = category ? category.name : "";
      await updateDoc(itemRef, {
        itemName: editingItem.itemName,
        description: editingItem.description,
        price: editingItem.price,
        category: categoryName,
      });

      console.log("Item updated successfully!");

      // Refresh the items list after updating the item
      const itemsCollection = collection(firestore, "items");
      const itemsSnapshot = await getDocs(itemsCollection);
      const itemsData = itemsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setItems(itemsData);
    } catch (error) {
      console.log("Error updating item:", error.message);
      setError(error.message);
    } finally {
      setEditingItem(null);
      setShowModal(false);
    }
  };

  const openEditModal = (item) => {
    // Find the category ID based on the category name of the item
    const category = categories.find((cat) => cat.name === item.category);
    const categoryId = category ? category.id : "";
    setEditingItem({ ...item, category: categoryId });
    setEditMode(true);
    setShowModal(true);
  };

  const closeEditModal = () => {
    // setEditingItem(null);
    setEditMode(false);
    setShowModal(false);
  };

  const openDeleteModal = (itemId) => {
    setDeletingItem(itemId);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setDeletingItem(null);
    setShowModal(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setNewItem((prevItem) => ({
      ...prevItem,
      image: file,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  const handleEditInputChange = (e) => {
    const categoryId = e.target.value;
    setEditingItem({
      ...editingItem,
      category: categoryId,
    });
    setEditMode(true);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  // filter an array of items based on a searchText value
  const filteredItems = items.filter((item) =>
    item.itemName.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns = [
    {
      name: "Item Name",
      selector: (row) => row.itemName,
      sortable: true,
    },
    {
      name: "Description",
      selector: (row) => row.description,
      sortable: false,
    },
    {
      name: "Price",
      selector: (row) => `$${row.price}`,
      sortable: true,
    },
    {
      name: "Category",
      selector: (row) => row.category,
      sortable: true,
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={row.image}
          alt={row.itemName}
          style={{ width: "100px", height: "100px" }}
        />
      ),
      sortable: false,
    },
    {
      name: "Actions",
      cell: (row) => (
        <>
          <button
            className="btn btn-primary"
            onClick={() => openEditModal(row)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => openDeleteModal(row.id)}
          >
            Delete
          </button>
        </>
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
      <h1>Manage Items</h1>
      <SearchBar searchText={searchText} onSearchChange={handleSearch} />

      <DataTable
        columns={columns}
        data={filteredItems}
        pagination
        striped
        highlightOnHover
        responsive
        className="bootstrap-table"
      />

      <div className="mt-3">
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add Item
        </button>
      </div>

      {showModal && deletingItem === null && !editMode && (
        <Modal
          title="Add Item"
          content={
            <div>
              <div className="mb-3">
                <label className="form-label">Item Name</label>
                <input
                  type="text"
                  name="itemName"
                  value={newItem.itemName}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <input
                  type="text"
                  name="description"
                  value={newItem.description}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price($)</label>
                <input
                  type="text"
                  name="price"
                  value={newItem.price}
                  onChange={handleInputChange}
                  className="form-control"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  name="category"
                  value={newItem.category}
                  onChange={handleInputChange}
                  className="form-select"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Image</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="form-control"
                />
              </div>
            </div>
          }
          onConfirm={handleAddItem}
          onCancel={closeDeleteModal}
        />
      )}

      {showModal && deletingItem === null && editMode && (
        <Modal
          title="Edit Item"
          onConfirm={() => handleUpdateItem(editingItem.id)}
          onCancel={closeEditModal}
          content={
            <div>
              <div className="mb-3">
                <label htmlFor="editedItemName" className="form-label">
                  Item Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editedItemName"
                  value={editingItem.itemName}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      itemName: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editedDescription" className="form-label">
                  Description
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editedDescription"
                  value={editingItem.description}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editedPrice" className="form-label">
                  Price
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="editedPrice"
                  value={editingItem.price}
                  onChange={(e) =>
                    setEditingItem({
                      ...editingItem,
                      price: e.target.value,
                    })
                  }
                />
              </div>
              <div className="mb-3">
                <label htmlFor="editedCategory" className="form-label">
                  Category
                </label>
                <select
                  id="editedCategory"
                  name="category"
                  value={editingItem.category}
                  onChange={handleEditInputChange}
                  className="form-select"
                >
                  <option value="">Select Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          }
        />
      )}

      {deletingItem !== null && (
        <Modal
          title="Delete Item"
          content="Are you sure you want to delete this item?"
          onConfirm={() => handleDeleteItem(deletingItem)}
          onCancel={closeDeleteModal}
        />
      )}
    </div>
  );
};

export default ManageItems;
