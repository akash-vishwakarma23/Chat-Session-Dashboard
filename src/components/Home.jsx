import React, { useEffect, useState } from "react";
import Header from "./Header";
import Sidepart from "./Sidepart";
import Rightpart from "./Rightpart";
import axios from "axios";

const Home = () => {
  const [selectedSessionId, setSelectedSessionId] = useState(null);

  return (
    <div className="w-full h-screen">
      <Header />

      <div className="flex ">
        <Sidepart setSelectedSessionId={setSelectedSessionId} />
        <Rightpart selectedSessionId={selectedSessionId} />
      </div>
    </div>
  );
};

export default Home;
