import React from "react";
import { motion } from "framer-motion";

const RecentListen = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="mx-4 my-5 md:my-0"
    >
      <div>
        <h1 className="headline-3">Based on your recent listening</h1>
        <div className="overflow-x-auto scrollbar-hide scrollbar-track-transparent">
          <div className="flex mt-5 gap-4 flex-shrink-0 w-40 md:w-80 h-40 md:h-80">
            <div className="w-30 md:w-50 h-30 md:h-50 flex-shrink-0">
              <img
                src="/Banner.jpg"
                alt=""
                className="h-full w-full object-cover rounded md:rounded-lg"
              />
              <p className="text-xs md:text-sm text-zinc-400 mt-2 md:mt-3 w-full">
                Rap battle - Drake ft PartyNextDoor
              </p>
            </div>
            <div className="w-30 md:w-50 h-30 md:h-50 flex-shrink-0">
              <img
                src="/Banner.jpg"
                alt=""
                className="h-full object-cover rounded md:rounded-lg"
              />
              <p className="text-xs md:text-sm text-zinc-400 mt-2 md:mt-3">
                Rap battle - Drake ft PartyNextDoor
              </p>
            </div>
            <div className="w-30 md:w-50 h-30 md:h-50 flex-shrink-0">
              <img
                src="/Banner.jpg"
                alt=""
                className="h-full object-cover rounded md:rounded-lg"
              />
              <p className="text-xs md:text-sm text-zinc-400 mt-2 md:mt-3">
                Rap battle - Drake ft PartyNextDoor
              </p>
            </div>
            <div className="w-30 md:w-50 h-30 md:h-50 flex-shrink-0">
              <img
                src="/Banner.jpg"
                alt=""
                className="h-full object-cover rounded md:rounded-lg"
              />
              <p className="text-xs md:text-sm text-zinc-400 mt-2 md:mt-3">
                Rap battle - Drake ft PartyNextDoor
              </p>
            </div>
            <div className="w-30 md:w-50 h-30 md:h-50 flex-shrink-0">
              <img
                src="/Banner.jpg"
                alt=""
                className="h-full object-cover rounded md:rounded-lg"
              />
              <p className="text-xs md:text-sm text-zinc-400 mt-2 md:mt-3">
                Rap battle - Drake ft PartyNextDoor
              </p>
            </div>
            <div className="w-30 md:w-50 h-30 md:h-50 flex-shrink-0">
              <img
                src="/Banner.jpg"
                alt=""
                className="h-full object-cover rounded md:rounded-lg"
              />
              <p className="text-xs md:text-sm text-zinc-400 mt-2 md:mt-3">
                Rap battle - Drake ft PartyNextDoor
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default RecentListen;
