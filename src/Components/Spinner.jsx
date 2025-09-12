import React from "react";

const Spinner = () => {
  return (
    <div className="flex justify-center items-center h-40">
      <div className="w-12 h-12 border-4 border-zinc-800 border-t-blue-800 rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
