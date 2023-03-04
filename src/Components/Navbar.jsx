import React, { useContext } from "react";

// import Firebase
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

// import Context
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<div className="navbar">
			<span className="logo">Chat App</span>
			<div className="user">
				<img src={currentUser.photoURL} alt="user" className="user__img" />
				<span className="user__name">{currentUser.displayName}</span>
				<button onClick={() => signOut(auth)}>logout</button>
			</div>
		</div>
	);
};

export default Navbar;
