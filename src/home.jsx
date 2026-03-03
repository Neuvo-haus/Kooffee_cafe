// React and hooks
import React, { useRef } from "react";
// Icon imports
import { CiLocationOn } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
// Animation library
import { motion, useScroll, useTransform } from "framer-motion";  
// Image assets
import background from "./assets/image.jpg";
import first from "./assets/first.jpg";
import second from "./assets/second.jpg";
import third from "./assets/third.jpg";
// Custom divider component
import CoffeeDivider from "./components/cooffeedivider";


// Home page main component
const Home = () => {
  // Ref for scroll container
  const containerRef = useRef(null);

  // Track scroll progress for animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // --- ANIMATION VALUES ---
  const width = useTransform(scrollYProgress, [0, 1], ["30vw", "100vw"]);
  const height = useTransform(scrollYProgress, [0, 1], ["70vh", "100vh"]);
  const top = useTransform(scrollYProgress, [0, 1], ["15vh", "0vh"]);
  const right = useTransform(scrollYProgress, [0, 1], ["20vw", "0vw"]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["1rem", "0rem"]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Data for repeated sections
  const stayCards = [
    { img: first, title: "Slow Morning", desc: "A corner table reserved for no one. Stay as long as you need. The light here moves slowly too." },
    { img: second, title: "Deep Conversation", desc: "Some tables face each other for a reason. This is where friendships deepen and ideas take shape." },
    { img: third, title: "Quick Focus", desc: "Plug in, tune out. A quiet corner with power outlets and no interruptions. Just you and the work." },
  ];

  const dailyBlocks = [
    { icon: "🌅", title: "Golden Hour", desc: "Morning specialty brews paired with fresh pastries. The city hasn't woken up yet — but you have.", time: "7-10 AM" },
    { icon: "☕", title: "Conversation Hour", desc: "Afternoon gatherings over long blacks and chai. Pull up a chair. Stay a while.", time: "12–4 PM" },
    { icon: "🌙", title: "Quiet Hour", desc: "Work-friendly evenings with dim lights and deep focus. Laptops welcome. Silence respected.", time: "6–9 PM" },
  ];

  const menuCards = Array(4).fill({
    title: "coffee",
    desc: "Single-origin pour-overs, velvety lattes, and bold espressos. Crafted with care, served with love.",
    price: "₹320",
  });

  const reviews = [
    { text: '"This isn\'t just a café, it\'s a feeling. The saffron latte changed my mornings forever. I come here to think, to breathe, to be."', author: "Priya M.", source: "— Google Review", stars: 5 },
    { text: '"Found this place by accident. Stayed four hours. The light, the quiet, the coffee — everything was intentional. Will be back every weekend."', author: "Arjun K.", source: "— Google Review", stars: 5 },
    { text: '"Best specialty coffee in Ahmedabad, hands down. The space is thoughtful, the people are warm, and the mawa croissant is divine."', author: "Sneha R.", source: "— Google Review", stars: 5 },
  ];

  const spaceImages = [
    { img: first, className: "row-span-2" },
    { img: second },
    { img: third },
    { img: background },
    { img: background, className: "row-span-2" },
    { img: first, className: "col-span-1" },
  ];

  return (
    <div className="w-full relative flex items-center flex-col pb-20">
      {/* ===== MOBILE HERO: Static background image, no scroll animation ===== */}
      <div className="md:hidden w-full h-screen relative flex items-center justify-center">
        {/* Background image */}
        <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}></div>
        {/* Gradient overlay */}
        <div className="absolute inset-0" style={{ background: `linear-gradient(180deg, rgba(245,240,232,0.85) 0%, rgba(232,213,176,0.7) 40%, rgba(196,168,130,0.6) 70%, rgba(160,133,106,0.7) 100%)` }} />
        
        {/* Text content */}
        <div className="relative z-10 w-[85%] flex flex-col justify-center gap-4 pt-10">
          <h6 className="font-dmsans italic text-[rgba(100,96,88,1)] text-xs">EST. AHMEDABAD</h6>
          <h1 className="text-4xl font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] leading-tight">
            Kooffee cafe <br /> in Ahmedabad
          </h1>
          <h6 className="font-dmsans italic text-[rgba(100,96,88,1)] text-xs">Specialty coffee. Slow mornings. Open conversations.</h6>
          <h6 className="font-dmsans italic text-[rgba(100,96,88,1)] text-xs flex items-center gap-2 flex-wrap">
            <CiLocationOn /> Ahmedabad, Gujarat <span className="mx-2">|</span> <IoTimeOutline /> Opens 8AM – Closes 10:00 PM
          </h6>
          <div className="flex items-center gap-4 pt-4 mt-2 flex-wrap">
            <motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block cursor-pointer px-4 py-3 border border-[rgba(28,28,26,0.3)] rounded-full bg-[rgba(245,240,232,0.5)] backdrop-blur-sm">
              <span className="flex items-center gap-2 text-xs tracking-[0.2em] font-dmsans uppercase pb-1">VIEW MENU <FaArrowRight /></span>
              <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-4 right-4 bottom-2 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
            </motion.div>
            <motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block cursor-pointer px-4 py-3 border border-[rgba(28,28,26,0.3)] rounded-full bg-[rgba(245,240,232,0.5)] backdrop-blur-sm">
              <span className="flex items-center gap-2 text-xs tracking-[0.2em] font-dmsans uppercase pb-1">GET DIRECTIONS <FaArrowRight /></span>
              <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-4 right-4 bottom-2 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* ===== DESKTOP HERO: Original scroll-driven expanding image animation ===== */}
      <div ref={containerRef} className="w-full h-[300vh] relative hidden md:block">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* Intro Text Section */}
          <motion.div style={{ opacity: textOpacity }} className="w-[60%] h-[70%] flex z-10">
            <div className="w-1/2 h-full flex items-center">
              <div className="w-full flex flex-col justify-center gap-6">
                <h6 className="font-dmsans italic text-[rgba(140,136,128,1)] text-sm">EST. AHMEDABAD</h6>
                <h1 className="text-6xl lg:text-7xl font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] leading-tight">
                  Kooffee cafe <br /> in Ahmedabad
                </h1>
                <h6 className="font-dmsans italic text-[rgba(140,136,128,1)] text-sm">Specialty coffee. Slow mornings. Open conversations.</h6>
                <h6 className="font-dmsans italic text-[rgba(140,136,128,1)] text-sm flex items-center gap-2">
                  <CiLocationOn /> Ahmedabad, Gujarat <span className="mx-4">|</span> <IoTimeOutline /> Opens 8AM – Closes 10:00 PM
                </h6>
                <div className="flex items-center gap-10 pt-4 mt-4">
                  <motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block cursor-pointer px-6 py-4 border border-[rgba(226,221,213,0.8)] rounded-full hover:border-[rgba(200,169,110,0.5)] transition-colors">
                    <span className="flex items-center gap-2 text-sm tracking-[0.3em] font-dmsans uppercase pb-1">VIEW MENU <FaArrowRight /></span>
                    <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-6 right-6 bottom-3 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
                  </motion.div>
                  <motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block cursor-pointer px-6 py-4 border border-[rgba(226,221,213,0.8)] rounded-full hover:border-[rgba(200,169,110,0.5)] transition-colors">
                    <span className="flex items-center gap-2 text-sm tracking-[0.3em] font-dmsans uppercase pb-1">GET DIRECTIONS <FaArrowRight /></span>
                    <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-6 right-6 bottom-3 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
                  </motion.div>
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full"></div>
          </motion.div>
          {/* Expanding Image Animation */}
          <motion.div style={{ width, height, top, right, borderRadius }} className="absolute z-20 overflow-hidden shadow-2xl">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${background})` }}></div>
            <div className="absolute inset-0" style={{ background: `linear-gradient(180deg,rgba(232,213,176,0.6) 0%,rgba(196,168,130,0.6) 50%,rgba(160,133,106,0.6) 100%)` }} />
          </motion.div>
        </div>
      </div>

      {/* SECTION 2: Why People Stay Longer */}
      <div className="w-full h-fit mt-16 md:mt-30 flex gap-6 md:gap-10 flex-col items-center justify-center relative z-30 px-6 md:px-0">
        <h1 className="text-black text-3xl md:text-5xl font-['Cormorant_Garamond'] italic text-center">Why People Stay Longer</h1>
        <div className="flex flex-col md:flex-row gap-10 md:gap-40 mt-10 md:mt-20">
          {stayCards.map((card, i) => (
            <div key={card.title} className="h-auto md:h-60 w-full md:w-80 flex gap-3 flex-col items-center relative">
              <div className="h-20 w-20 rounded-full bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${card.img})` }}>
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg,rgba(232,213,176,0.7) 0%,rgba(196,168,130,0.7) 50%,rgba(160,133,106,0.7) 100%)` }} />
              </div>
              <div className="font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] font-medium text-2xl md:text-3xl">{card.title}</div>
              <div className="font-dmsans text-center text-[rgba(140,136,128,1)] text-sm md:text-base px-4 md:px-0">{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <CoffeeDivider />

      {/* SECTION 3: Daily Rituals */}
      <div className="w-full flex items-center relative flex-col gap-5 mt-10 px-6 md:px-0">
        <h6 className="font-dmsans text-[rgba(140,136,128,1)] font-light text-1xl">DAILY RITUAL</h6>
        <h1 className="font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] font-medium text-3xl md:text-5xl text-center">The Rhythm of the Day</h1>
        <div className="w-full md:w-[70%] flex flex-col md:flex-row items-center justify-between p-3 gap-4 md:gap-3">
          {dailyBlocks.map((block) => (
            <div key={block.title} className="w-full md:w-100 h-auto md:h-80 rounded-2xl border border-[rgba(226,221,213,1)] flex flex-col justify-center gap-3 p-5 px-6 md:px-10 text-start">
              {block.icon}
              <h2 className="text-start text-[rgba(28,28,26,1)] font-medium">{block.title}</h2>
              <h6 className="text-sm md:text-base">{block.desc}</h6>
              <div className="h-0.5 w-[90%] bg-[rgba(226,221,213,1)]" />
              <h6 className="text-end text-[rgba(200,169,110,1)]">{block.time}</h6>
            </div>
          ))}
        </div>
      </div>
      <CoffeeDivider />

      {/* SECTION 4: Signature Offerings */}
      <div className="w-[90%] md:w-[80%] flex items-center relative flex-col gap-5 mt-10">
        <div className="font-dmsans text-[rgba(140,136,128,1)] font-light text-1xl">SIGNATURE OFFERING</div>
        <div className="font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] font-medium text-3xl md:text-5xl text-center">What We Serve</div>
        <div className="w-full h-fit grid grid-cols-2 md:grid-cols-4 gap-5 p-2 md:p-5">
          {menuCards.map((card, i) => (
            <div key={i} className="w-full h-full flex justify-around items-center flex-col gap-4 p-3 md:p-5">
              <div className="w-full h-40 md:h-70 bg-black rounded-2xl" style={{ background: "linear-gradient(180deg, #E8D5B0 0%, #C4A882 50%, #A0856A 100%)" }}></div>
              <div className="flex flex-col justify-around gap-2 md:gap-3">
                <h1 className="text-[rgba(28,28,26,1)] font-medium font-['Cormorant_Garamond'] italic text-3xl md:text-5xl">{card.title}</h1>
                <h6 className="text-[rgba(140,136,128,1)] text-xs md:text-base">{card.desc}</h6>
                <h4 className="text-end text-xl md:text-2xl">{card.price}</h4>
              </div>
            </div>
          ))}
        </div>
        <motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block cursor-pointer mt-5 px-6 md:px-8 py-3 md:py-4 border border-[rgba(226,221,213,0.8)] rounded-full hover:border-[rgba(200,169,110,0.5)] transition-colors">
          <span className="flex items-center gap-2 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-dmsans uppercase pb-1">SEE FULL MENU <FaArrowRight /></span>
          <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-6 md:left-8 right-6 md:right-8 bottom-2 md:bottom-3 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
        </motion.div>
      </div>
      <CoffeeDivider />

      {/* SECTION 5: Our Space */}
      <div className="w-full py-16 md:py-32 flex flex-col items-center px-6 md:px-0">
        <div className="w-full md:w-[80%] flex flex-col md:flex-row justify-between items-start gap-6">
          <div className="flex flex-col gap-4">
            <h6 className="font-dmsans tracking-[0.3em] text-xs md:text-sm text-[rgba(140,136,128,1)]">OUR SPACE</h6>
            <h1 className="text-4xl md:text-7xl font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] leading-tight">Modern Local Kitchen</h1>
          </div>
          <p className="max-w-full md:max-w-125 text-sm md:text-lg leading-relaxed text-[rgba(140,136,128,1)] mt-0 md:mt-10">
            We operate at the intersection of tradition and innovation. Using heritage techniques to celebrate local Gujarat produce, we craft visions that nourish both the palate and the spirit.
          </p>
        </div>
        <div className="w-full md:w-[80%] mt-12 md:mt-24 grid grid-cols-2 md:grid-cols-3 grid-rows-auto md:grid-rows-3 gap-4 md:gap-8">
          {spaceImages.map((img, i) => (
            <div key={i} className={`rounded-2xl overflow-hidden ${img.className || ""}`}>
              <div className={img.className?.includes("row-span-2") ? "w-full h-full min-h-[200px] md:min-h-0 bg-cover bg-center" : "w-full h-36 md:h-52 bg-cover bg-center"} style={{ backgroundImage: `url(${img.img})` }} />
            </div>
          ))}
        </div>
        <motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block cursor-pointer mt-12 md:mt-24 px-6 md:px-8 py-3 md:py-4 border border-[rgba(226,221,213,0.8)] rounded-full hover:border-[rgba(200,169,110,0.5)] transition-colors">
          <span className="flex items-center gap-2 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] pb-1">EXPLORE THE SPACE <FaArrowRight /></span>
          <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-6 md:left-8 right-6 md:right-8 bottom-2 md:bottom-3 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
        </motion.div>
      </div>
      <CoffeeDivider/>

      {/* SECTION 6: Reviews */}
      <div className="w-full flex items-center relative flex-col gap-5 mt-10 px-6 md:px-0">
        <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">What People Say</h6>
        <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl md:text-5xl mb-4 md:mb-8 text-center">Words That Stayed</h1>
        
        <div className="w-full md:w-[80%] flex flex-col md:flex-row justify-center gap-6 mt-5 mb-10">
          {reviews.map((review, i) => (
            <div key={i} className="flex-1 flex flex-col justify-between p-6 md:p-8 rounded-2xl border border-[rgba(226,221,213,0.8)] bg-transparent">
              <div className="flex flex-col gap-4 md:gap-5">
                <div className="flex gap-1 text-[rgba(200,169,110,1)] text-sm">
                  {[...Array(review.stars)].map((_, j) => (
                    <span key={j}>★</span>
                  ))}
                </div>
                <p className="font-dmsans italic text-[rgba(28,28,26,0.8)] leading-relaxed text-sm md:text-[15px]">
                  {review.text}
                </p>
              </div>
              <div className="mt-6 md:mt-10">
                <div className="h-px w-full bg-[rgba(226,221,213,0.8)] mb-4" />
                <div className="flex justify-between items-center text-xs font-dmsans text-[rgba(140,136,128,1)]">
                  <span>{review.author}</span>
                  <span>{review.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <CoffeeDivider />

      {/* SECTION 7: Visit Us */}
      <div className="w-full flex items-center relative flex-col gap-5 mt-10 bg-[#ede9e1]">
        <div className="w-[90%] md:w-[80%] py-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          <div className="w-full md:w-1/2 flex flex-col gap-4">
            <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">Find Us</h6>
            <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl md:text-5xl mb-4 md:mb-6">Visit Us</h1>
            
            <div className="font-dmsans text-[rgba(28,28,26,0.8)] leading-snug text-sm md:text-[15px] mb-4">
              Kooffe Cafe<br />
              Near Law Garden, Navrangpura<br />
              Ahmedabad, Gujarat 380001
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-4 md:gap-x-8 font-dmsans text-[12px] md:text-[13px] text-[rgba(140,136,128,1)]">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#4285F4] text-white flex items-center justify-center rounded-sm text-[10px] font-bold">P</div>
                Street parking available
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 bg-[#E8F0FE] text-[#4285F4] border border-[#D2E3FC] flex items-center justify-center rounded-sm text-[10px] font-bold">📶</div>
                Free WiFi
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center text-lg">🔌</div>
                Power outlets
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 flex items-center justify-center text-lg">🐾</div>
                Pets welcome outdoors
              </div>
            </div>

            <div className="flex items-center gap-4 md:gap-8 mt-8 md:mt-10 flex-wrap">
              <motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block cursor-pointer px-4 md:px-6 py-3 md:py-4 border border-[rgba(226,221,213,0.8)] rounded-full hover:border-[rgba(200,169,110,0.5)] transition-colors">
                <span className="flex items-center gap-2 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-dmsans uppercase pb-1">CALL NOW <FaArrowRight /></span>
                <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-4 md:left-6 right-4 md:right-6 bottom-2 md:bottom-3 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
              </motion.div>
              <motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block cursor-pointer px-4 md:px-6 py-3 md:py-4 border border-[rgba(226,221,213,0.8)] rounded-full hover:border-[rgba(200,169,110,0.5)] transition-colors">
                <span className="flex items-center gap-2 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-dmsans uppercase pb-1">WHATSAPP <FaArrowRight /></span>
                <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-4 md:left-6 right-4 md:right-6 bottom-2 md:bottom-3 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
              </motion.div>
            </div>
          </div>
          
          <div className="w-full md:w-[45%] h-[250px] md:h-[350px] bg-[rgba(226,221,213,0.5)] rounded-2xl flex flex-col items-center justify-center text-[rgba(140,136,128,1)]">
            <CiLocationOn className="text-3xl md:text-4xl text-[rgba(200,169,110,1)] mb-2" />
            <span className="font-dmsans text-sm">Google Maps Embed</span>
            <span className="font-dmsans text-xs mt-1">Ahmedabad, Gujarat</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Export the Home component
export default Home;
