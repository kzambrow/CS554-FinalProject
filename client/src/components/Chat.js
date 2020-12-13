import React, {useContext, useState, useEffect, useRef} from "react";
import { AuthContext } from '../firebase/Auth';
import io from "socket.io-client";
import '../App.css';


const Chat = () => {
    const { currentUser } = useContext(AuthContext);
    const [ID, setID] = useState("");
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
        return () => {
            socketRef.current.off("disconnect");
        };

        
    }, [setMessages])


    function receivedMessage(message) {
        setMessages(oldMessages => [...oldMessages, message]);
        console.log(message);
        scrollDown();
    }

    function sendMessage(e) {
        e.preventDefault();
        const messageObject = {
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
                        if (currentUser.displayName === message.name) {
                            return (
                                <div key={index}>
                                    <div className="chat-user">
                                        {message.name}
                                        <br/>
                                        {message.body}
                                        <br/>
                                    </div>
                                </div>
                            )
                        } else {
                            return (
                                <div key={index}>
                                    <div className="chat-other">
                                        {message.name}
                                        <br/>
                                        {message.body}
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
            <form onSubmit={sendMessage}>
                <textarea className="chat-text-field" value={message} onChange={handleChange} placeholder="Message..." />
                <button className="chat-submit">Send</button>
            </form>
        </div>
    )
};

export default Chat;