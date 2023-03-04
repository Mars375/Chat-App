import React from "react";

// Import icons
import Cam from "../Assets/cam.png";
import Add from "../Assets/add.png";
import More from "../Assets/more.png";

// Import components
import MessageList from "./MessageList";
import Input from "./Input";

const Chat = () => {
	return (
		<div className="chat">
			<div className="chatInfo">
				<span>John</span>
				<div className="chatIcons">
					<img src={Cam} alt="" />
					<img src={Add} alt="" />
					<img src={More} alt="" />
				</div>
			</div>
			<MessageList />
			<Input />
		</div>
	);
};

export default Chat;
