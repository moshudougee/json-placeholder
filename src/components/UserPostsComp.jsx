import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Paginate from "./Paginate";


const UserPostsComp = () => {
    const [posts, setPosts] = useState([]);
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const [commentsCount, setCommentsCount] = useState({});
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(5);
    const { userId } = useParams();

    useEffect(() => {
      const fetchPosts = () => {
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
         .then(response => response.json())
         .then(data => setPosts(data))
         .catch(error => console.log(error))
         .finally(() => setLoading(false));
      };
      const fetchUser = () => {
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
         .then(response => response.json())
         .then(data => setUser(data))
         .catch(error => console.error('Error:', error))
         .finally(() => setLoading(false));
      };
      fetchUser();
      fetchPosts();
    }, [userId]);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    useEffect(() => {
        const countComments = async(postId) => {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`);
            const data = await response.json();
            return data.length;
        };
        const fetchCommentsCount = async() => {
            const counts = {};
            for(const post of currentPosts) {
                const count = await countComments(post.id);
                counts[post.id] = count;
            }
            setCommentsCount(counts);
        };
        fetchCommentsCount();
    }, [currentPosts])
    

    
    
  return (
    <div className="userposts">
        <div className="userposts-title">
            <h1 className="userposts-title-header">{user?.name} Posts</h1>
        </div>
        {loading ? 
        <div className="userposts-body">
            <p>Loading...</p>
        </div> 
        : (
            <div className="display">
                {currentPosts.map(post => {
                    const comments = commentsCount[post.id]?? "Loading...";
                    return (
                        <div key={post.id} className="userposts-body">
                            <span className="userposts-body-title">{post.title}</span>
                            <span className="userposts-body-item">{post.body}</span>
                            <Link to={`/posts/comments/${post?.id}`} className="userposts-body-link">Comments: {comments}</Link>
                        </div>
                    )
                })}
                <div className="userposts-body">
                    <Paginate 
                        totalItems={posts.length}
                        itemsPerPage={postsPerPage}
                        paginate={paginate}
                    />
                </div>
            </div>
        )}    
    </div>
  )
}

export default UserPostsComp