import React, { useRef } from "react";
import { CiLocationOn } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { motion, useScroll, useTransform } from "framer-motion";
import background from "./assets/image.jpg";
import first from "./assets/first.jpg";
import second from "./assets/second.jpg";
import third from "./assets/third.jpg";
import CoffeeDivider from "./components/cooffeedivider";
import { FaArrowRight } from "react-icons/fa6";

const Home = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- ANIMATION VALUES ---
  // The goal: Start exactly where the layout puts it, then expand to full screen.

  // WIDTH:
  // Container is 60% wide. Image is half of that (30% of screen).
  // We animate from 30vw to 100vw.
  const width = useTransform(scrollYProgress, [0, 1], ["30vw", "100vw"]);

  // HEIGHT:
  // Container is 70% height. We animate to 100vh.
  const height = useTransform(scrollYProgress, [0, 1], ["70vh", "100vh"]);

  // TOP POSITION:
  // (100vh - 70vh) / 2 = 15vh. This centers the 70vh image vertically.
  // We animate from 15vh down to 0vh.
  const top = useTransform(scrollYProgress, [0, 1], ["15vh", "0vh"]);

  // RIGHT POSITION:
  // The container is centered with w-[60%], so there is 20% margin on the right.
  // We animate from 20vw to 0vw.
  const right = useTransform(scrollYProgress, [0, 1], ["20vw", "0vw"]);

  // Border Radius & Text Opacity
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["1rem", "0rem"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    // 1. REMOVED outer flex to prevent sticky conflicts
    <div className="w-full relative flex items-center flex-col pb-20">
      {/* 2. TRACK: This div creates the scroll distance (300vh tall) */}
      <div ref={containerRef} className="w-full h-[300vh] relative">
        {/* 3. STICKY: This pins the view while scrolling through the 300vh */}
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* --- LAYER 1: TEXT (The "Ghost" Layout) --- */}
          {/* We keep this exactly as your original code to maintain spacing */}
          <motion.div
            style={{ opacity: textOpacity }}
            className="w-[60%] h-[70%] flex z-10"
          >
            {/* Left Content (Visible initially) */}
            <div className="w-1/2 h-full flex items-center">
              <div className="w-full flex flex-col justify-center gap-6">
                <h6 className="font-dmsans italic text-[rgba(140,136,128,1)] text-sm">
                  EST. AHMEDABAD
                </h6>
                <h1 className="text-7xl font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] leading-tight">
                  Kooffee cafe <br /> in Ahmedabad
                </h1>
                <h6 className="font-dmsans italic text-[rgba(140,136,128,1)] text-sm">
                  Specialty coffee. Slow mornings. Open conversations.
                </h6>
                <h6 className="font-dmsans italic text-[rgba(140,136,128,1)] text-sm flex items-center gap-2">
                  <CiLocationOn />
                  Ahmedabad, Gujarat
                  <span className="mx-4">|</span>
                  <IoTimeOutline />
                  Opens 8AM – Closes 10:00 PM
                </h6>
                <div className="flex items-center gap-4 pt-4">
                  <div className="px-6 py-2 border border-black rounded-full bg-black text-sm font-dmsans italic text-white cursor-pointer">
                    VIEW MENU
                  </div>
                  <div className="px-6 py-2 border border-[rgba(226,221,213,1)] rounded-full bg-white text-sm font-dmsans italic text-black cursor-pointer">
                    GET DIRECTIONS
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Spacer (Empty, reserved for the floating image) */}
            <div className="w-1/2 h-full"></div>
          </motion.div>

          {/* --- LAYER 2: THE EXPANDING IMAGE --- */}
          {/* Absolute positioning allows it to break out of the flex box */}
          <motion.div
            style={{
              width,
              height,
              top,
              right,
              borderRadius,
            }}
            className="absolute z-20 overflow-hidden shadow-2xl"
          >
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${background})` }}
            ></div>

            {/* Gradient Overlay */}
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(
                  180deg,
                    rgba(232,213,176,0.6) 0%,
                    rgba(196,168,130,0.6) 50%,
                    rgba(160,133,106,0.6) 100%
                )`,
              }}
            />
          </motion.div>
        </div>
      </div>

      {/* SECTION 2*/}
      <div className="w-full h-fit mt-30 flex gap-10 flex-col items-center justify-center relative z-30">
        <h1 className="text-black text-5xl font-['Cormorant_Garamond'] italic ">
          Why People Stay Longer
        </h1>
        <div className="flex gap-40 mt-20">
          <div className="h-60 w-80 flex gap-3 flex-col items-center relative  ">
            <div
              className="h-20 w-20 rounded-full bg-cover bg-center relative overflow-hidden"
              style={{ backgroundImage: `url(${first})` }}
            >
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(
                  180deg,
        rgba(232, 213, 176, 0.7) 0%,
        rgba(196, 168, 130, 0.7) 50%,
        rgba(160, 133, 106, 0.7) 100%
      )`,
                }}
              />
            </div>
            <div className="font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] font-medium text-3xl">
              Slow Morning
            </div>
            <div className="font-dmsans text-center text-[rgba(140,136,128,1)]">
              A corner table reserved for no one. Stay as long as you need. The light here moves slowly too.
            </div>
          </div>
          <div className="h-60 w-80 flex gap-3 flex-col items-center relative   ">
            <div
              className="h-20 w-20 rounded-full bg-cover bg-center relative overflow-hidden"
              style={{ backgroundImage: `url(${second})` }}
            >
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(
        180deg,
        rgba(232, 213, 176, 0.7) 0%,
        rgba(196, 168, 130, 0.7) 50%,
        rgba(160, 133, 106, 0.7) 100%
      )`,
                }}
              />
            </div>
            <div className="font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] font-medium text-3xl">
              Deep Conversation
            </div>
            <div className="font-dmsans text-center text-[rgba(140,136,128,1)]">
              Some tables face each other for a reason. This is where friendships deepen and ideas take shape.
            </div>
          </div>
          <div className="h-60 w-80 flex gap-3 flex-col items-center relative   ">
            <div
              className="h-20 w-20 rounded-full bg-cover bg-center relative overflow-hidden"
              style={{ backgroundImage: `url(${third})` }}
            >
              {/* Gradient Overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: `linear-gradient(
        180deg,
        rgba(232, 213, 176, 0.7) 0%,
        rgba(196, 168, 130, 0.7) 50%,
        rgba(160, 133, 106, 0.7) 100%
      )`,
                }}
              />
            </div>
            <div className="font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] font-medium text-3xl">
              Quick Focus
            </div>
            <div className="font-dmsans text-center text-[rgba(140,136,128,1)]">
              Plug in, tune out. A quiet corner with power outlets and no interruptions. Just you and the work.
            </div>
          </div>
        </div>
      <CoffeeDivider />
      </div>

      {/* section 3 */}
        <div className="w-full flex items-center relative flex-col gap-5 mt-10">
          <h6 className="font-dmsans  text-[rgba(140,136,128,1)] font-light text-1xl">
            DAILY RITUAL
          </h6>
          <h1 className="font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] font-medium text-5xl">
            The Rhythm of the Day
          </h1>
          <div className="w-[70%] h-80 flex items-center justify-between p-3">
            <div className="w-100 h-full rounded-2xl border border-[rgba(226,221,213,1)] flex flex-col justify-center gap-3 p-5 px-10 text-start">
              🌅
              <h2 className="text-start text-[rgba(28,28,26,1)] font-medium">Golden Hour</h2>
              <h6 className="">Morning specialty brews paired with fresh pastries. The city hasn't woken up yet — but you have.</h6>
              <div className="h-0.5 w-[90%] bg-[rgba(226,221,213,1)]"/>
              <h6 className="text-end text-[rgba(200,169,110,1)]">7-10 AM</h6>
            </div>
            <div className="w-100 h-full rounded-2xl border border-[rgba(226,221,213,1)] flex flex-col justify-center gap-3 p-5 px-10 text-start">
              ☕
              <h2 className="text-start text-[rgba(28,28,26,1)] font-medium">Conversation Hour</h2>
              <h6 className="">Afternoon gatherings over long blacks and chai. Pull up a chair. Stay a while.</h6>
              <div className="h-0.5 w-[90%] bg-[rgba(226,221,213,1)]"/>
              <h6 className="text-end text-[rgba(200,169,110,1)]">12–4 PM</h6>
            </div>
            <div className="w-100 h-full rounded-2xl border border-[rgba(226,221,213,1)] flex flex-col justify-center gap-3 p-5 px-10 text-start">
              🌙
              <h2 className="text-start text-[rgba(28,28,26,1)] font-medium">Quiet Hour</h2>
              <h6 className="">Work-friendly evenings with dim lights and deep focus. Laptops welcome. Silence respected.</h6>
              <div className="h-0.5 w-[90%] bg-[rgba(226,221,213,1)]"/>
              <h6 className="text-end text-[rgba(200,169,110,1)]">6–9 PM</h6>
            </div>
          </div>
        </div>
        <CoffeeDivider />
        <div className="w-[80%] flex items-center relative flex-col gap-5 mt-10">
          <div className="font-dmsans  text-[rgba(140,136,128,1)] font-light text-1xl">
            SIGNATURE OFFERING
          </div>
          <div className="font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] font-medium text-5xl ">
            What We Serve
          </div>
          <div className="w-full h-fit flex flex-row items-center justify-center gap-5 p-5">
            <div className="w-1/4 h-full flex justify-around items-center flex-col gap-4 p-5">
              <div className="w-full h-70 bg-black rounded-2xl" style={{background:'linear-gradient(180deg, #E8D5B0 0%, #C4A882 50%, #A0856A 100%)'}}></div>
              <div className="flex flex-col justify-around gap-3">
                <h1 className="text-[rgba(28,28,26,1)] font-medium font-['Cormorant_Garamond'] italic text-5xl">coffee</h1>
                <h6 className="text-[rgba(140,136,128,1)] text-1xl">Single-origin pour-overs, velvety lattes, and bold espressos. Crafted with care, served with love.</h6>
                <h4 className="text-end text-2xl">₹320</h4>
              </div>
            </div>
            <div className="w-1/4 h-full flex justify-around items-center flex-col gap-4 p-5">
              <div className="w-full h-70 bg-black rounded-2xl" style={{background:'linear-gradient(180deg, #E8D5B0 0%, #C4A882 50%, #A0856A 100%)'}}></div>
              <div className="flex flex-col justify-around gap-3">
                <h1 className="text-[rgba(28,28,26,1)] font-medium font-['Cormorant_Garamond'] italic text-5xl">coffee</h1>
                <h6 className="text-[rgba(140,136,128,1)] text-1xl">Single-origin pour-overs, velvety lattes, and bold espressos. Crafted with care, served with love.</h6>
                <h4 className="text-end text-2xl">₹320</h4>
              </div>
            </div>
            <div className="w-1/4 h-full flex justify-around items-center flex-col gap-4 p-5">
              <div className="w-full h-70 bg-black rounded-2xl" style={{background:'linear-gradient(180deg, #E8D5B0 0%, #C4A882 50%, #A0856A 100%)'}}></div>
              <div className="flex flex-col justify-around gap-3">
                <h1 className="text-[rgba(28,28,26,1)] font-medium font-['Cormorant_Garamond'] italic text-5xl">coffee</h1>
                <h6 className="text-[rgba(140,136,128,1)] text-1xl">Single-origin pour-overs, velvety lattes, and bold espressos. Crafted with care, served with love.</h6>
                <h4 className="text-end text-2xl">₹320</h4>
              </div>
            </div>
            <div className="w-1/4 h-full flex justify-around items-center flex-col gap-4 p-5">
              <div className="w-full h-70 bg-black rounded-2xl" style={{background:'linear-gradient(180deg, #E8D5B0 0%, #C4A882 50%, #A0856A 100%)'}}></div>
              <div className="flex flex-col justify-around gap-3">
                <h1 className="text-[rgba(28,28,26,1)] font-medium font-['Cormorant_Garamond'] italic text-5xl">coffee</h1>
                <h6 className="text-[rgba(140,136,128,1)] text-1xl">Single-origin pour-overs, velvety lattes, and bold espressos. Crafted with care, served with love.</h6>
                <h4 className="text-end text-2xl">₹320</h4>
              </div>
            </div>
          </div>
          <div className="text-[rgba(28,28,26,1)] flex flex-row items-center justify-center gap-2 bg-black text-white p-3 px-5 rounded-4xl">See Full Menu <FaArrowRight /></div>
        </div>
        <CoffeeDivider />










































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































































        
      
    </div>
  );
};

export default Home;


