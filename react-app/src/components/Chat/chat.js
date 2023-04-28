import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { io } from 'socket.io-client';
let socket;

const Chat = ({userId, username}) => {
    const [chatInput, setChatInput] = useState("");
    const [messages, setMessages] = useState([]);
    const user = useSelector(state => state.session.user)
    const dispatch= useDispatch()
    console.log(messages)

    useEffect(() => {
        // open socket connection
        // create websocket
        socket = io();

        socket.on('connect', ()=>{
            socket.emit('join',{username: username, room:userId + user.id})
        
        })

        socket.on("chat", (chat) => {
            setMessages(messages => [...messages, chat])
        })
        // when component unmounts, disconnect
        return (() => {
            socket.disconnect()
        })
    }, [messages,dispatch,userId])

    const updateChatInput = (e) => {
        setChatInput(e.target.value)
    };

    const sendChat = (e) => {
        e.preventDefault()
        socket.emit("chat", { user: user.username, msg: chatInput, userimg: user.imageUrl, recipientId:userId, room: userId + user.id });
        setChatInput("")
    }

    return (user && (
        <div className="container mx-auto shadow-lg rounded-lg">
            <div >
                {messages.map((message, ind) => (
                    
                   
                    <div 
                    class="mt-2 ml-5"
                    key={ind}>{`${message.user}: ${message.msg}`}</div>
                ))}
            </div>
            <form onSubmit={sendChat}>
                <input
                    value={chatInput}
                    onChange={updateChatInput}
                    className="pin-input w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"

                />
                <button 
                type="submit"
                className="create-button mt-5 text-sm bg-rose-500"
                >Send</button>
            </form>
        </div>
    )
    )
};


export default Chat;