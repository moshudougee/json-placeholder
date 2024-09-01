import React from 'react'
import Navbar from '../components/Navbar'
import PropTypes from 'prop-types'

const Layout = ({ children }) => {
  // ... rest of the code
  return (
    <React.Fragment>
        <header>
            <div>
                <Navbar />
            </div>
        </header>
        <main>
            <div className='container flex min-h-screen mt-20 justify-center items-start'>
                {children}
            </div>
        </main>
        <footer>
            <div className='flex justify-center items-center m-5'>
                Footer
            </div>
        </footer>
  
    </React.Fragment>
  )
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};
 

export default Layout