import React, {useContext, useState, useEffect, useRef} from "react";
import { AuthContext } from '../firebase/Auth';
import io from "socket.io-client";
import '../App.css';
const axios = require('axios');



const Chat = () => {
    const { currentUser } = useContext(AuthContext);
    const [ID, setID] = useState("");
    const [currentImage, setCurrentImage] = useState("/imgs/turnipSmall.png");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io('http://localhost:5000', {
            transports: ['websocket'],
            upgrade: false
        });
        socketRef.current.on("RECEIVE_MESSAGE", function(message) {
            receivedMessage(message);
        });
        async function getImage() {
            try {
                const profile = await axios.get(`http://localhost:5000/images/${currentUser.id}`); 
                let newimageSource = profile.data.data.imageData;
                let finalimageSource = newimageSource.replaceAll("\\", "/").replace("../client/public", "");
                if (finalimageSource.includes(".png")) {
                    finalimageSource = finalimageSource.replace(".png", "_small.png");
                }
                if (finalimageSource.includes(".jpeg")) {
                    finalimageSource = finalimageSource.replace(".jpeg", "_small.jpeg");
                }
                if (finalimageSource.includes(".jpg")) {
                    finalimageSource = finalimageSource.replace(".jpg", "_small.jpg");
                }
                setCurrentImage(finalimageSource);
            } catch (e) {
                setCurrentImage("/imgs/turnipSmall.png");
                console.log(e);
            }
        }
        getImage();
        return () => {
            socketRef.current.off("disconnect");
        };
        
    }, [setMessages, currentUser])


    function receivedMessage(message) {
        setMessages(oldMessages => [...oldMessages, message]);
        console.log(message);
        scrollDown();
    }

    function sendMessage(e) {
        e.preventDefault();
        const messageObject = {
            image: currentImage,
            email: currentUser.email,
            name: currentUser.displayName,
            body: message,
            id: ID,
        };
        socketRef.current.emit("SEND_MESSAGE", messageObject);
        setMessage("");
    }

    function handleChange(e) {
        setMessage(e.target.value);
    }

    function scrollDown() {
        var objDiv = document.getElementById("chat");
        objDiv.scrollTop = objDiv.scrollHeight;
    }
    return (
        
        <div>
            <div id="chat" className="chat-box">
                {messages.map((message, index) => {
                    if (message.id === ID) {
                        if (currentUser && currentUser.email === message.email) {
                            return (
                                <div key={index}>
                                    <div className="chat-user" >
                                        {message.name}
                                        <img src={message.image} className="round-profile" alt="Image"/>
                                        <br/>
                                        <div class="chat-bubble-user">
                                        {message.body}
                                        </div>
                                        <br/>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index}>
                                    <div className="chat-other chat-bubble">
                                        <img src={message.image} class="round-profile" alt="Image"/>
                                        {message.name}
                                        <br/>
                                        <div class="chat-bubble-other">
                                        {message.body}
                                        </div>
                                        <br/>
                                    </div>
                                </div>
                            )
                        }
                        
                    }
                    return (
                        <div>
                            <div>
                                {message.body}
                            </div>
                        </div>
                    )
                })}
            </div>
            {currentUser ?
            
            <form onSubmit={sendMessage}>
                <textarea className="chat-text-field" value={message} onChange={handleChange} placeholder="Message..." />
                <button className="chat-submit">Send</button>
            </form>
            : 
            null
            }
            
        </div>
    )
};

export default Chat;