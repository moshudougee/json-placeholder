import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Paginate from "./Paginate";


const CommentsComp = () => {
    const [comments, setComments] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [commentsPerPage] = useState(10);
    const { postId } = useParams();

    useEffect(() => {
      const fetchComments = () => {
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
         .then(response => response.json())
         .then(data => setComments(data))
         .finally(() => setLoading(false));
      };
      fetchComments();
    }, [postId]);

    // Get current comments
    const indexOfLastComment = currentPage * commentsPerPage;
    const indexOfFirstComment = indexOfLastComment - commentsPerPage;
    const currentComments = comments?.slice(indexOfFirstComment, indexOfLastComment);

    // Change page
    const paginate = (page) => setCurrentPage(page);
    
  return (
    <div className="comments">
        <div className="comments-title">
            <h1 className="comments-title-header">Comments:</h1>
        </div>
        {loading &&
        <div className="comments-body">
            <h2>Loading...</h2>
        </div> 
        }
        {!loading && comments && (
          <div>
            
            {currentComments.map(comment => (
              <div key={comment.id} className="comments-body">
                <span className="comments-body-title">{comment.name}</span>
                <span className="comments-body-email">{comment.email}</span>
                <span className="comments-body-item">{comment.body}</span>
              </div>
            ))}
            <div className="comments-body">
              <Paginate 
                itemsPerPage={commentsPerPage}
                totalItems={comments?.length}
                paginate={paginate}
              />
            </div>
          </div>
        )}
    </div>
  )
}

export default CommentsComp