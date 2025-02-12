import { useState, useRef } from "react";
import { FaWifi, FaBatteryFull, FaVolumeUp, FaUser } from "react-icons/fa";
import userDesktopSVG from "./assets/user-desktop.svg";
import folderHome from "./assets/folder-blue-home.svg";
import "./App.css";

function App() {
  const [selectionBox, setSelectionBox] = useState(null);
  const isSelecting = useRef(false);
  const startCoords = useRef({ x: 0, y: 0 });

  
  const NAVBAR_HEIGHT = 40; 

  const handleMouseDown = (e) => {
    
    if (e.clientY < NAVBAR_HEIGHT) return;

    isSelecting.current = true;
    startCoords.current = { x: e.clientX, y: e.clientY };

    setSelectionBox({
      x: e.clientX,
      y: e.clientY,
      width: 0,
      height: 0,
    });
  };

  const handleMouseMove = (e) => {
    if (!isSelecting.current) return;

    const newX = Math.min(startCoords.current.x, e.clientX);
    const newY = Math.max(NAVBAR_HEIGHT, Math.min(startCoords.current.y, e.clientY));
    const newWidth = Math.abs(e.clientX - startCoords.current.x);
    const newHeight = Math.abs(e.clientY - startCoords.current.y);

    setSelectionBox({
      x: newX,
      y: newY,
      width: newWidth,
      height: newHeight,
    });
  };

  const handleMouseUp = () => {
    isSelecting.current = false;
    setTimeout(() => setSelectionBox(null), 100);
  };

  return (
    <div
      className="w-screen h-screen bg-cover bg-center relative"
      style={{
        backgroundImage:
          "url('https://www.bleepstatic.com/content/hl-images/2020/08/18/kali-blue-header.jpg')",
      }}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
    >
     
      <div className="w-full h-10 bg-black bg-opacity-80 flex justify-between items-center px-4 text-white kalinav absolute top-0 left-0">
        <div className="flex space-x-4 items-center">
        <button className="p-0 rounded-md bg-transparent flex items-center justify-center">
  <img 
    src="https://cdn6.aptoide.com/imgs/3/e/0/3e0ab901df31f403e2826145f5c521a6_icon.png" 
    className="w-6 h-6 object-contain"
  />
</button>

<span className="w-0.5 h-6 bg-white rounded-md"></span>


          <button className="hover:bg-gray-700 py-1 rounded-md">
            <img src={userDesktopSVG} className="w-6 h-6 object-contain"/>
          </button>

          <button className="hover:bg-gray-700py-1 rounded-md">
            <img src={folderHome} className="w-6 h-6 object-contain"/>
          </button>
        </div>

       
        <div className="text-sm font-light">
          {new Date().toLocaleTimeString("en-US", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>

        
        <div className="flex space-x-4 items-center text-lg navright">
          <FaWifi />
          <FaBatteryFull />
          <FaVolumeUp />
          <FaUser className="cursor-pointer hover:text-gray-400" />
        </div>
      </div>

      
      {selectionBox && (
        <div
          className="absolute border border-blue-500"
          style={{
            left: selectionBox.x,
            top: selectionBox.y,
            width: selectionBox.width,
            height: selectionBox.height,
            backgroundColor: "rgba(0, 120, 255, 0.15)", 
            boxShadow: "0 0 10px rgba(0, 120, 255, 0.5) inset",
            backdropFilter: "blur(2px)", 
          }}
        ></div>
      )}
    </div>
  );
}

export default App;
