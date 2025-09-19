import React, { useState } from "react";
import { motion } from "framer-motion";
import LeftSidebar from "../Components/LeftSidebar";
import Center from "../Components/Center";
import RightSidebar from "../Components/RightSidebar";
import BottomBar from "../Components/BottomBar";

const Home = ({ fullCenterDisplay, setFullCenterDisplay }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 5 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="block md:grid md:grid-cols-8 lg:grid-cols-14 gap-3"
    >
      <LeftSidebar
        fullCenterDisplay={fullCenterDisplay}
        setFullCenterDisplay={setFullCenterDisplay}
      />
      <Center
        fullCenterDisplay={fullCenterDisplay}
        setFullCenterDisplay={setFullCenterDisplay}
      />
      <RightSidebar
        fullCenterDisplay={fullCenterDisplay}
        setFullCenterDisplay={setFullCenterDisplay}
      />
      <BottomBar />
    </motion.div>
  );
};

export default Home;
