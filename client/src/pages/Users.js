import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('/api/auth/users', {
          headers: {
            'x-auth-token': token,
          },
        });
        setUsers(res.data);
      } catch (err) {
        console.error("Failed to fetch users:", err);
        alert("Unauthorized or failed to fetch users");
      }
    };

    fetchUsers();
  }, []);

  return (
    <div>
      <h2>Registered Users</h2>
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user._id}>
              {user.name} — {user.email}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Users;
