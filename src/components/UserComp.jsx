import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const UserComp = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [todos, setTodos] = useState(0);
    const [albums, setAlbums] = useState(0);
    const [posts, setPosts] = useState(0);
    const { userId } = useParams();

    useEffect(() => {
        const fetchUser = () => {
            setLoading(true);
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
                .then(res => res.json())
                .then(data => setUser(data))
                .finally(() => setLoading(false));
        };
        const fetchTodos = () => {
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
                .then(res => res.json())
                .then(data => setTodos(data.length))
                .finally(() => setLoading(false));
        };
        const fetchAlbums = () => {
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`)
                .then(res => res.json())
                .then(data => setAlbums(data.length))
                .finally(() => setLoading(false));
        };
        const fetchPosts = () => {
            fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
                .then(res => res.json())
                .then(data => setPosts(data.length))
                .finally(() => setLoading(false));
        };
        fetchUser();
        fetchTodos();
        fetchAlbums();
        fetchPosts();
    }, [userId]);
  return (
    <div className="user">
        {loading && 
            <div className="user-body">
                <p>Loading...</p>
            </div>
        }
        {user && (
          <div className="display">
            <div className="user-body">
                <span className="user-body-item">Name</span>
                <span className="user-body-item">{user.name}</span>
            </div>
            <div className="user-body">
                <span className="user-body-item">Username</span>
                <span className="user-body-item">{user.username}</span>
            </div>
            <div className="user-body">
                <span className="user-body-item">Email</span>
                <span className="user-body-item">{user.email}</span>
            </div>
            <div className="user-body">
                <span className="user-body-item">Street</span>
                <span className="user-body-item">{user.address.street}</span>
            </div>
            <div className="user-body">
                <span className="user-body-item">Suite</span>
                <span className="user-body-item">{user.address.suite}</span>
            </div>
            <div className="user-body">
                <span className="user-body-item">City</span>
                <span className="user-body-item">{user.address.city}</span>
            </div>
            <div className="user-body">
                <span className="user-body-item">Zip Code</span>
                <span className="user-body-item">{user.address.zipcode}</span>
            </div>
            <div className="user-body">
                <span className="user-body-item">Latitude</span>
                <span className="user-body-item">{user.address.geo.lat}º</span>
            </div>
            <div className="user-body">
                <span className="user-body-item">Longitude</span>
                <span className="user-body-item">{user.address.geo.lng}º</span>
            </div>
            <div className="user-body">
                <span className="user-body-item">Phone</span>
                <span className="user-body-item">{user.phone}</span>
            </div>
            <div className="user-body">
                <span className="user-body-item">Website</span>
                <span className="user-body-item">{user.website}</span>
            </div>
            <div className="user-body">
                <span className="user-body-item">Company Name</span>
                <span className="user-body-item">{user.company.name}</span>
            </div>
            <div className="user-body">
                <span className="user-body-item">Catch Phrase</span>
                <span className="user-body-item">{user.company.catchPhrase}</span>
            </div>
            <div className="user-body">
                <span className="user-body-item">BS</span>
                <span className="user-body-item">{user.company.bs}</span>
            </div>
            <div className="user-footer">
                <Link to={`/users/todos/${userId}`} className="user-footer-link">Todos: {todos}</Link>
                <Link to={`/users/albums/${userId}`} className="user-footer-link">Albums: {albums}</Link>
                <Link to={`/users/posts/${userId}`} className="user-footer-link">Posts: {posts}</Link>
            </div>
          </div>
        )}
    </div>
  )
}

export default UserComp