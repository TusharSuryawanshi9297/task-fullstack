import React, { useContext } from "react";
import useFetch from "../hooks/useFetch";
import useForm from "../hooks/useForm";
import useSort from "../hooks/useSort";
import { AuthContext } from "../contexts/AuthContext";
import { addUser } from "../services/userService";
import { addStore, updateStore } from "../services/storeService";

const AdminDashboard = () => {
  const { token, logout } = useContext(AuthContext);

  // Fetch users and stores
  const {
    data: users,
    setData: setUsers,
    loading: usersLoading,
    error: usersError,
  } = useFetch("/admin/users", token);
  const {
    data: stores,
    setData: setStores,
    loading: storesLoading,
    error: storesError,
  } = useFetch("/admin/stores", token);

  // --- Add these lines to normalize data ---
  const normalizedUsers = Array.isArray(users) ? users : users?.items || [];
  const normalizedStores = Array.isArray(stores) ? stores : stores?.items || [];

  // Sorting hooks
  // const {
  //   data: sortedUsers,
  //   sortBy: sortUsers,
  //   sortConfig: userSortConfig,
  // } = useSort(users);
  // const {
  //   data: sortedStores,
  //   sortBy: sortStores,
  //   sortConfig: storeSortConfig,
  // } = useSort(stores);

  const {
    data: sortedUsers,
    sortBy: sortUsers,
    sortConfig: userSortConfig,
  } = useSort(normalizedUsers);

  const {
    data: sortedStores,
    sortBy: sortStores,
    sortConfig: storeSortConfig,
  } = useSort(normalizedStores);

  // Form hooks
  const userForm = useForm({
    name: "",
    email: "",
    password: "",
    address: "",
    role: "user",
  });
  const storeForm = useForm({ name: "", email: "", address: "", ownerId: "" });

  // Fetch store owners
  const { data: fetchedOwners } = useFetch(
    "/admin/users?role=store_owner",
    token
  );
  // const storeOwners = Array.isArray(fetchedOwners) ? fetchedOwners : [];
  const storeOwners = Array.isArray(fetchedOwners)
    ? fetchedOwners
    : fetchedOwners?.items || [];

  // Add user
  // const handleAddUser = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await addUser(userForm.values, token);
  //     setUsers((prev) => [...prev, res.data]);
  //     userForm.resetForm();
  //     alert("User added successfully!");
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Failed to add user");
  //   }
  // };
  const handleAddUser = async (e) => {
    e.preventDefault();

    try {
      // Ensure role is always sent
      const payload = {
        ...userForm.values,
        role: userForm.values.role || "user",
      };

      console.log("Submitting user:", payload); // ✅ debug payload

      const res = await addUser(payload, token);

      // Update users state
      setUsers((prev) => {
        if (Array.isArray(prev)) return [...prev, res.data];
        // If prev is object with items
        if (prev?.items) return { ...prev, items: [...prev.items, res.data] };
        return [res.data]; // fallback
      });

      userForm.resetForm();
      alert("User added successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add user");
    }
  };

  // Add store
  // const handleAddStore = async (e) => {
  //   e.preventDefault();
  //   if (!storeForm.values.ownerId) {
  //     alert("Please select a store owner");
  //     return;
  //   }

  //   try {
  //     const dataToSend = {
  //       ...storeForm.values,
  //       ownerId: Number(storeForm.values.ownerId),
  //     };
  //     const res = await addStore(dataToSend, token);
  //     setStores((prev) => [...prev, res.data]);
  //     storeForm.resetForm();
  //     alert("Store added successfully!");
  //   } catch (err) {
  //     alert(err.response?.data?.message || "Failed to add store");
  //   }
  // };
  const handleAddStore = async (e) => {
    e.preventDefault();

    if (!storeForm.values.ownerId) {
      alert("Please select a store owner");
      return;
    }

    try {
      const payload = {
        name: storeForm.values.name,
        email: storeForm.values.email,
        address: storeForm.values.address,
        ownerId: Number(storeForm.values.ownerId),
      };

      console.log("Submitting store:", payload);

      const res = await addStore(payload, token);

      setStores((prev) => {
        if (Array.isArray(prev)) return [...prev, res.data];
        if (prev?.items) return { ...prev, items: [...prev.items, res.data] };
        return [res.data];
      });

      storeForm.resetForm();
      alert("Store added successfully!");
    } catch (err) {
      console.error(err.response?.data || err);
      alert(err.response?.data?.message || "Failed to add store");
    }
  };

  // Update store
  const handleUpdateStore = async (storeId, updatedData) => {
    try {
      const res = await updateStore(storeId, updatedData, token);
      setStores((prev) => prev.map((s) => (s.id === storeId ? res.data : s)));
      alert("Store updated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update store");
    }
  };

  // Helper to render loading rows
  const renderLoadingRows = (columns, count = 3) =>
    Array.from({ length: count }).map((_, idx) => (
      <tr key={idx}>
        {Array.from({ length: columns }).map((_, i) => (
          <td key={i}>
            <span className="placeholder-glow">
              <span className="placeholder col-12"></span>
            </span>
          </td>
        ))}
      </tr>
    ));

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <button className="btn btn-danger mb-3" onClick={logout}>
        Logout
      </button>

      {/* Add User Form */}
      {/* <div className="card mb-4 shadow-sm p-3">
        <h5>Add New User</h5>
        <form onSubmit={handleAddUser} className="row g-2">
          {["name", "email", "password", "address"].map((field) => (
            <div className="col-md-3" key={field}>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="form-control"
                value={userForm.values[field]}
                onChange={userForm.handleChange}
                required
              />
            </div>
          ))}
          <div className="col-md-1">
            <button type="submit" className="btn btn-success w-100">
              Add
            </button>
          </div>
        </form>
      </div> */}

      {/* Add User Form */}
      <div className="card mb-4 shadow-sm p-3">
        <h5>Add New User</h5>
        <form onSubmit={handleAddUser} className="row g-2">
          {/* Name, Email, Password, Address */}
          {["name", "email", "password", "address"].map((field) => (
            <div className="col-md-3" key={field}>
              <input
                type={field === "password" ? "password" : "text"}
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="form-control"
                value={userForm.values[field]}
                onChange={userForm.handleChange}
                required
              />
            </div>
          ))}

          {/* Role Selector */}
          <div className="col-md-2">
            <select
              name="role"
              className="form-control"
              value={userForm.values.role}
              onChange={userForm.handleChange}
              required
            >
              <option value="user">User</option>
              <option value="store_owner">Store Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="col-md-1">
            <button type="submit" className="btn btn-success w-100">
              Add
            </button>
          </div>
        </form>
      </div>

      {/* Add Store Form */}
      {/* <div className="card mb-4 shadow-sm p-3">
        <h5>Add New Store</h5>
        <form onSubmit={handleAddStore} className="row g-2">
          {["name", "email", "address"].map((field) => (
            <div className="col-md-3" key={field}>
              <input
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="form-control"
                value={storeForm.values[field]}
                onChange={storeForm.handleChange}
                required
              />
            </div>
          ))}
          <div className="col-md-3">
            <select
              name="ownerId"
              className="form-control"
              value={storeForm.values.ownerId || ""}
              onChange={storeForm.handleChange}
              required
            >
              <option value="" disabled>
                Select Store Owner
              </option>
              {storeOwners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name} ({owner.email})
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-1">
            <button type="submit" className="btn btn-primary w-100">
              Add
            </button>
          </div>
        </form>
      </div> */}

      {/* Add Store Form */}
      <div className="card mb-4 shadow-sm p-3">
        <h5>Add New Store</h5>
        <form onSubmit={handleAddStore} className="row g-2">
          {["name", "email", "address"].map((field) => (
            <div className="col-md-3" key={field}>
              <input
                type="text"
                name={field}
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                className="form-control"
                value={storeForm.values[field]}
                onChange={storeForm.handleChange}
                required
              />
            </div>
          ))}

          {/* Store Owner Selector */}
          <div className="col-md-3">
            <select
              name="ownerId"
              className="form-control"
              value={storeForm.values.ownerId || ""}
              onChange={storeForm.handleChange}
              required
            >
              <option value="" disabled>
                Select Store Owner
              </option>
              {storeOwners.map((owner) => (
                <option key={owner.id} value={owner.id}>
                  {owner.name} ({owner.email})
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-1">
            <button type="submit" className="btn btn-primary w-100">
              Add
            </button>
          </div>
        </form>
      </div>

      {/* Users Table */}
      <div className="card mb-4 shadow-sm p-3">
        <h5>All Users</h5>
        {usersError && (
          <p className="text-danger">Error: {usersError.message}</p>
        )}
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                {["name", "email", "address", "role"].map((field) => (
                  <th
                    key={field}
                    onClick={() => sortUsers(field)}
                    style={{ cursor: "pointer" }}
                  >
                    {field.charAt(0).toUpperCase() + field.slice(1)}
                    {userSortConfig.key === field
                      ? userSortConfig.direction === "asc"
                        ? " ↑"
                        : " ↓"
                      : ""}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {usersLoading
                ? renderLoadingRows(4)
                : sortedUsers.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}</td>
                      <td>{u.email}</td>
                      <td>{u.address}</td>
                      <td>{u.role}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stores Table */}
      <div className="card mb-4 shadow-sm p-3">
        <h5>All Stores</h5>
        {storesError && (
          <p className="text-danger">Error: {storesError.message}</p>
        )}
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                {["name", "email", "address", "averageRating"].map((field) => (
                  <th
                    key={field}
                    onClick={() => sortStores(field)}
                    style={{ cursor: "pointer" }}
                  >
                    {field === "averageRating"
                      ? "Average Rating"
                      : field.charAt(0).toUpperCase() + field.slice(1)}
                    {storeSortConfig.key === field
                      ? storeSortConfig.direction === "asc"
                        ? " ↑"
                        : " ↓"
                      : ""}
                  </th>
                ))}
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {storesLoading
                ? renderLoadingRows(5)
                : sortedStores.map((s) => (
                    <tr key={s.id}>
                      <td>
                        <input
                          className="form-control"
                          defaultValue={s.name}
                          onBlur={(e) =>
                            handleUpdateStore(s.id, {
                              ...s,
                              name: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          defaultValue={s.email}
                          onBlur={(e) =>
                            handleUpdateStore(s.id, {
                              ...s,
                              email: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>
                        <input
                          className="form-control"
                          defaultValue={s.address}
                          onBlur={(e) =>
                            handleUpdateStore(s.id, {
                              ...s,
                              address: e.target.value,
                            })
                          }
                        />
                      </td>
                      <td>{s.averageRating || 0}</td>
                      <td>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleUpdateStore(s.id, s)}
                        >
                          Save
                        </button>
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

export default AdminDashboard;
