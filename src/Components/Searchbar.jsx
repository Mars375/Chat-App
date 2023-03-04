import React, { useContext, useState } from "react";

// Import Firebase
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from "firebase/firestore";
import { db } from "../firebase";

// Import Context
import { AuthContext } from "../Context/AuthContext";

const Searchbar = () => {
	const [username, setUsername] = useState("");
	const [user, setUser] = useState("");
	const [err, setErr] = useState(false);

	const { currentUser } = useContext(AuthContext);

	const handleSearch = async () => {
		const q = query(
			collection(db, "users"),
			where("displayName", "==", username)
		);

		try {
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				setUser(doc.data());
			});
		} catch (err) {
			setErr(true);
		}
	};
	const handleKey = (e) => {
		e.code === "Enter" && handleSearch();
	};

	const handleSelect = async () => {
		//check wether the group(chats in firestore) exists, if not create
		const combinedID =
			currentUser.uid > user.uid
				? currentUser.uid + user.uid
				: user.uid + currentUser.uid;

		try {
			const res = await getDoc(doc(db, "chats", combinedID));

			if (!res.exists()) {
				//create a chat in chats collection
				await setDoc(doc(db, "chats", combinedID), {
					messages: [],
				});

				// create user chats
				try {
					await updateDoc(doc(db, "userChats", currentUser.uid), {
						[combinedID + ".userInfo"]: {
							uid: user.uid,
							displayName: user.displayName,
							photoURL: user.photoURL,
						},
						[combinedID + ".date"]: serverTimestamp(),
					});
				} catch (error) {
					console.log(error);
				}
				try {
					await updateDoc(doc(db, "userChats", user.uid), {
						[combinedID + ".userInfo"]: {
							uid: currentUser.uid,
							displayName: currentUser.displayName,
							photoURL: currentUser.photoURL,
						},
						[combinedID + ".date"]: serverTimestamp(),
					});
				} catch (error) {
					console.log(error);
				}
			}
		} catch (error) {}

		setUser(null);
		setUsername("");
	};

	return (
		<div className="searchbar">
			<div className="searchForm">
				<input
					type="text"
					placeholder="Find a user"
					onKeyDown={handleKey}
					onChange={(e) => setUsername(e.target.value)}
					value={username}
				/>
			</div>
			{err && <span className="error">User not found</span>}
			{user && (
				<div className="userChat" onClick={handleSelect}>
					<img src={user.photoURL} alt="" />
					<div className="userChatInfo">
						<span>{user.displayName}</span>
					</div>
				</div>
			)}
		</div>
	);
};

export default Searchbar;
