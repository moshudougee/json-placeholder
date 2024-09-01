import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Users from "./pages/Users"
import Posts from "./pages/Posts"
import NotFound from "./pages/NotFound"
import Post from "./pages/Post"
import User from "./pages/User"
import Comments from "./pages/Comments"
import Todos from "./pages/Todos"
import Albums from "./pages/Albums"
import UserPosts from "./pages/UserPosts"
import Photos from "./pages/Photos"



const App = () => {
  

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users" element={<Users />} />
          <Route path="/users/:userId" element={<User />} />
          <Route path="/users/albums/:userId" element={<Albums />} />
          <Route path="/users/posts/:userId" element={<UserPosts />} />
          <Route path="/users/todos/:userId" element={<Todos />} />
          <Route path="/albums/photos/:albumId" element={<Photos />} />
          <Route path="/posts" element={<Posts />} />
          <Route path="/posts/:postId" element={<Post />} />
          <Route path="/posts/comments/:postId" element={<Comments />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>

    </>
  )
}

export default App
