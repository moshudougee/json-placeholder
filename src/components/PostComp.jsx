import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";


const PostComp = () => {
    const [post, setPost] = useState(null);
    const [user, setUser] = useState(null);
    const [comments, setComments] = useState(0);
    const [loading, setLoading] = useState(false);
    const { postId } = useParams();
    console.log(postId);

    useEffect(() => {
      const fetchPost = () => {
        // Replace with your API endpoint
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts/' + postId)
         .then(response => response.json())
         .then(data => setPost(data))
         .catch(error => console.error('Error:', error))
         .finally(() => setLoading(false));
      };
      
      const fetchComments = () => {
        setLoading(true);
        fetch('https://jsonplaceholder.typicode.com/posts/' + postId + '/comments')
         .then(response => response.json())
         .then(data => setComments(data.length))
         .catch(error => console.error('Error:', error))
         .finally(() => setLoading(false));
      };
      fetchPost();
      fetchComments();
      
    }, [postId]);

    useEffect (() => {
        const fetchUser = (userId) => {
            setLoading(true);
            fetch('https://jsonplaceholder.typicode.com/users/' + userId)
             .then(response => response.json())
             .then(data => setUser(data))
             .catch(error => console.error('Error:', error))
             .finally(() => setLoading(false));
        };
        if(post) {
          const userId = post.userId;
          fetchUser(userId);
        }
    }, [post]);
    
  return (
    <div className="post">
        {loading ? 
            <div className="post-body">
                <p>Loading...</p>
            </div>
             : (
          <div className="display">
            <div className="post-title">
                <span className="post-title-item">{post?.title}</span>
            </div>
            <div className="post-body">
                <span className="post-body-item">{post?.body}</span>
            </div>
            <div className="post-footer">
                <Link to={`/users/${user?.id}`} className="post-footer-link">By: {user?.name}</Link>
                <Link to={`/posts/comments/${postId}`} className="post-footer-link">Comments: {comments}</Link>
            </div>
          </div>
        )}
    </div>
  )
}

export default PostComp