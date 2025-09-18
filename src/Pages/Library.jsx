import React from "react";
import Navber from "../Components/Navber";
import { Plus } from "lucide-react";
import { motion } from "framer-motion";


const Library = () => {
  return (
    <div>
      <Navber />
      <motion.div
        initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
       className="mx-4 my-2 md:my-5">
        <div className="flex justify-between items-center">
          <h1 className="headline-3">Your Library</h1>
          <div className="menu-btn">
            <Plus />
          </div>
        </div>
        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 mt-5">
          <div className="w-30 h-30 md:w-50 md:h-50">
            <img
              src="/Banner.jpg"
              alt=""
              className="w-full h-full object-cover rounded md:rounded-lg"
            />
            <p className="text-xs md:text-sm text-zinc-400 mt-2 md:mt-3 w-full">
              Rap battle - Drake ft PartyNextDoor
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Library;
