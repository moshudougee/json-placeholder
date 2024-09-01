import { useEffect, useState } from "react"
import Paginate from "./Paginate";
import { Link } from "react-router-dom";


const PostsComp = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        //const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${postsPerPage}&_page=${currentPage}`);
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  
  return (
    <div className="posts">
      <div className="posts-title">
        <h1 className="posts-title-header">Posts</h1>
      </div>
      {loading ? 
        <div className="posts-body">
          <p>Loading...</p>
        </div>
         : 
        (
        <div className="flex flex-col w-full gap-2">
          <div className="posts-body-header">
            <span className="posts-body-item">Title</span>
            <span className="posts-body-item">View More</span>
          </div>
          {currentPosts.map(post => (
            <div key={post.id} className="posts-body">
              <span className="posts-body-item">{post.title}</span>
              <Link to={`/posts/${post.id}`} className="posts-body-link">View More</Link>
            </div>
          ))}
        </div>
        )
      }
      <div className="posts-body">
        <Paginate 
          totalItems={posts.length}
          itemsPerPage={postsPerPage}
          paginate={paginate}
        />
      </div>
    </div>
  )
}

export default PostsComp