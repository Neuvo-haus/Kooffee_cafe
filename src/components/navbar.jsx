import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router-dom";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { IoCloseOutline } from "react-icons/io5";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "THE CAFE", path: "/the-cafe" },
  { label: "MENU", path: "/menu" },
  { label: "MOMENTS", path: "/moments" },
  { label: "VISIT", path: "/visits" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <div className="fixed z-40 w-full h-20 flex items-center justify-between border-b border-black/10 px-6 md:px-16 lg:px-40 select-none backdrop-blur-2xl">
        <div className='text-black font-["Cormorant_Garamond"] font-light italic text-2xl md:text-3xl'>
          Kooffee
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex gap-6 lg:gap-10">
          {navItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              end={item.path === "/"}
              className="relative cursor-pointer"
            >
              {({ isActive }) => (
                <motion.div
                  initial={false}
                  animate={isActive ? "active" : "rest"}
                  whileHover="hover"
                >
                  <span
                    className={`block pb-1 font-dmsans text-xs lg:text-sm transition-opacity duration-300 ${
                      isActive ? "opacity-100" : "opacity-50 hover:opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>

                  <motion.div
                    variants={{
                      rest: { scaleX: 0 },
                      hover: { scaleX: 1 },
                      active: { scaleX: 1 },
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                    }}
                    className="absolute left-0 bottom-0 h-px w-full bg-[rgba(200,169,110,1)] origin-left"
                  />
                </motion.div>
              )}
            </NavLink>
          ))}
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden text-2xl text-[rgba(28,28,26,1)]"
          onClick={() => setMobileOpen(true)}
        >
          <HiOutlineMenuAlt3 />
        </button>
      </div>

      {/* Mobile Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed inset-0 z-50 backdrop-blur-xl flex flex-col items-center justify-center"
            style={{ background: "linear-gradient(180deg, rgba(245,240,232,0.98) 0%, rgba(232,213,176,0.98) 50%, rgba(220,200,170,0.98) 100%)" }}
          >
            <button
              className="absolute top-6 right-6 text-3xl text-[rgba(28,28,26,1)]"
              onClick={() => setMobileOpen(false)}
            >
              <IoCloseOutline />
            </button>

            <div className='font-["Cormorant_Garamond"] italic text-3xl text-[rgba(28,28,26,1)] mb-16'>
              Kooffee
            </div>

            <nav className="flex flex-col items-center gap-8">
              {navItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.path}
                  end={item.path === "/"}
                  onClick={() => setMobileOpen(false)}
                  className="relative"
                >
                  {({ isActive }) => (
                    <span
                      className={`font-dmsans text-lg tracking-[0.2em] uppercase transition-all duration-300 ${
                        isActive
                          ? "text-[rgba(28,28,26,1)] border-b border-[rgba(200,169,110,1)] pb-1"
                          : "text-[rgba(140,136,128,1)]"
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </NavLink>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;