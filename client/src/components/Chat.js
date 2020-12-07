import React, {useContext, useState, useEffect, useRef} from "react";
import { AuthContext } from '../firebase/Auth';
import io from "socket.io-client";


const Chat = () => {
    const { currentUser } = useContext(AuthContext);
    const [ID, setID] = useState("");
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io('http://localhost:8080', {
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
    return (
        <div>
            <div>
                {messages.map((message, index) => {
                    if (message.id === ID) {
                        return (
                            <div key={index}>
                                <div>
                                    {message.name + ": " + message.body}
                                </div>
                            </div>
                        )
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
                <textarea value={message} onChange={handleChange} placeholder="Message..." />
                <button>Send</button>
            </form>
        </div>
    )
};

export default Chat;