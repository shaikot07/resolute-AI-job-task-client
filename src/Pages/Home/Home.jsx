import  { useEffect, useRef, useState } from 'react';
import { BsSend } from "react-icons/bs";
import { io } from 'socket.io-client';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import useAuth from '../../Hooks/useAuth';
const Home = () => {
    const [messages, setMessages] = useState([]);
    console.log(messages);
    const [messageInput, setMessageInput] = useState("");
    console.log(messageInput);
    const axiosPublic = useAxiosPublic()
    const { user} = useAuth();
    // const socket = io("https://resolute-ai-job-task-backend.vercel.app/");
    const socket = io("http://localhost:5000/");

    // Ref for the container element wrapping all the messages
    const messagesEndRef = useRef(null);

    useEffect(() => {
        // Fetch messages from backend when component mounts
        axiosPublic
            .get("/messages")
            .then((response) => {
                setMessages(response.data);
            })
            .catch((error) => {
                console.error("Error fetching messages:", error);
            });

        // Listen for new messages from socket
        socket.on("message", (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket,axiosPublic]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const formatTime = (createdAt) => {
        const date = new Date(createdAt);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        if (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        ) {
            // If message was sent today
            return `Today at ${date.getHours() % 12 || 12}:${String(date.getMinutes()).padStart(
                2,
                "0"
            )}${date.getHours() >= 12 ? "pm" : "am"}`;
        } else if (
            date.getDate() === yesterday.getDate() &&
            date.getMonth() === yesterday.getMonth() &&
            date.getFullYear() === yesterday.getFullYear()
        ) {
            // If message was sent yesterday
            return `Yesterday at ${date.getHours() % 12 || 12}:${String(date.getMinutes()).padStart(
                2,
                "0"
            )}${date.getHours() >= 12 ? "pm" : "am"}`;
        } else {
            // If message was sent earlier than yesterday
            return `${date.toLocaleDateString()} ${date.getHours() % 12 || 12}:${String(
                date.getMinutes()
            ).padStart(2, "0")}${date.getHours() >= 12 ? "pm" : "am"}`;
        }
    };

    // post the message in the backend 
    const handleMessageSubmit = (e) => {
        e.preventDefault();
        if (messageInput.trim() !== "") {
            // Send message to backend
            axiosPublic
                .post("/messages", {
                    text: messageInput,
                    user: {
                        name: user.displayName,
                        photo: user.photoURL,
                    },
                })
                .then((response) => {
                    // Message sent successfully
                    console.log("Message sent successfully:", response.data);
                })
                .catch((error) => {
                    console.error("Error sending message:", error);
                });

            // Clear message input
            setMessageInput("");
        }
    };
    return (
        <div className=" container hero min-h-screen bg-[#0489D7] max-w-6xl mx-auto pt-4  ">
            <div className="grid grid-cols-2 w-full mx-auto h-[500px] ">
                <div className="w-[434px] mx-auto  h-[450px] ">
                    <iframe
                        width="500"
                        height="400"
                        src="https://www.youtube.com/embed/1LPQH6qYBGA"
                        title="YouTube video player"
                        // frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        // allowfullscreen
                    ></iframe>


                </div>
                <div  className="card md:w-[434px] max-w-sm h-[400px] overflow-y-auto shadow-2xl bg-[#108FD9] ">

                    <div className='w-full '>
                        <div   className="container mx-auto p-4">
                            <h2 className="text-3xl text-center text-gray-200 font-bold mb-4">live Chat.. </h2>
                            <div className="flex flex-col gap-2  ">
                                {/* display the chat massage */}
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}

                                        className="flex gap-2"
                                    >
                                        <div className="flex items-center gap-2">
                                            {/* Display user's photo */}

                                            <img
                                                src={msg.user?.photo}
                                                alt="User"
                                                className="w-8 h-8 rounded-full mr-2"
                                            />

                                            <div className="flex flex-col">
                                                <h3 className="text-black ">{msg.user?.name}
                                                    <span style={{ fontSize: '12px', }} className="text-gray-500 ml-2"> {formatTime(msg?.timestamp)}</span>
                                                </h3>
                                                <h2 className="text-gray-200">{msg.text}</h2>
                                            </div>
                                        </div>
                                        <div ref={messagesEndRef}></div>
                                    </div>
                                    
                                ))}
                                {/* <div ref={messagesEndRef}></div> */}
                            </div>
                            <form onSubmit={handleMessageSubmit} className="mt-4">
                                <div className="w-full relative">
                                    <input
                                        type="text"
                                        className="border text-sm rounded-full block w-full p-2.5 bg-[F5EFDB] border-gray-300 "
                                        placeholder="Type your message..."
                                        value={messageInput}
                                        onChange={(e) => setMessageInput(e.target.value)}
                                    />
                                    <button
                                        type="submit"
                                        className="absolute inset-y-0 end-0 flex items-center pe-3"
                                    >
                                        <BsSend className="text-black" />
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;