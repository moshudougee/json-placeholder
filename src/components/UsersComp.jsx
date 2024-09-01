import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Paginate from "./Paginate";


const UsersComp = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  useEffect (() => {
    const fetchUsers = () => {
      setLoading(true);
      fetch("https://jsonplaceholder.typicode.com/users")
       .then(response => response.json())
       .then(data => {
          setUsers(data);
        })
        .catch(error => {
          console.error("Error fetching users:", error);
        })
        .finally(() => setLoading(false));
    }
    fetchUsers();
  }, []);
  
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  return (
    <div className="users">
      <div className="users-title">
        <h1 className="users-title-header">Users</h1>
      </div>
      {loading ? (
        <div className="users-body">
          <p>Loading...</p>
        </div>
      ) : (
        <div className="flex flex-col w-full gap-4">
          <div className="users-body-header">
            <span className="users-body-item">Name</span>
            <span className="users-body-item">Email</span>
            <span className="users-body-item">View User</span>
          </div>
          {currentUsers.map(user => (
            <div key={user.id} className="users-body">
              <span className="users-body-item">{user.name}</span>
              <span className="users-body-item">{user.email}</span>
              <Link to={`/users/${user.id}`} className="users-body-link">View More</Link>
            </div>
          ))}
        </div>
      )}
      <div className="users-body">
        <Paginate 
          totalItems={users.length}
          itemsPerPage={usersPerPage}
          paginate={paginate}
        />
      </div>
    </div>
  )
}

export default UsersComp