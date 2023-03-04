import React, { useContext, useEffect, useState } from "react";

// Import Context
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

// Import Firebase
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";

const ChatList = () => {
	const [chats, setChats] = useState([]);

	const { currentUser } = useContext(AuthContext);
	const { chatDispatch } = useContext(ChatContext);

	useEffect(() => {
		const getChats = async () => {
			const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
				setChats(doc.data());
			});

			return () => {
				unsub();
			};
		};

		currentUser.uid && getChats();
	}, [currentUser.uid]);

	const handleSelect = (u) => {
		chatDispatch({ type: "SELECT_CHAT", payload: u });
	};

	return (
		<div className="chatList">
			{Object.entries(chats)
				?.sort((a, b) => b[1].date - a[1].date)
				.map((chat) => (
					<div
						className="userChat"
						key={chat[0]}
						onClick={() => handleSelect(chat[1].userInfo)}
					>
						<img src={chat[1].userInfo.photoURL} alt="" />
						<div className="userChatInfo">
							<span>{chat[1].userInfo.displayName}</span>
							<p>{chat[1].lastMessage?.text}</p>
						</div>
					</div>
				))}
		</div>
	);
};

export default ChatList;
