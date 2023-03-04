import React from 'react'

const Searchbar = () => {
  return (
    <div className='searchbar'>
      <div className='searchForm'>
        <input type="text" placeholder='Find a user' />
      </div>
      <div className="userChat">
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
        <div className="userChatInfo">
          <span>John</span>
        </div>
      </div>
    </div>
  )
}

export default Searchbar