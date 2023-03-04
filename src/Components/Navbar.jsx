import React from 'react'

const Navbar = () => {
  return (
    <div className='navbar'>
      <span className='logo'>Chat App</span>
      <div className="user">
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="user" className="user__img" />
        <span className="user__name">User Name</span>
        <button>logout</button>
      </div>
    </div>
  )
}

export default Navbar