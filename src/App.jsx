import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./Pages/Home";
import Dash from "./Pages/Dash";
import { useState } from "react";
import MusicDetails from "./Pages/MusicDetails";
import Navber from "./Components/Navber";
import Library from "./Pages/Library";
function App() {
  const [fullCenterDisplay, setFullCenterDisplay] = useState(false)
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home fullCenterDisplay={fullCenterDisplay} setFullCenterDisplay={setFullCenterDisplay}/>}>
          <Route path="/" element={<Dash />} />
          <Route path="/music" element={<MusicDetails />} />
          <Route path="/library" element={<Library />} />
        </Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App;
