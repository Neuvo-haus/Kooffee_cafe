import React from "react";
import { Link } from "react-router-dom";
import { FiInstagram, FiPhone, FiMail } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="w-full flex flex-col items-center bg-transparent pt-16 md:pt-20 pb-8 md:pb-10">
      <div className="w-[90%] md:w-[80%] grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 mb-12 md:mb-16">
        {/* Brand Column */}
        <div className="col-span-2 md:col-span-1 flex flex-col gap-4">
          <h1 className="text-3xl md:text-4xl font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] mb-2">
            Kooffe
          </h1>
          <p className="font-dmsans text-[rgba(140,136,128,1)] text-[13px] md:text-[14px] leading-relaxed pr-4 md:pr-8">
            Specialty coffee and slow mornings in Ahmedabad.
          </p>
        </div>

        {/* Navigation Column */}
        <div className="flex flex-col gap-4 md:gap-5">
          <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase mb-1 md:mb-2">
            Navigate
          </h6>
          <nav className="flex flex-col gap-2 md:gap-3 font-dmsans text-[13px] md:text-[14px] text-[rgba(28,28,26,0.8)]">
            <Link to="/" className="hover:text-[rgba(200,169,110,1)] transition-colors w-fit">Home</Link>
            <Link to="/the-cafe" className="hover:text-[rgba(200,169,110,1)] transition-colors w-fit">The Café</Link>
            <Link to="/menu" className="hover:text-[rgba(200,169,110,1)] transition-colors w-fit">Menu</Link>
            <Link to="/moments" className="hover:text-[rgba(200,169,110,1)] transition-colors w-fit">Moments</Link>
            <Link to="/visits" className="hover:text-[rgba(200,169,110,1)] transition-colors w-fit">Visit</Link>
          </nav>
        </div>

        {/* Contact Column */}
        <div className="flex flex-col gap-4 md:gap-5">
          <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase mb-1 md:mb-2">
            Contact
          </h6>
          <div className="flex flex-col gap-2 md:gap-3 font-dmsans text-[13px] md:text-[14px] text-[rgba(28,28,26,0.8)]">
            <span>Ahmedabad, Gujarat 380001</span>
            <span>+91 98765 43210</span>
            <span>hello@kooffe.in</span>
          </div>
        </div>

        {/* Connect Column */}
        <div className="flex flex-col gap-4 md:gap-5">
          <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase mb-1 md:mb-2">
            Connect
          </h6>
          <div className="flex gap-4 text-[rgba(28,28,26,0.8)] text-xl">
            <a href="#" className="hover:text-[rgba(200,169,110,1)] transition-colors">
              <FiInstagram />
            </a>
            <a href="#" className="hover:text-[rgba(200,169,110,1)] transition-colors">
              <FiPhone />
            </a>
            <a href="#" className="hover:text-[rgba(200,169,110,1)] transition-colors">
              <FiMail />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="w-[90%] md:w-[80%] pt-6 md:pt-8 border-t border-[rgba(226,221,213,1)] flex flex-col md:flex-row justify-between items-center gap-4 font-dmsans text-xs text-[rgba(140,136,128,1)]">
        <p>© 2024 Kooffe Cafe, Ahmedabad. All rights reserved.</p>
        <div className="flex gap-4 md:gap-6">
          <a href="#" className="hover:text-[rgba(28,28,26,1)] transition-colors">Press</a>
          <a href="#" className="hover:text-[rgba(28,28,26,1)] transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-[rgba(28,28,26,1)] transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
