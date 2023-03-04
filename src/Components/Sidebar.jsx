import React from 'react'

// import Components
import Navbar from './Navbar'
import Searchbar from './Searchbar'
import ChatList from './ChatList'

const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar />
      <Searchbar />
      <ChatList />
    </div>
  )
}

export default Sidebar