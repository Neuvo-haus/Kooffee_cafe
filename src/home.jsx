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
  // These control the expanding image effect as you scroll

  // Animate image width from 30vw to 100vw
  const width = useTransform(scrollYProgress, [0, 1], ["30vw", "100vw"]);
  // Animate image height from 70vh to 100vh
  const height = useTransform(scrollYProgress, [0, 1], ["70vh", "100vh"]);
  // Animate top position from 15vh to 0vh (centers image vertically)
  const top = useTransform(scrollYProgress, [0, 1], ["15vh", "0vh"]);
  // Animate right position from 20vw to 0vw (centers image horizontally)
  const right = useTransform(scrollYProgress, [0, 1], ["20vw", "0vw"]);
  // Animate border radius from rounded to square
  const borderRadius = useTransform(scrollYProgress, [0, 1], ["1rem", "0rem"]);
  // Fade out text as you scroll
  const textOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Data for repeated sections
  const stayCards = [
    {
      img: first,
      title: "Slow Morning",
      desc:
        "A corner table reserved for no one. Stay as long as you need. The light here moves slowly too.",
    },
    {
      img: second,
      title: "Deep Conversation",
      desc:
        "Some tables face each other for a reason. This is where friendships deepen and ideas take shape.",
    },
    {
      img: third,
      title: "Quick Focus",
      desc:
        "Plug in, tune out. A quiet corner with power outlets and no interruptions. Just you and the work.",
    },
  ];

  const dailyBlocks = [
    {
      icon: "🌅",
      title: "Golden Hour",
      desc:
        "Morning specialty brews paired with fresh pastries. The city hasn't woken up yet — but you have.",
      time: "7-10 AM",
    },
    {
      icon: "☕",
      title: "Conversation Hour",
      desc:
        "Afternoon gatherings over long blacks and chai. Pull up a chair. Stay a while.",
      time: "12–4 PM",
    },
    {
      icon: "🌙",
      title: "Quiet Hour",
      desc:
        "Work-friendly evenings with dim lights and deep focus. Laptops welcome. Silence respected.",
      time: "6–9 PM",
    },
  ];

  // Signature menu cards (all identical, so just map 4 times)
  const menuCards = Array(4).fill({
    title: "coffee",
    desc:
      "Single-origin pour-overs, velvety lattes, and bold espressos. Crafted with care, served with love.",
    price: "₹320",
  });

  // Reviews data
  const reviews = [
    {
      text: '"This isn\'t just a café, it\'s a feeling. The saffron latte changed my mornings forever. I come here to think, to breathe, to be."',
      author: "Priya M.",
      source: "— Google Review",
      stars: 5,
    },
    {
      text: '"Found this place by accident. Stayed four hours. The light, the quiet, the coffee — everything was intentional. Will be back every weekend."',
      author: "Arjun K.",
      source: "— Google Review",
      stars: 5,
    },
    {
      text: '"Best specialty coffee in Ahmedabad, hands down. The space is thoughtful, the people are warm, and the mawa croissant is divine."',
      author: "Sneha R.",
      source: "— Google Review",
      stars: 5,
    },
  ];

  // Image grid for 'Our Space' section
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
      {/* Scroll track: sets up the scrollable area for animation */}
      <div ref={containerRef} className="w-full h-[300vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* Intro Text Section */}
          <motion.div style={{ opacity: textOpacity }} className="w-[60%] h-[70%] flex z-10">
            <div className="w-1/2 h-full flex items-center">
              <div className="w-full flex flex-col justify-center gap-6">
                <h6 className="font-dmsans italic text-[rgba(140,136,128,1)] text-sm">EST. AHMEDABAD</h6>
                <h1 className="text-7xl font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] leading-tight">
                  Kooffee cafe <br /> in Ahmedabad
                </h1>
                <h6 className="font-dmsans italic text-[rgba(140,136,128,1)] text-sm">Specialty coffee. Slow mornings. Open conversations.</h6>
                <h6 className="font-dmsans italic text-[rgba(140,136,128,1)] text-sm flex items-center gap-2">
                  <CiLocationOn /> Ahmedabad, Gujarat <span className="mx-4">|</span> <IoTimeOutline /> Opens 8AM – Closes 10:00 PM
                </h6>
                <div className="flex items-center gap-10 pt-4 mt-4">
                  <motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block cursor-pointer">
                    <span className="flex items-center gap-2 text-sm tracking-[0.3em] font-dmsans uppercase pb-3">VIEW MENU <FaArrowRight /></span>
                    <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-0 bottom-0 h-[1px] w-full bg-[rgba(200,169,110,1)] origin-left" />
                  </motion.div>
                  <motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block cursor-pointer">
                    <span className="flex items-center gap-2 text-sm tracking-[0.3em] font-dmsans uppercase pb-3">GET DIRECTIONS <FaArrowRight /></span>
                    <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-0 bottom-0 h-[1px] w-full bg-[rgba(200,169,110,1)] origin-left" />
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
      <div className="w-full h-fit mt-30 flex gap-10 flex-col items-center justify-center relative z-30">
        <h1 className="text-black text-5xl font-['Cormorant_Garamond'] italic ">Why People Stay Longer</h1>
        <div className="flex gap-40 mt-20">
          {stayCards.map((card, i) => (
            <div key={card.title} className="h-60 w-80 flex gap-3 flex-col items-center relative">
              <div className="h-20 w-20 rounded-full bg-cover bg-center relative overflow-hidden" style={{ backgroundImage: `url(${card.img})` }}>
                <div className="absolute inset-0" style={{ background: `linear-gradient(180deg,rgba(232,213,176,0.7) 0%,rgba(196,168,130,0.7) 50%,rgba(160,133,106,0.7) 100%)` }} />
              </div>
              <div className="font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] font-medium text-3xl">{card.title}</div>
              <div className="font-dmsans text-center text-[rgba(140,136,128,1)]">{card.desc}</div>
            </div>
          ))}
        </div>
      </div>
      <CoffeeDivider />

      {/* SECTION 3: Daily Rituals */}
      <div className="w-full flex items-center relative flex-col gap-5 mt-10">
        <h6 className="font-dmsans  text-[rgba(140,136,128,1)] font-light text-1xl">DAILY RITUAL</h6>
        <h1 className="font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] font-medium text-5xl">The Rhythm of the Day</h1>
        <div className="w-[70%] h-80 flex items-center justify-between p-3">
          {dailyBlocks.map((block) => (
            <div key={block.title} className="w-100 h-full rounded-2xl border border-[rgba(226,221,213,1)] flex flex-col justify-center gap-3 p-5 px-10 text-start">
              {block.icon}
              <h2 className="text-start text-[rgba(28,28,26,1)] font-medium">{block.title}</h2>
              <h6>{block.desc}</h6>
              <div className="h-0.5 w-[90%] bg-[rgba(226,221,213,1)]" />
              <h6 className="text-end text-[rgba(200,169,110,1)]">{block.time}</h6>
            </div>
          ))}
        </div>
      </div>
      <CoffeeDivider />

      {/* SECTION 4: Signature Offerings */}
      <div className="w-[80%] flex items-center relative flex-col gap-5 mt-10">
        <div className="font-dmsans  text-[rgba(140,136,128,1)] font-light text-1xl">SIGNATURE OFFERING</div>
        <div className="font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] font-medium text-5xl ">What We Serve</div>
        <div className="w-full h-fit flex flex-row items-center justify-center gap-5 p-5">
          {menuCards.map((card, i) => (
            <div key={i} className="w-1/4 h-full flex justify-around items-center flex-col gap-4 p-5">
              <div className="w-full h-70 bg-black rounded-2xl" style={{ background: "linear-gradient(180deg, #E8D5B0 0%, #C4A882 50%, #A0856A 100%)" }}></div>
              <div className="flex flex-col justify-around gap-3">
                <h1 className="text-[rgba(28,28,26,1)] font-medium font-['Cormorant_Garamond'] italic text-5xl">{card.title}</h1>
                <h6 className="text-[rgba(140,136,128,1)] text-1xl">{card.desc}</h6>
                <h4 className="text-end text-2xl">{card.price}</h4>
              </div>
            </div>
          ))}
        </div>
        <motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block cursor-pointer mt-5">
          <span className="flex items-center gap-2 text-sm tracking-[0.3em] font-dmsans uppercase pb-3">SEE FULL MENU <FaArrowRight /></span>
          <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-0 bottom-0 h-px w-full bg-[rgba(200,169,110,1)] origin-left" />
        </motion.div>
      </div>
      <CoffeeDivider />

      <div className="w-full py-32 flex flex-col items-center">
        <div className="w-[80%] flex justify-between items-start">
          <div className="flex flex-col gap-4">
            <h6 className="font-dmsans tracking-[0.3em] text-sm text-[rgba(140,136,128,1)]">OUR SPACE</h6>
            <h1 className="text-7xl font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] leading-tight">Modern Local Kitchen</h1>
          </div>
          <p className="max-w-125 text-lg leading-relaxed text-[rgba(140,136,128,1)] mt-10">
            We operate at the intersection of tradition and innovation. Using heritage techniques to celebrate local Gujarat produce, we craft visions that nourish both the palate and the spirit.
          </p>
        </div>
        <div className="w-[80%] mt-24 grid grid-cols-3 grid-rows-3 gap-8">
          {spaceImages.map((img, i) => (
            <div key={i} className={`rounded-2xl overflow-hidden ${img.className || ""}`}>
              <div className={img.className?.includes("row-span-2") ? "w-full h-full bg-cover bg-center" : "w-full h-52 bg-cover bg-center"} style={{ backgroundImage: `url(${img.img})` }} />
            </div>
          ))}
        </div>
        <motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block cursor-pointer mt-24">
          <span className="flex items-center gap-2 text-sm tracking-[0.3em] pb-3">EXPLORE THE SPACE <FaArrowRight /></span>
          <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-0 bottom-0 h-[1px] w-full bg-[rgba(200,169,110,1)] origin-left" />
        </motion.div>
      </div>
      <CoffeeDivider/>
      {/* SECTION 6: Reviews */}
      <div className="w-full flex items-center relative flex-col gap-5 mt-10">
        <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">What People Say</h6>
        <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-5xl mb-8">Words That Stayed</h1>
        
        <div className="w-[80%] flex justify-center gap-6 mt-5 mb-10">
          {reviews.map((review, i) => (
            <div key={i} className="flex-1 flex flex-col justify-between p-8 rounded-2xl border border-[rgba(226,221,213,0.8)] bg-transparent">
              <div className="flex flex-col gap-5">
                <div className="flex gap-1 text-[rgba(200,169,110,1)] text-sm">
                  {[...Array(review.stars)].map((_, j) => (
                    <span key={j}>★</span>
                  ))}
                </div>
                <p className="font-dmsans italic text-[rgba(28,28,26,0.8)] leading-relaxed text-[15px]">
                  {review.text}
                </p>
              </div>
              <div className="mt-10">
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
        <div className="w-[80%] py-10 flex justify-between items-center gap-10">
          <div className="w-1/2 flex flex-col gap-4">
            <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">Find Us</h6>
            <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-5xl mb-6">Visit Us</h1>
            
            <div className="font-dmsans text-[rgba(28,28,26,0.8)] leading-snug text-[15px] mb-4">
              Kooffe Cafe<br />
              Near Law Garden, Navrangpura<br />
              Ahmedabad, Gujarat 380001
            </div>

            <div className="grid grid-cols-2 gap-y-4 gap-x-8 font-dmsans text-[13px] text-[rgba(140,136,128,1)]">
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

            <div className="flex items-center gap-8 mt-10">
              <motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block cursor-pointer">
                <span className="flex items-center gap-2 text-sm tracking-[0.3em] font-dmsans uppercase pb-3">CALL NOW <FaArrowRight /></span>
                <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-0 bottom-0 h-[1px] w-full bg-[rgba(200,169,110,1)] origin-left" />
              </motion.div>
              <motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block cursor-pointer">
                <span className="flex items-center gap-2 text-sm tracking-[0.3em] font-dmsans uppercase pb-3">WHATSAPP <FaArrowRight /></span>
                <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-0 bottom-0 h-[1px] w-full bg-[rgba(200,169,110,1)] origin-left" />
              </motion.div>
            </div>
          </div>
          
          <div className="w-[45%] h-[350px] bg-[rgba(226,221,213,0.5)] rounded-2xl flex flex-col items-center justify-center text-[rgba(140,136,128,1)]">
            <CiLocationOn className="text-4xl text-[rgba(200,169,110,1)] mb-2" />
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
