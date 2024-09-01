

import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <div className="nav">
        <div className="nav-main">
            <div className="nav-logo">
              <Link to="/" className="nav-logo-link">JSON Placeholder test app</Link>
            </div>
            <div className="nav-menu">
              <Link to="/users" className="nav-menu-link">Users</Link>
              <Link to="/posts" className="nav-menu-link">Posts</Link>
            </div>
        </div>
      </div>
  )
}

export default Navbar