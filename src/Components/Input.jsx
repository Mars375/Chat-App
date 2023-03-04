import React from 'react'

// Import Icons
import Img from "../Assets/img.png"
import Attach from "../Assets/attach.png"

const Input = () => {
  return (
    <div className='input'>
      <input type="text" placeholder='Type a something...' />
      <div className="send">
        <img src={Attach} alt="" />
        <input type="file" style={{display:"none"}} id="file" />
        <label htmlFor="file">
          <img src={Img} alt="" />
        </label>
        <button>Send</button>
      </div>
    </div>
  )
}

export default Input