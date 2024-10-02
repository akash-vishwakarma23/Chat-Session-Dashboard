import React from "react";
import CardSession from "../partials/CardSession";

const Sidepart = ({ setSelectedSessionId }) => {
  return (
    <div className="h-[91vh] lg:w-[30vw] px-5 py-2 ">
      <h1 className="text-lg font-semibold mb-4 py-2">Messanging</h1>
      <div className="h-[80vh] overflow-hidden overflow-y-auto  ">
        <CardSession setSelectedSessionId={setSelectedSessionId} />
      </div>
    </div>
  );
};

export default Sidepart;
