import React from 'react'

// Import Icons
import addAvatar from "../Assets/addAvatar.png"

const Register = () => {
  return (
    <div className='formContainer'>
      <div className='formWrapper'>
        <span className='logo'>App Chat</span>
        <span className='title'>Register</span>
        <form>
          <input type="text" placeholder='display name'/>
          <input type="email" placeholder='email'/>
          <input type="password" placeholder='password'/>
          <input style={{display:'none'}} type="file" id='fileInput'/>
          <label htmlFor='fileInput'>
            <img src={addAvatar} alt="Add Avatar" />
            <span>Add an avatar</span>
          </label>
          <button>Signup</button>
        </form>
        <p>You do have an account? Login</p>
      </div>
    </div>
  )
}

export default Register