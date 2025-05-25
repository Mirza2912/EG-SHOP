import React, { useEffect, useRef, useState } from "react";
import { socket } from "../../utils/socket";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [admin, setAdmin] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.user?._id;
  // console.log(messages && messages[messages.length - 1]);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const fetchMessages = async () => {
    try {
      // setLoading(true);
      const res = await axios.get("/api/messages/conversation", config);
      setMessages(res.data.messages);
      // setLoading(false);
    } catch (err) {
      console.error(err);
      // setLoading(false);
    }
  };

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      const res = await axios.post(
        "/api/messages/send",
        { message: text },
        config
      );
      // console.log(res.data);

      socket.emit("message", {
        sender: userId,
        message: text,
      });
      setMessages([...messages, res.data.message]);
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchMessages();

    socket.emit("join", user._id);

    socket.on("receiveMessage", (newMsg) => {
      setMessages((prev) => [...prev, newMsg]);
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, []);
  const scrollRef = useRef(null);

  // Scroll only inside message box
  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  // useEffect(() => {
  //   if (!userId) return;

  //   const config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   };

  //   const fetchAdminAndMessages = async () => {
  //     try {
  //       const res = await axios.get("/api/auth/users", config);
  //       // console.log("res", res);
  //       const _admin = res.data.data.find((u) => u.role === "admin");
  //       // console.log("_admin", _admin);
  //       if (_admin) {
  //         setAdmin(_admin);
  //         socket.emit("join", userId);

  //         const messagesRes = await axios.post(
  //           "/api/messages",
  //           { userId },
  //           config
  //         );
  //         console.log(messagesRes);

  //         setMessages(messagesRes.data);

  //         socket.on("message", (msg) => {
  //           if (msg.sender === _admin._id || msg.receiver === _admin._id) {
  //             setMessages((prev) => [...prev, msg]);
  //           }
  //         });
  //       }
  //     } catch (error) {
  //       console.error("Error fetching admin or messages:", error);
  //     }
  //   };

  //   fetchAdminAndMessages();

  //   return () => socket.off("message");
  // }, [userId]);

  // const sendMessage = () => {
  //   if (!text || !userId) return;

  //   socket.emit("message", {
  //     sender: userId,
  //     message: text,
  //   });
  //   setText("");
  // };

  return (
    <div className="min-h-screen -mt-7 flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg flex flex-col h-[80vh] my-auto">
        {/* Header */}
        <div className="px-6 py-4 border-b">
          <h2 className="text-2xl font-semibold text-orange-500">
            Chat with Admin
          </h2>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-6 py-4 space-y-3"
        >
          {messages &&
            messages.map((msg) => {
              const isUser = msg.sender?.role === "user";
              const isAdmin = msg.sender?.role === "admin";
              const initial = isAdmin
                ? "A"
                : msg.sender?.name?.charAt(0)?.toUpperCase();

              return (
                <div
                  key={msg._id}
                  className={`flex items-end gap-2 mb-3 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {/* Avatar on left for Admin */}
                  {isAdmin && (
                    <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600  font-medium">
                      {initial}
                    </div>
                  )}

                  {/* Message Bubble */}
                  <div
                    className={`max-w-[70%] px-4 py-2 rounded-lg text-sm shadow ${
                      isUser
                        ? "bg-orange-500 text-white rounded-br-none"
                        : "bg-white border border-gray-200 text-gray-800 rounded-bl-none"
                    }`}
                  >
                    <p>{msg?.message}</p>
                  </div>

                  {/* Avatar on right for User */}
                  {isUser && (
                    <div className="h-8 w-8 rounded-full  bg-orange-100 flex items-center justify-center text-orange-600 font-medium">
                      {initial}
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Input */}
        <div className="border-t px-4 py-3 bg-gray-50 flex items-center gap-2">
          <input
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type a message..."
          />
          <button
            className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg"
            onClick={sendMessage}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
