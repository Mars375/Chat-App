import React from "react";

// import Firebase
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
	return (
		<div className="navbar">
			<span className="logo">Chat App</span>
			<div className="user">
				<img
					src="https://www.w3schools.com/howto/img_avatar.png"
					alt="user"
					className="user__img"
				/>
				<span className="user__name">User Name</span>
				<button onClick={() => signOut(auth)}>logout</button>
			</div>
		</div>
	);
};

export default Navbar;
