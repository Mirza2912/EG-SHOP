import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function ChatsPage() {
  const [messageText, setMessageText] = useState("");
  const [recipientId, setRecipientId] = useState("");
  const [conversations, setConversatrions] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const [singleChat, setSingleChat] = useState(null);

  const { user } = useSelector((state) => state.auth);
  // console.log(user);

  // console.log(singleChat);
  // console.log(conversations);
  // console.log("onclick : " + activeChat);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const sendMessageToSpecificUser = async ({ message, recipientId }) => {
    try {
      const res = await axios.post(
        `/api/messages/send`,
        { message, recipientId },
        config
      );
      // console.log(res?.data?.message);
    } catch (error) {
      console.error("Error fetching admin or messages:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (messageText.trim() === "") return;

    const data = {
      message: messageText,
      recipientId: activeChat,
    };

    sendMessageToSpecificUser(data);
    setMessageText("");
    await fetchAllConversations();
    await fetchActiveChat(activeChat);
  };

  const fetchAllConversations = async () => {
    try {
      const res = await axios.get(`/api/messages/conversation`);

      setConversatrions(res?.data?.conversations);

      if (!activeChat && res?.data?.conversations?.length > 0) {
        const firstChatId =
          res?.data?.conversations &&
          res?.data?.conversations[0]?.conversation?.participants?.find(
            (part) => part?.role === "user"
          )._id;
        // setActiveChat(firstChatId);
        // console.log(firstChatId);
      }
    } catch (error) {
      console.error("Error fetching admin or messages:", error);
    }
  };

  const fetchActiveChat = async (id) => {
    try {
      const recipientId = id;
      const res = await axios.get(`/api/messages/conversation/${recipientId}`);
      setSingleChat(res?.data);
    } catch (error) {
      console.error("Error fetching admin or messages:", error);
    }
  };

  const markAsRead = async (id) => {
    try {
      let recipientId = id;

      const res = await axios.put(`/api/messages/read/${recipientId}`);
      await fetchAllConversations();
    } catch (error) {
      console.error("Error mark as read:", error);
    }
  };

  const fetchAllMessages = async () => {
    try {
      const res = await axios.get(`/api/messages/all`);
      console.log(res.data);
    } catch (error) {
      console.error("Error fetching admin or messages:", error);
    }
  };

  useEffect(() => {
    fetchAllConversations();
  }, []);

  useEffect(() => {
    if (activeChat) {
      fetchActiveChat(activeChat);
    }
  }, [activeChat]);

  return (
    <div className="p-6 h-[calc(100vh-64px)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Customer Support</h1>
      </div>

      <div className="flex flex-1 gap-6 h-full overflow-hidden">
        {/* Chat List */}
        <div className="w-1/3 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col">
          {/* <div className="p-4 border-b">
            <div className="relative">
              <input
                type="text"
                placeholder="Search conversations..."
                className="w-full h-10 pl-10 pr-4 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-400 absolute left-3 top-2.5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
          </div> */}

          <div className="flex border-b">
            <button className="flex-1 py-4 text-center text-sm font-medium text-orange-500 border-b-2 border-orange-500">
              All Chats
            </button>
          </div>

          <div className="overflow-y-auto flex-1">
            {conversations &&
              conversations.map((con) => {
                const unRead = con.messages?.filter(
                  (msg) => msg.sender?._id !== user?.user?._id && !msg.isRead
                ).length;

                return (
                  <div
                    key={con.conversation._id}
                    className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${
                      activeChat ===
                      con.conversation?.participants?.find(
                        (part) => part?.role === "user"
                      )?._id
                        ? "bg-orange-50"
                        : ""
                    }`}
                    onClick={() => {
                      const id = con.conversation?.participants?.find(
                        (part) => part?.role === "user"
                      )?._id;

                      setActiveChat(id);
                      markAsRead(id);
                    }}
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                          {con.conversation?.participants
                            ?.find((part) => part?.role === "user")
                            ?.name?.charAt(0)}
                          {/* {con.conversation?.participants &&
                          con.conversation?.participants[[1]?.name?.charAt(0)]} */}
                        </div>
                        {con.conversation?.participants?.find(
                          (part) => part?.role === "user"
                        )?.isOnline && (
                          <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start">
                          <h3 className="text-sm font-medium truncate">
                            {
                              con.conversation?.participants?.find(
                                (part) => part?.role === "user"
                              )?.name
                            }
                          </h3>
                          <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                            {new Date(
                              con.conversation?.updatedAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1 truncate">
                          {con.messages.at(-1)?.message}
                        </p>
                      </div>
                      {unRead > 0 && (
                        <div className="ml-2 bg-orange-500 text-white text-xs font-medium rounded-full h-5 w-5 flex items-center justify-center">
                          {unRead}
                        </div>
                      )}
                    </div>

                    {/* <div className="flex mt-2">
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        chat.type === "customer"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-purple-100 text-purple-800"
                      }`}
                    >
                      {chat.type === "customer" ? "Customer" : "Team"}
                    </span>
                    {chat.id === 1 && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-800 ml-2">
                        Order Issue
                      </span>
                    )}
                  </div> */}
                  </div>
                );
              })}
          </div>
        </div>

        {/* Chat Window */}
        <div className="flex-1 bg-white rounded-lg border border-gray-200 shadow-sm flex flex-col">
          {singleChat && (
            <>
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium">
                      {singleChat?.conversation?.participants
                        ?.find((part) => part?.role === "user")
                        ?.name?.charAt(0)}
                    </div>
                    {singleChat?.conversation?.participants?.find(
                      (part) => part?.role === "user"
                    )?.isOnline === true ? (
                      <div
                        className={`absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-500 border-2 border-white`}
                      ></div>
                    ) : (
                      <></>
                    )}
                  </div>
                  <div>
                    <h3 className="font-medium">
                      {" "}
                      {
                        singleChat?.conversation?.participants?.find(
                          (part) => part?.role === "user"
                        )?.name
                      }
                    </h3>
                    {/* <p className="text-xs text-gray-500">
                      Online • Last active 2m ago
                    </p> */}
                  </div>
                </div>
                {/* <div className="flex gap-2">
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M15.05 5A5 5 0 0 1 19 8.95M15.05 1A9 9 0 0 1 23 8.94m-1 7.98v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M23 7l-7 5 7 5V7z" />
                      <rect x="1" y="5" width="15" height="14" rx="2" ry="2" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full hover:bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-500"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </button>
                </div> */}
              </div>

              <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                <div className="space-y-4">
                  {/* <div className="text-center">
                    <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                      Today, 10:32 AM
                    </span>
                  </div> */}

                  {singleChat?.messages?.map((message) => (
                    <div
                      key={message._id}
                      className={`flex ${
                        message.sender?.role === "admin"
                          ? "justify-end"
                          : "justify-start"
                      }`}
                    >
                      {message.sender?.role === "user" && (
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium mr-2">
                          {message.sender?.name?.charAt(0)}
                        </div>
                      )}
                      <div
                        className={`max-w-[70%] px-4 py-2 rounded-lg ${
                          message.sender?.role === "admin"
                            ? "bg-orange-500 text-white rounded-tr-none"
                            : "bg-white border border-gray-200 rounded-tl-none"
                        }`}
                      >
                        <p className="text-sm">{message?.message}</p>
                        {/* <p
                          className={`text-xs mt-1 text-right ${
                            message.sender?.role === "admin"
                              ? "text-orange-100"
                              : "text-gray-500"
                          }`}
                        >
                          {message?.message}
                        </p> */}
                      </div>
                      {message.sender?.role === "admin" && (
                        <div className="h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-medium ml-2">
                          A
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 border-t">
                <form
                  onSubmit={handleSendMessage}
                  className="flex items-end gap-2"
                >
                  <div className="flex-1 relative">
                    <textarea
                      value={messageText}
                      onChange={(e) => {
                        setMessageText(e.target.value);
                      }}
                      placeholder="Type your message..."
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent resize-none"
                      rows={2}
                    />
                    <div className="absolute bottom-2 right-2 flex gap-1">
                      <button
                        type="button"
                        className="p-1 text-gray-500 hover:text-gray-700"
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
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="p-1 text-gray-500 hover:text-gray-700"
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
                          <rect
                            x="3"
                            y="3"
                            width="18"
                            height="18"
                            rx="2"
                            ry="2"
                          />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <polyline points="21 15 16 10 5 21" />
                        </svg>
                      </button>
                      <button
                        type="button"
                        className="p-1 text-gray-500 hover:text-gray-700"
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
                          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                          <polyline points="14 2 14 8 20 8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="bg-orange-500 hover:bg-orange-600 text-white p-2 rounded-lg"
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
                </form>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
