import React, {useState, useEffect, useRef} from "react";
import io from "socket.io-client";


const Chat = () => {
    const [ID, setID] = useState();
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const socketRef = useRef();

    useEffect(() => {
        socketRef.current = io.connect('/', {transports: ['websocket']});
        socketRef.current.on("your id", id=> {
            setID(id);
        })

        socketRef.current.on("message", (message) => {
            console.log("received message");
            receivedMessage(message);
        })
    })

    function receivedMessage(message) {
        setMessages(oldMessages => [...oldMessages, message]);
    }

    function sendMessage(e) {
        e.preventDefault();
        const messageObject = {
            body: message,
            id: ID,
        };
        setMessage("");
        socketRef.current.emit("send message", messageObject);
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
                                    {message.body}
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