import React from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "HOME", path: "/" },
  { label: "THE CAFE", path: "/the-cafe" },
  { label: "MENU", path: "/menu" },
  { label: "MOMENTS", path: "/moments" },
  { label: "VISIT", path: "/visits" },
];

const Navbar = () => {
  return (
    <div className="fixed z-40 w-full h-20 flex items-center justify-between border-b border-black/10 px-40 select-none backdrop-blur-2xl">
      <div className='text-black font-["Cormorant_Garamond"] font-light italic text-3xl'>
        Kooffee
      </div>

      <div className="flex gap-10">
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
                  className={`block pb-1 font-dmsans text-sm transition-opacity duration-300 ${
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
    </div>
  );
};

export default Navbar;