import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";

// Import Context
import { ChatContext } from "../Context/ChatContext";
import { db } from "../firebase";

// Import components
import Message from "./Message";

const MessageList = () => {
	const [messages, setMessages] = useState([]);
	const { data } = useContext(ChatContext);

	useEffect(() => {
		const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
			doc.exists() && setMessages(doc.data().messages);
		});

		return () => unSub();
	}, [data.chatId]);

	return (
		<div className="messageList">
			{messages.map((m) => (
				<Message message={m} key={m.id} />
			))}
		</div>
	);
};

export default MessageList;
