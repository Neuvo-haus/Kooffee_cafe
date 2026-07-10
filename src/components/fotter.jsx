import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiMessageCircle, FiMapPin } from "react-icons/fi";
import { CONTACT, CONTACT_LINKS, SITE_HOURS } from "../config/site";

const Footer = () => {
  return (
    <footer className="w-full min-w-0 relative flex flex-col items-center pt-20 md:pt-32 pb-8 md:pb-12 border-t border-[rgba(226,221,213,0.5)] overflow-hidden">
      
      {/* Decorative large background text */}
      <div className="hidden md:block absolute top-10 left-1/2 -translate-x-1/2 text-[15vw] font-['Cormorant_Garamond'] italic text-[rgba(226,221,213,0.3)] whitespace-nowrap pointer-events-none select-none z-0">
        Slow down.
      </div>

      <div className="w-[90%] md:w-[85%] lg:w-[75%] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 md:gap-8 mb-16 md:mb-24 relative z-10">
        
        {/* Brand Column (Larger) */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-5 flex flex-col gap-6 md:gap-8 lg:pr-10">
          <Link to="/" className="flex flex-col gap-2 w-fit group">
            <h1 className="text-5xl md:text-6xl font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] group-hover:text-[#C4A882] transition-colors duration-500">
              Kooffee
            </h1>
            <div className="w-8 h-[1px] bg-[rgba(28,28,26,1)] group-hover:w-16 transition-all duration-500"></div>
          </Link>
          <p className="font-dmsans text-[rgba(100,96,88,1)] text-[14px] md:text-[15px] leading-relaxed max-w-full sm:max-w-[90%]">
            Specialty coffee, slow mornings, and mindful spaces in the heart of Ahmedabad. We built a place for time to stand still.
          </p>
          <div className="flex gap-4 mt-2">
            <a href={CONTACT_LINKS.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="select-none w-10 h-10 rounded-full border border-[rgba(226,221,213,1)] flex items-center justify-center text-[rgba(140,136,128,1)] hover:bg-[rgba(28,28,26,1)] hover:text-white hover:border-[rgba(28,28,26,1)] transition-all duration-300">
              <FiInstagram className="text-[15px]" />
            </a>
            <a href={CONTACT_LINKS.whatsapp} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="select-none w-10 h-10 rounded-full border border-[rgba(226,221,213,1)] flex items-center justify-center text-[rgba(140,136,128,1)] hover:bg-[rgba(28,28,26,1)] hover:text-white hover:border-[rgba(28,28,26,1)] transition-all duration-300">
              <FiMessageCircle className="text-[15px]" />
            </a>
            <a href={CONTACT_LINKS.map} target="_blank" rel="noreferrer" aria-label="Map" className="select-none w-10 h-10 rounded-full border border-[rgba(226,221,213,1)] flex items-center justify-center text-[rgba(140,136,128,1)] hover:bg-[rgba(28,28,26,1)] hover:text-white hover:border-[rgba(28,28,26,1)] transition-all duration-300">
              <FiMapPin className="text-[15px]" />
            </a>
          </div>
        </div>

        {/* Navigation Column */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-[10px] uppercase font-bold">
            Explore
          </h6>
          <nav className="flex flex-col gap-4 font-dmsans text-[13px] md:text-[14px] text-[rgba(28,28,26,0.9)]">
            <Link to="/" className="w-fit flex items-center gap-2 group">
              <span className="w-0 h-[1px] bg-[#C4A882] group-hover:w-3 transition-all duration-300"></span>
              <span className="group-hover:text-[#C4A882] transition-colors">Home</span>
            </Link>
            <Link to="/the-cafe" className="w-fit flex items-center gap-2 group">
              <span className="w-0 h-[1px] bg-[#C4A882] group-hover:w-3 transition-all duration-300"></span>
              <span className="group-hover:text-[#C4A882] transition-colors">The Café</span>
            </Link>
            <Link to="/menu" className="w-fit flex items-center gap-2 group">
              <span className="w-0 h-[1px] bg-[#C4A882] group-hover:w-3 transition-all duration-300"></span>
              <span className="group-hover:text-[#C4A882] transition-colors">Menu</span>
            </Link>
            <Link to="/moments" className="w-fit flex items-center gap-2 group">
              <span className="w-0 h-[1px] bg-[#C4A882] group-hover:w-3 transition-all duration-300"></span>
              <span className="group-hover:text-[#C4A882] transition-colors">Moments</span>
            </Link>
            <Link to="/visits" className="w-fit flex items-center gap-2 group">
              <span className="w-0 h-[1px] bg-[#C4A882] group-hover:w-3 transition-all duration-300"></span>
              <span className="group-hover:text-[#C4A882] transition-colors">Visit Us</span>
            </Link>
            <Link to="/reservations" className="w-fit flex items-center gap-2 group">
              <span className="w-0 h-[1px] bg-[#C4A882] group-hover:w-3 transition-all duration-300"></span>
              <span className="group-hover:text-[#C4A882] transition-colors">Reservations</span>
            </Link>
          </nav>
        </div>

        {/* Info Column */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-6">
          <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-[10px] uppercase font-bold">
            Info
          </h6>
          <div className="flex flex-col gap-4 font-dmsans text-[13px] md:text-[14px] text-[rgba(28,28,26,0.9)]">
            <Link to="/moments" className="hover:text-[#C4A882] transition-colors">Journal / Blog</Link>
            <Link to="/reservations" className="hover:text-[#C4A882] transition-colors">Reserve a Table</Link>
            <a href={CONTACT_LINKS.mediaKit} className="hover:text-[#C4A882] transition-colors">Press & Media</a>
            <a href={`mailto:${CONTACT.email}?subject=Careers%20at%20Kooffee`} className="hover:text-[#C4A882] transition-colors">Careers</a>
            <Link to="/visits" className="hover:text-[#C4A882] transition-colors">Contact Us</Link>
          </div>
        </div>

        {/* Location & Hours Column */}
        <div className="col-span-1 sm:col-span-2 lg:col-span-3 flex flex-col gap-6">
          <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-[10px] uppercase font-bold">
            Visit
          </h6>
          <div className="flex flex-col gap-4 font-dmsans text-[13px] md:text-[14px] leading-relaxed text-[rgba(28,28,26,0.9)]">
            <p>
              Ground Floor, Heritage House<br/>
              Near Law Garden, Navrangpura<br/>
              Ahmedabad, Gujarat 380001
            </p>
            <div className="h-[1px] w-12 bg-[rgba(226,221,213,1)] my-1"></div>
            <p className="flex flex-col gap-1">
              <span className="text-[rgba(140,136,128,1)] text-[11px] uppercase tracking-wider font-bold">Open Daily</span>
              {SITE_HOURS.standard}
            </p>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="w-[90%] md:w-[85%] lg:w-[75%] pt-6 md:pt-8 border-t border-[rgba(226,221,213,1)] flex flex-col lg:flex-row justify-between items-center gap-6 md:gap-4 font-dmsans text-[11px] md:text-xs text-[rgba(140,136,128,1)] relative z-10">
        <p className="text-center tracking-wide lg:text-left">© {new Date().getFullYear()} Kooffee Cafe. All rights reserved.</p>
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 tracking-wide text-center">
          <span className="uppercase text-[rgba(140,136,128,0.8)]">Privacy (Coming Soon)</span>
          <span className="uppercase text-[rgba(140,136,128,0.8)]">Terms (Coming Soon)</span>
          <span className="uppercase text-[rgba(140,136,128,0.8)]">Cookies (Coming Soon)</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
