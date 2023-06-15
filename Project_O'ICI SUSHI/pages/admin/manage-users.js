import React, { useState, useEffect } from "react";
import { firestore } from "../../config/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import "bootstrap/dist/css/bootstrap.min.css";
import DataTable from "react-data-table-component";
import SearchBar from "../../components/SearchBar";
import Modal from "../../components/Modal";

const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [deletingUser, setDeletingUser] = useState(null);
  const [editingUser, setEditingUser] = useState(null);
  const [editedUserData, setEditedUserData] = useState(null);
  const [searchText, setSearchText] = useState("");

  // fetch users' data from Firestore
  useEffect(() => {
    const getUsers = async () => {
      console.log("Fetching users..."); // Debug statement
      try {
        // create a collection reference
        const usersCollection = collection(firestore, "users");
        // retrieve all the documents
        const usersSnapshot = await getDocs(usersCollection);
        // transform the usersSnapshot into an array of usersData objects
        const usersData = usersSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.log("Error fetching users:", error.message);
        setError(error.message);
        setLoading(false);
      }
    };
    getUsers();
  }, []);

  const handleDeleteUser = async (userId) => {
    try {
      // create a document reference
      const userRef = doc(firestore, "users", userId);
      await deleteDoc(userRef);
      console.log("User deleted successfully!");
      // Refresh the users list after deleting the user
      const usersCollection = collection(firestore, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    } catch (error) {
      console.log("Error deleting user:", error.message);
      setError(error.message);
    } finally {
      setDeletingUser(null);
      setShowModal(false);
    }
  };

  const handleUpdateUser = async (userId) => {
    try {
      // create a document reference
      const userRef = doc(firestore, "users", userId);
      // update the document
      await updateDoc(userRef, editedUserData);
      console.log("User updated successfully!");
      // Refresh the users list after updating the user
      const usersCollection = collection(firestore, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersData);
    } catch (error) {
      console.log("Error updating user:", error.message);
      setError(error.message);
    } finally {
      setEditingUser(null);
      setEditedUserData(null);
      setShowModal(false);
    }
  };

  const openDeleteModal = (userId) => {
    setDeletingUser(userId);
    setShowModal(true);
  };

  const closeDeleteModal = () => {
    setDeletingUser(null);
    setShowModal(false);
  };

  const openEditModal = (user) => {
    setEditingUser(user);
    setEditedUserData(user);
  };

  const closeEditModal = () => {
    setEditingUser(null);
    setEditedUserData(null);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };

  // filter an array of users based on a searchText value
  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchText.toLowerCase())
  );

  // define an array of columns that can be used for displaying data in a table
  const columns = [
    {
      name: "Username",
      selector: (row) => row.username,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Phone Number",
      selector: (row) => row.phoneNum,
      sortable: true,
    },
    {
      name: "Postal Code",
      selector: (row) => row.postalcode,
      sortable: true,
    },
    {
      name: "Address",
      selector: (row) => row.address,
      sortable: true,
    },
    {
      name: "City",
      selector: (row) => row.city,
      sortable: true,
    },
    // {
    //   name: "Role",
    //   selector: (row) => row.role,
    //   sortable: true,
    // },
    {
      name: "Action",
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
      <h1>Manage Users</h1>

      <SearchBar searchText={searchText} onSearchChange={handleSearch} />

      <DataTable
        columns={columns}
        data={filteredUsers}
        pagination
        striped
        highlightOnHover
        responsive
        className="bootstrap-table"
      />

      {showModal && (
        <Modal
          title="Confirm Deletion"
          content="Are you sure you want to delete this user?"
          onConfirm={() => handleDeleteUser(deletingUser)}
          onCancel={closeDeleteModal}
        />
      )}

      {editingUser && (
        <Modal
          title="Edit User"
          content={
            editedUserData && (
              <>
                <div className="mb-3">
                  <label htmlFor="editedUsername" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedUsername"
                    value={editedUserData.username}
                    onChange={(e) =>
                      setEditedUserData({
                        ...editedUserData,
                        username: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedEmail" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="editedEmail"
                    value={editedUserData.email}
                    onChange={(e) =>
                      setEditedUserData({
                        ...editedUserData,
                        email: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedName" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedName"
                    value={editedUserData.name}
                    onChange={(e) =>
                      setEditedUserData({
                        ...editedUserData,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedPhoneNum" className="form-label">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedPhoneNum"
                    value={editedUserData.phoneNum}
                    onChange={(e) =>
                      setEditedUserData({
                        ...editedUserData,
                        phoneNum: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedPostalcode" className="form-label">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedPostalcode"
                    value={editedUserData.postalcode}
                    onChange={(e) =>
                      setEditedUserData({
                        ...editedUserData,
                        postalcode: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedAddress" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedAddress"
                    value={editedUserData.address}
                    onChange={(e) =>
                      setEditedUserData({
                        ...editedUserData,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editedCity" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editedCity"
                    value={editedUserData.city}
                    onChange={(e) =>
                      setEditedUserData({
                        ...editedUserData,
                        city: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Role</label>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="roleCustomer"
                      name="role"
                      value="customer"
                      checked={editedUserData.role === "customer"}
                      onChange={(e) =>
                        setEditedUserData({
                          ...editedUserData,
                          role: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="roleUser" className="form-check-label">
                      User
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      type="radio"
                      className="form-check-input"
                      id="roleAdmin"
                      name="role"
                      value="admin"
                      checked={editedUserData.role === "admin"}
                      onChange={(e) =>
                        setEditedUserData({
                          ...editedUserData,
                          role: e.target.value,
                        })
                      }
                    />
                    <label htmlFor="roleAdmin" className="form-check-label">
                      Admin
                    </label>
                  </div>
                </div>
              </>
            )
          }
          onConfirm={() => handleUpdateUser(editingUser.id)}
          onCancel={closeEditModal}
        />
      )}
    </div>
  );
};

export default ManageUsers;
