import React, { useEffect, useState } from "react";
import { socket } from "../../utils/socket";
import axios from "axios";
import { useSelector } from "react-redux";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [admin, setAdmin] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const userId = user?.user?._id;

  useEffect(() => {
    if (!userId) return;

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const fetchAdminAndMessages = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5000/api/auth/users",
          config
        );
        console.log("res", res);
        const _admin = res.data.data.find((u) => u.role === "admin");
        console.log("_admin", _admin);
        if (_admin) {
          setAdmin(_admin);
          socket.emit("join", userId);

          const messagesRes = await axios.post(
            "http://localhost:5000/api/messages",
            { userId }
          );
          setMessages(messagesRes.data);

          socket.on("message", (msg) => {
            if (msg.sender === _admin._id || msg.receiver === _admin._id) {
              setMessages((prev) => [...prev, msg]);
            }
          });
        }
      } catch (error) {
        console.error("Error fetching admin or messages:", error);
      }
    };

    fetchAdminAndMessages();

    return () => socket.off("message");
  }, [userId]);

  const sendMessage = () => {
    if (!text || !userId) return;

    socket.emit("message", {
      sender: userId,
      message: text,
    });
    setText("");
  };

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="text-xl font-bold">Chat with Admin</h2>
      <div className="h-96 overflow-y-auto border p-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.sender === userId ? "text-right" : "text-left"}
          >
            <p>{msg.message}</p>
          </div>
        ))}
      </div>
      <input
        className="border p-1 w-full"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />
      <button
        className="bg-green-500 text-white px-4 py-1 mt-1"
        onClick={sendMessage}
      >
        Send
      </button>
    </div>
  );
};

export default Chat;
