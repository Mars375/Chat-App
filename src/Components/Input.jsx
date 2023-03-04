import React, { useContext, useState } from "react";

// Import Icons
import Img from "../Assets/img.png";
import Attach from "../Assets/attach.png";

// Import Context
import { AuthContext } from "../Context/AuthContext";
import { ChatContext } from "../Context/ChatContext";

// Import Firebase
import {
	arrayUnion,
	doc,
	serverTimestamp,
	Timestamp,
	updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase";

//Import Id
import { v4 as uuidv4 } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Input = () => {
	const [text, setText] = useState("");
	const [file, setFile] = useState(null);

	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	const handleSend = async () => {
		if (file) {
			const storageRef = ref(storage, uuidv4());

			const uploadTask = uploadBytesResumable(storageRef, file);

			uploadTask.on(
				(error) => {
					//TODO:Handle Error
				},
				() => {
					getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
						await updateDoc(doc(db, "chats", data.chatId), {
							messages: arrayUnion({
								id: uuidv4(),
								text,
								senderId: currentUser.uid,
								date: Timestamp.now(),
								file: downloadURL,
							}),
						});
					});
				}
			);
		} else {
			await updateDoc(doc(db, "chats", data.chatId), {
				messages: arrayUnion({
					id: uuidv4(),
					text,
					senderId: currentUser.uid,
					date: Timestamp.now(),
				}),
			});
		}
		try {
			await updateDoc(doc(db, "userChats", currentUser.uid), {
				[data.chatId + ".lastMessage"]: {
					text,
				},
				[data.chatId + ".date"]: serverTimestamp(),
			});
		} catch (error) {
			console.log(error);
		}
		try {
			console.log(data.user.uid);
			await updateDoc(doc(db, "userChats", data.user.uid), {
				[data.chatId + ".lastMessage"]: {
					text,
				},
				[data.chatId + ".date"]: serverTimestamp(),
			});
		} catch (error) {
			console.log(error);
		}

		setText("");
		setFile(null);
	};

	return (
		<div className="input">
			<input
				type="text"
				placeholder="Type a something..."
				onChange={(e) => setText(e.target.value)}
				value={text}
			/>
			<div className="send">
				<img src={Attach} alt="" />
				<input
					type="file"
					style={{ display: "none" }}
					id="file"
					onChange={(e) => setFile(e.target.files[0])}
				/>
				<label htmlFor="file">
					<img src={Img} alt="" />
				</label>
				<button onClick={handleSend}>Send</button>
			</div>
		</div>
	);
};

export default Input;
