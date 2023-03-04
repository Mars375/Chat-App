import React, { useContext, useEffect, useRef } from "react";

// import Context
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

const Message = ({ message }) => {
	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	const ref = useRef();

	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: "smooth" });
	}, [message]);

	return (
		<div
			ref={ref}
			className={`message ${message.senderId === currentUser.uid && "owner"}`}
		>
			<div className="messageInfo">
				<img
					src={
						message.senderId === currentUser.uid
							? currentUser.photoURL
							: data.user.photoURL
					}
					alt=""
				/>
				<span>just now</span>
			</div>
			<div className="messageText">
				<p>{message.text}</p>
				{message.file && <img src={message.file} alt="" />}
			</div>
		</div>
	);
};

export default Message;
