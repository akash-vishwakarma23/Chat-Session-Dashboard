import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";

const Rightpart = ({ selectedSessionId }) => {
  const [messageData, setMessageData] = useState([]);

  const getMessage = async () => {
    try {
      const { data } = await axios.get(
        "https://admin-backend-docker-india-306034828043.asia-south2.run.app/nlp/api/chat_sessions?page=1&per_page=20"
      );
      setMessageData(data.chat_sessions);
    } catch (error) {
      console.log("Error:", error);
    }
  };

  useEffect(() => {
    getMessage();
  }, []);

  const selectedSession = messageData.find(
    (session) => session.id === selectedSessionId
  );

  return (
    <div className="w-[70vw] h-[91vh] px-5 hidden lg:block ">
      <div className="flex items-center gap-2 py-2">
        <img
          className="w-10 h-10 bg-black rounded-full object-cover mr-4"
          src="https://images.unsplash.com/photo-1642724978500-c13b821afe04?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
        />
        <h1 className="text-lg font-semibold mb-4">
          {selectedSession ? selectedSession.name : "No Session Selected"}
        </h1>
      </div>
      <div className="h-[81vh] overflow-hidden overflow-y-auto">
        {selectedSession && selectedSession.messages.length > 0 ? (
          selectedSession.messages.map((msg) => (
            <div
              key={msg.id}
              className={`relative w-1/3 pt-4 ${
                msg.action === "USER" ? "ml-auto text-right" : ""
              }`}
            >
              <h2
                className={`text-sm text-white px-3 py-1   rounded-md rounded-tr-none ${
                  msg.action === "AI" ? "bg-[#000929]" : "bg-[#2E3B5B]"
                }`}
              >
                {msg.content}
              </h2>
              <h5 className="text-right px-2 text-xs text-zinc-400">
                {formatDistanceToNow(new Date(msg.timestamp), {
                  addSuffix: true,
                })}
              </h5>
            </div>
          ))
        ) : (
          <p>No messages available for this session.</p>
        )}
      </div>
    </div>
  );
};

export default Rightpart;
