
import Navbar from "./navbar";
import Home from "./home";
import Menu from "./menu";
import TheCafe from "./the_cafe";
import Visits from "./visits";
import Moments from "./moments";
import { Routes, Route } from "react-router-dom";


function App() {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[rgba(245,240,232,1)]">
      <Navbar className="absolute top-0 left-0 right-0 z-50" />
      <div className="flex-1 flex justify-center">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/the-cafe" element={<TheCafe />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/moments" element={<Moments />} />
          <Route path="/visits" element={<Visits />} />
        </Routes>
      </div>
    </div>
  );
}

export default App