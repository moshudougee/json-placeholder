import { useEffect, useState } from "react";
import { Link } from "react-router-dom";


const HomeComp = () => {
    const [posts, setPosts] = useState(0);
    const [users, setUsers] = useState(0);
    useEffect(() => {
      const countPosts = () => {
        fetch('https://jsonplaceholder.typicode.com/posts')
         .then(response => response.json())
         .then(data => setPosts(data.length))
         .catch(error => console.error('Error:', error));
      }
      const countUsers = () => {
        fetch('https://jsonplaceholder.typicode.com/users')
         .then(response => response.json())
         .then(data => setUsers(data.length))
         .catch(error => console.error('Error:', error));
      }
      countPosts();
      countUsers();
    }, [])
    
  return (
    <div className="home">
        <div className="home-title">
            <h1 className="home-title-header">Welcome to the Home Page</h1>
        </div>
        <div className="home-body">
            <span className="home-body-item">Total Posts:</span>
            <span className="home-body-item">{posts}</span>
            <Link to="/posts" className="home-body-link">View More</Link>
        </div>
        <div className="home-body">
            <span className="home-body-item">Total Users:</span>
            <span className="home-body-item">{users}</span>
            <Link to="/users" className="home-body-link">View More</Link> 
        </div>
    </div>
  )
}

export default HomeComp