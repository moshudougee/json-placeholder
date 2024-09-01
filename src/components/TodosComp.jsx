import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Paginate from "./Paginate";


const TodosComp = () => {
    const [todos, setTodos] = useState([]);
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [todosPerPage] = useState(5);
    const { userId } = useParams();

    useEffect(() => {
      const fetchTodos = () => {
        setLoading(true);
        fetch(`https://jsonplaceholder.typicode.com/users/${userId}/todos`)
         .then(response => response.json())
         .then(data => setTodos(data))
         .catch(error => console.error('Error:', error))
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
      fetchTodos();
    }, [userId]);

    // Get current todos
    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = todos && todos.slice(indexOfFirstTodo, indexOfLastTodo);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);
    

  return (
    <div className="todos">
        <div className="todos-title">
            <h1 className="todos-title-header">{user?.name} ToDos</h1>
        </div>
        {loading ? 
            <div className="todos-body">
                <p>Loading...</p>
            </div> 
        : (
            <div className="display">
                <div className="todos-body">
                    <span className="todos-body-header">Title</span>
                    <span className="todos-body-header">Completed</span>
                </div>
                {currentTodos && currentTodos.map(todo => (
                    <div key={todo.id} className="todos-body">
                        <span className="todos-body-item">{todo.title}</span>
                        <span className="todos-body-item">{todo.completed.toString()}</span>
                    </div>
                ))}
            </div>
        )
        }
        <div className="todos-body">
            <Paginate 
                totalItems={todos.length}
                itemsPerPage={todosPerPage}
                paginate={paginate}
            />
        </div>
    </div>
  )
}

export default TodosComp