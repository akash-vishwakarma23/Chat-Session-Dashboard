import axios from "axios";
import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import InfiniteScroll from "react-infinite-scroll-component";

const CardSession = ({ setSelectedSessionId }) => {
  const [sessionData, setsessionData] = useState([]);
  const [page, setpage] = useState(1);
  const [hasMore, sethasMore] = useState(true);

  const getData = async () => {
    try {
      const { data } = await axios.get(
        `https://admin-backend-docker-india-306034828043.asia-south2.run.app/nlp/api/chat_sessions?page=${page}&per_page=20`
      );
      if (data.chat_sessions.length > 0) {
        setsessionData((prev) => [...prev, ...data.chat_sessions]);
        setpage(page + 1);
      } else {
        sethasMore(false);
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  const refershHandler = () => {
    if (sessionData.length === 0) {
      getData();
    } else {
      setpage(1);
      setsessionData([]);
      getData();
    }
  };

  useEffect(() => {
    refershHandler();
  }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={sessionData.length}
        next={getData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
      >
        {sessionData.map((item, index) => (
          <div
            key={index}
            className={`w-full h-[10vh] rounded-xl flex  items-center px-3 border-b-[1px] hover:bg-zinc-400`}
            onClick={() => setSelectedSessionId(item.id)}
          >
            <img
              className="w-10 h-10 bg-black rounded-full object-cover mr-2"
              src="https://images.unsplash.com/photo-1642724978500-c13b821afe04?q=80&w=1480&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
            />
            <h3 className="text-xs w-48 font-semibold">{item.name}</h3>
            <h5 className="ml-1  text-xs text-right text-gray-700 ">
              {" "}
              {item.messages && item.messages.length > 0
                ? formatDistanceToNow(
                    item.messages[item.messages.length - 1].timestamp,
                    { addSuffix: true }
                  )
                : "No messages"}
            </h5>
          </div>
        ))}
      </InfiniteScroll>
    </>
  );
};

export default CardSession;
