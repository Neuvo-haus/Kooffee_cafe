
import Navbar from "./components/navbar";
import Home from "./home";
import Menu from "./menu";
import TheCafe from "./the_cafe";
import Visits from "./visits";   
import Moments from "./moments";  
import Reservations from "./reservations";  
import ReservationEdit from "./reservation_edit";
import AdminApp from "./admin"; 
import { Routes, Route, useLocation } from "react-router-dom"; 
import Footer from "./components/fotter"; 
import ScrollToTop from "./components/ScrollToTop";
import { AnimatePresence } from "framer-motion"; 
import PageTransition from "./components/PageTransition";
 

function App() {
  const location = useLocation(); 
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen w-full min-w-0 flex flex-col bg-[rgba(245,240,232,1)]">
      <ScrollToTop />
      {!isAdminRoute && <Navbar className="absolute top-0 left-0 right-0 z-50" />}
      <div className={`flex-1 flex min-w-0 justify-center w-full ${isAdminRoute ? "block" : ""}`}>
        <AnimatePresence mode="wait"> 
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageTransition><Home /></PageTransition>} />
            <Route path="/the-cafe" element={<PageTransition><TheCafe /></PageTransition>} />
            <Route path="/menu" element={<PageTransition><Menu /></PageTransition>} />
            <Route path="/moments" element={<PageTransition><Moments /></PageTransition>} />
            <Route path="/visits" element={<PageTransition><Visits /></PageTransition>} />
            <Route path="/reservations" element={<PageTransition><Reservations /></PageTransition>} />
            <Route path="/reservations/edit/:id" element={<PageTransition><ReservationEdit /></PageTransition>} />
            <Route path="/admin/*" element={<AdminApp />} />
          </Routes>
        </AnimatePresence>
      </div>
      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App
