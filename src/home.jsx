// React and hooks
import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
// Icon imports
import { CiLocationOn } from "react-icons/ci";
import { IoTimeOutline } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
// Animation library  
import { motion as Motion, useScroll, useTransform } from "framer-motion";
// Image assets 
// Hero background
import homeHeroBackground from "./assets/home/home-hero-background.png";
import homeHeroVideoMp4 from "./assets/nce_website_compressed.mp4";
import homeHeroVideoWebm from "./assets/nce_website_compressed.webm";
import homeHeroPoster from "./assets/nce_website_poster.jpg";
import cafeInteriorMorningLight from "./assets/the cafe/cafe-interior-morning-light.jpeg";
// Stay card feature circles
import homeStaySlowMorning from "./assets/home/home-stay-slow-morning.jpeg";
import homeStayDeepConversation from "./assets/home/home-stay-deep-conversation.jpeg";
import homeStayQuickFocus from "./assets/home/home-stay-quick-focus.jpeg";
// Space grid tiles
import homeSpaceTile2 from "./assets/home/home-space-tile-2.jpeg";
import homeSpaceTile3 from "./assets/home/home-space-tile-3.jpeg";
import homeSpaceTile4 from "./assets/home/home-space-tile-4.jpeg";
import homeSpaceTile5 from "./assets/home/home-space-tile-5.jpeg";
import homeSpaceTile6 from "./assets/home/home-space-tile-6.jpeg";
// Coffee offering images
import espressoMacchiatoImg from "./assets/home/Espresso_Macchiato_in_cafe_.jpeg";
import americanoImg from "./assets/home/Americano_in_ceramic_mug.jpeg";
import mochaImg from "./assets/home/Mocha_in_ceramic_mug_.jpeg";
import affogatoImg from "./assets/home/Affogato_drenched_in_espresso_.jpeg";
// Custom divider component
import CoffeeDivider from "./components/cooffeedivider";
import { CONTACT_LINKS, SITE_HOURS } from "./config/site";
import { useMediaQuery } from "./hooks/useMediaQuery";
import ReservationForm from "./components/ReservationForm";
import TestimonialSection from "./components/TestimonialSection";
import { fetchPublishedSections } from "./services/publicCms";

const getSection = (sections, key) => sections.find((section) => section.key === key) || {};

// Home page main component
const Home = () => {
  const navigate = useNavigate();
  const isDesktop = useMediaQuery("(min-width: 768px)");
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

  const fallbackStayCards = [
    { img: homeStaySlowMorning, title: "Slow Morning", desc: "A corner table reserved for no one. Stay as long as you need. The light here moves slowly too." },
    { img: homeStayDeepConversation, title: "Deep Conversation", desc: "Some tables face each other for a reason. This is where friendships deepen and ideas take shape." },
    { img: homeStayQuickFocus, title: "Quick Focus", desc: "Plug in, tune out. A quiet corner with power outlets and no interruptions. Just you and the work." },
  ];

  const fallbackDailyBlocks = [
    { icon: "🌅", title: "Golden Hour", desc: "Morning specialty brews paired with fresh pastries. The city hasn't woken up yet — but you have.", time: "7-10 AM" },
    { icon: "☕", title: "Conversation Hour", desc: "Afternoon gatherings over long blacks and chai. Pull up a chair. Stay a while.", time: "12–4 PM" },
    { icon: "🌙", title: "Quiet Hour", desc: "Work-friendly evenings with dim lights and deep focus. Laptops welcome. Silence respected.", time: "6–9 PM" },
  ];
  const [homepageSections, setHomepageSections] = useState([]);

  useEffect(() => {
    fetchPublishedSections("homepage_sections", []).then(setHomepageSections);
  }, []);

  const heroSection = getSection(homepageSections, "hero");
  const staySection = getSection(homepageSections, "stay_longer");
  const ritualSection = getSection(homepageSections, "daily_ritual");
  const signatureSection = getSection(homepageSections, "signature_offering");
  const offersSection = getSection(homepageSections, "offers");
  const noticeSection = getSection(homepageSections, "notice");
  const heroContent = {
    eyebrow: heroSection.eyebrow || "EST. AHMEDABAD",
    title: heroSection.title || "Kooffee cafe in Ahmedabad",
    subtitle: heroSection.body || "Specialty coffee. Slow mornings. Open conversations.",
    primaryButtonLabel: heroSection.data?.primaryButtonLabel || "VIEW MENU",
    primaryButtonPath: heroSection.data?.primaryButtonPath || "/menu",
  };
  const stayCards = (staySection.data?.cards?.length ? staySection.data.cards : fallbackStayCards)
    .map((card, index) => ({
      ...fallbackStayCards[index % fallbackStayCards.length],
      title: card.title,
      desc: card.body || card.desc,
    }));
  const dailyBlocks = (ritualSection.data?.cards?.length ? ritualSection.data.cards : fallbackDailyBlocks)
    .map((card, index) => ({
      ...fallbackDailyBlocks[index % fallbackDailyBlocks.length],
      title: card.title,
      desc: card.body || card.desc,
      time: card.time,
    }));
  const notice = {
    enabled: Boolean(noticeSection.data?.enabled && noticeSection.body),
    text: noticeSection.body,
  };
  const fallbackOfferCards = [
    {
      badge: "Mon-Fri",
      title: "Morning Pour",
      body: "Complimentary biscotti with any pour over before 10 AM.",
    },
    {
      badge: "After 4 PM",
      title: "Conversation Pairing",
      body: "Two coffees and one shared bake at a softer evening price.",
    },
    {
      badge: "Weekends",
      title: "Long Table Brunch",
      body: "Reserved seating for groups with a curated first round.",
    },
  ];
  const offerCards = (offersSection.data?.offers?.length ? offersSection.data.offers : fallbackOfferCards)
    .map((offer, index) => ({
      ...fallbackOfferCards[index % fallbackOfferCards.length],
      badge: offer.badge,
      title: offer.title,
      body: offer.body,
    }))
    .filter((offer) => offer.badge || offer.title || offer.body);

  const fallbackMenuCards = [
    {
      title: "Espresso Macchiato",
      img: espressoMacchiatoImg,
      desc: "Rich espresso marked with a dollop of velvety foamed milk, balancing bold flavor with creamy texture.",
      price: "₹180",
    },
    {
      title: "Americano",
      img: americanoImg,
      desc: "Smooth espresso shots combined with hot water, yielding a full-bodied cup with a rich aroma.",
      price: "₹160",
    },
    {
      title: "Mocha",
      img: mochaImg,
      desc: "A decadent fusion of rich espresso, steamed milk, and premium chocolate, topped with delicate foam.",
      price: "₹240",
    },
    {
      title: "Affogato",
      img: affogatoImg,
      desc: "A hot, double shot of bold espresso poured over a scoop of creamy vanilla gelato.",
      price: "₹220",
    },
  ];
  const menuCards = (signatureSection.data?.items?.length ? signatureSection.data.items : fallbackMenuCards)
    .map((item, index) => ({
      ...fallbackMenuCards[index % fallbackMenuCards.length],
      title: item.title,
      desc: item.body || item.desc,
      price: item.price,
      img: item.imageUrl || item.img,
    }));

  const spaceImages = [
    { img: homeHeroBackground, className: "row-span-2" },
    { img: homeSpaceTile2 },
    { img: homeSpaceTile3 },
    { img: homeSpaceTile4 },
    { img: homeSpaceTile5, className: "row-span-2" },
    { img: homeSpaceTile6, className: "col-span-1" },
  ];

  return (
    <div className="w-full relative flex items-center flex-col pb-20">
      {/* ===== MOBILE HERO: Static background image, no scroll animation ===== */}
      {!isDesktop && (
      <div className="w-full h-screen relative flex items-center justify-center">
        <img
          src={cafeInteriorMorningLight}
          alt="Morning light inside Kooffee Cafe"
          className="absolute inset-0 h-full w-full object-cover"
        />

        {/* Text content */}
        <div className="relative z-10 w-[85%] flex flex-col justify-center gap-4 pt-10">
          <h6 className="font-dmsans italic text-[rgba(100,96,88,1)] text-xs">{heroContent.eyebrow}</h6>
          <h1 className="text-4xl font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] leading-tight">
            {heroContent.title}
          </h1>
          <h6 className="font-dmsans italic text-[rgba(100,96,88,1)] text-xs">{heroContent.subtitle}</h6>
          <h6 className="font-dmsans italic text-[rgba(100,96,88,1)] text-xs flex items-center gap-2 flex-wrap">
            <CiLocationOn /> Ahmedabad, Gujarat <span className="mx-2">|</span> <IoTimeOutline /> {SITE_HOURS.openClose}
          </h6>
          <div className="flex items-center gap-4 pt-4 mt-2 flex-wrap">
            <Motion.div onClick={() => navigate(heroContent.primaryButtonPath)} initial="rest" whileHover="hover" animate="rest" className="relative inline-block select-none cursor-pointer px-4 py-3 border border-[rgba(28,28,26,0.3)] rounded-full bg-[rgba(245,240,232,0.5)] backdrop-blur-sm">
              <span className="flex items-center gap-2 text-xs tracking-[0.2em] font-dmsans uppercase pb-1">{heroContent.primaryButtonLabel} <FaArrowRight /></span>
              <Motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-4 right-4 bottom-2 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
            </Motion.div>
            <Motion.a
              href={CONTACT_LINKS.directions}
              target="_blank"
              rel="noreferrer"
              initial="rest"
              whileHover="hover"
              animate="rest"
              className="relative inline-block select-none cursor-pointer px-4 py-3 border border-[rgba(28,28,26,0.3)] rounded-full bg-[rgba(245,240,232,0.5)] backdrop-blur-sm"
            >
              <span className="flex items-center gap-2 text-xs tracking-[0.2em] font-dmsans uppercase pb-1">GET DIRECTIONS <FaArrowRight /></span>
              <Motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-4 right-4 bottom-2 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
            </Motion.a>
          </div>
        </div>
      </div>
      )}

      {/* ===== DESKTOP HERO: Original scroll-driven expanding image animation ===== */}
      {isDesktop && (
      <div ref={containerRef} className="w-full h-[300vh] relative">
        <div className="sticky top-0 h-screen w-full overflow-hidden flex items-center justify-center">
          {/* Intro Text Section */}
          <Motion.div style={{ opacity: textOpacity }} className="w-[60%] h-[70%] flex z-10">
            <div className="w-1/2 h-full flex items-center">
              <div className="w-full flex flex-col justify-center gap-6">
                <h6 className="font-dmsans italic text-[rgba(140,136,128,1)] text-sm">{heroContent.eyebrow}</h6>
                <h1 className="text-6xl lg:text-7xl font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] leading-tight">
                  {heroContent.title}
                </h1>
                <h6 className="font-dmsans italic text-[rgba(140,136,128,1)] text-sm">{heroContent.subtitle}</h6>
                <h6 className="font-dmsans italic text-[rgba(140,136,128,1)] text-sm flex items-center gap-2">
                  <CiLocationOn /> Ahmedabad, Gujarat <span className="mx-4">|</span> <IoTimeOutline /> {SITE_HOURS.openClose}
                </h6>
                <div className="flex items-center gap-10 pt-4 mt-4">
                  <Motion.div onClick={() => navigate(heroContent.primaryButtonPath)} initial="rest" whileHover="hover" animate="rest" className="relative inline-block select-none cursor-pointer px-6 py-4 border border-[rgba(226,221,213,0.8)] rounded-full hover:border-[rgba(200,169,110,0.5)] transition-colors">
                    <span className="flex items-center gap-2 text-sm tracking-[0.3em] font-dmsans uppercase pb-1">{heroContent.primaryButtonLabel} <FaArrowRight /></span>
                    <Motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-6 right-6 bottom-3 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
                  </Motion.div>
                  <Motion.a
                    href={CONTACT_LINKS.directions}
                    target="_blank"
                    rel="noreferrer"
                    initial="rest"
                    whileHover="hover"
                    animate="rest"
                    className="relative inline-block select-none cursor-pointer px-6 py-4 border border-[rgba(226,221,213,0.8)] rounded-full hover:border-[rgba(200,169,110,0.5)] transition-colors"
                  >
                    <span className="flex items-center gap-2 text-sm tracking-[0.3em] font-dmsans uppercase pb-1">GET DIRECTIONS <FaArrowRight /></span>
                    <Motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-6 right-6 bottom-3 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
                  </Motion.a>
                </div>
              </div>
            </div>
            <div className="w-1/2 h-full"></div>
          </Motion.div>
          {/* Expanding Image Animation */}
          <Motion.div style={{ width, height, top, right, borderRadius }} className="absolute z-20 overflow-hidden shadow-2xl">
            <video
              poster={homeHeroPoster}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={homeHeroVideoWebm} type="video/webm" />
              <source src={homeHeroVideoMp4} type="video/mp4" />
            </video>
          </Motion.div>
        </div>
      </div>
      )}

      {notice.enabled && (
        <div className="w-full border-y border-[rgba(196,168,130,0.45)] bg-[rgba(250,247,242,0.96)] px-6 py-6">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-center gap-2 text-center md:flex-row md:gap-5">
            <span className="font-dmsans text-[10px] font-bold uppercase tracking-[0.24em] text-[#8C6D46]">Today at Kooffee</span>
            <span className="hidden h-8 w-px bg-[rgba(196,168,130,0.55)] md:block"></span>
            <p className="font-['Cormorant_Garamond'] text-2xl italic leading-snug text-[rgba(28,28,26,1)] md:text-3xl">
              {notice.text}
            </p>
          </div>
        </div>
      )}

      {/* SECTION 2: Why People Stay Longer */}
      <div className="w-full h-fit mt-16 md:mt-30 flex gap-6 md:gap-10 flex-col items-center justify-center relative z-30 px-6 md:px-0">
        <h1 className="text-black text-3xl md:text-5xl font-['Cormorant_Garamond'] italic text-center">Why People Stay Longer</h1>
        <div className="flex flex-col md:flex-row gap-10 md:gap-40 mt-10 md:mt-20">
          {stayCards.map((card) => (
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

      {offerCards.length > 0 && (
        <>
          <div className="w-full border-y border-[rgba(226,221,213,0.65)] bg-[rgba(250,247,242,0.55)] px-6 py-16 md:px-0 md:py-20">
            <div className="mx-auto flex w-full flex-col gap-8 md:w-[80%]">
              <div className="text-center">
                <h6 className="font-dmsans text-xs uppercase tracking-[0.22em] text-[#8C6D46]">
                  {offersSection.eyebrow || "THIS WEEK"}
                </h6>
                <h1 className="mt-3 font-['Cormorant_Garamond'] text-4xl italic text-[rgba(28,28,26,1)] md:text-5xl">
                  {offersSection.title || "Slow Hour Offers"}
                </h1>
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {offerCards.map((offer) => (
                  <div key={`${offer.badge}-${offer.title}`} className="rounded-lg border border-[rgba(196,168,130,0.45)] bg-[rgba(245,240,232,0.78)] p-6 shadow-[0_18px_60px_rgba(28,28,26,0.05)] md:p-8">
                    <span className="font-dmsans text-[10px] font-bold uppercase tracking-[0.2em] text-[#8C6D46]">{offer.badge}</span>
                    <h2 className="mt-4 font-['Cormorant_Garamond'] text-3xl italic leading-tight text-[rgba(28,28,26,1)]">
                      {offer.title}
                    </h2>
                    <p className="mt-3 font-dmsans text-sm leading-7 text-[rgba(100,96,88,1)]">
                      {offer.body}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <CoffeeDivider />
        </>
      )}

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
        <div className="font-dmsans text-[rgba(140,136,128,1)] font-light text-1xl">{signatureSection.eyebrow || "SIGNATURE OFFERING"}</div>
        <div className="font-['Cormorant_Garamond'] italic text-[rgba(28,28,26,1)] font-medium text-3xl md:text-5xl text-center">{signatureSection.title || "What We Serve"}</div>
        <div className="w-full h-fit grid grid-cols-2 md:grid-cols-4 gap-5 p-2 md:p-5">
          {menuCards.map((card, i) => (
            <div key={i} className="w-full h-full flex justify-around items-center flex-col gap-4 p-3 md:p-5">
              <div className="w-full h-40 md:h-70 bg-black rounded-2xl bg-cover bg-center" style={{ backgroundImage: `url(${card.img})` }}></div>
              <div className="flex flex-col justify-around gap-2 md:gap-3 w-full">
                <h1 className="text-[rgba(28,28,26,1)] font-medium font-['Cormorant_Garamond'] italic text-2xl md:text-3xl">{card.title}</h1>
                <h6 className="text-[rgba(140,136,128,1)] text-xs md:text-base">{card.desc}</h6>
                <h4 className="text-end text-xl md:text-2xl">{card.price}</h4>
              </div>
            </div>
          ))}
        </div>
        <Motion.div onClick={() => navigate('/menu')} initial="rest" whileHover="hover" animate="rest" className="relative inline-block select-none cursor-pointer mt-5 px-6 md:px-8 py-3 md:py-4 border border-[rgba(226,221,213,0.8)] rounded-full hover:border-[rgba(200,169,110,0.5)] transition-colors">
          <span className="flex items-center gap-2 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-dmsans uppercase pb-1">SEE FULL MENU <FaArrowRight /></span>
          <Motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-6 md:left-8 right-6 md:right-8 bottom-2 md:bottom-3 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
        </Motion.div>
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
        <Motion.div onClick={() => navigate('/the-cafe')} initial="rest" whileHover="hover" animate="rest" className="relative inline-block select-none cursor-pointer mt-12 md:mt-24 px-6 md:px-8 py-3 md:py-4 border border-[rgba(226,221,213,0.8)] rounded-full hover:border-[rgba(200,169,110,0.5)] transition-colors">
          <span className="flex items-center gap-2 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] pb-1">EXPLORE THE SPACE <FaArrowRight /></span>
          <Motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-6 md:left-8 right-6 md:right-8 bottom-2 md:bottom-3 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
        </Motion.div>
      </div>
      <CoffeeDivider/>

      {/* SECTION 6: Reviews */}
      <TestimonialSection />
      <CoffeeDivider />

      {/* SECTION 7: Reservation Request */}
      <div className="w-full flex flex-col items-center gap-8 px-6 md:px-0">
        <div className="w-full md:w-[80%] flex flex-col gap-4 text-center">
          <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">Reserve</h6>
          <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl md:text-5xl">Request a Table</h1>
          <p className="mx-auto max-w-2xl font-dmsans text-sm leading-relaxed text-[rgba(100,96,88,1)]">
            Planning a slow morning, a focused work block, or a conversation that needs a corner? Send a request and our team will confirm availability.
          </p>
        </div>
        <ReservationForm compact />
      </div>
      <CoffeeDivider />

      {/* SECTION 8: Visit Us */}
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
              <Motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block select-none cursor-pointer px-4 md:px-6 py-3 md:py-4 border border-[rgba(226,221,213,0.8)] rounded-full hover:border-[rgba(200,169,110,0.5)] transition-colors">
                <span className="flex items-center gap-2 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-dmsans uppercase pb-1">CALL NOW <FaArrowRight /></span>
                <Motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-4 md:left-6 right-4 md:right-6 bottom-2 md:bottom-3 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
              </Motion.div>
              <Motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block select-none cursor-pointer px-4 md:px-6 py-3 md:py-4 border border-[rgba(226,221,213,0.8)] rounded-full hover:border-[rgba(200,169,110,0.5)] transition-colors">
                <span className="flex items-center gap-2 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-dmsans uppercase pb-1">WHATSAPP <FaArrowRight /></span>
                <Motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-4 md:left-6 right-4 md:right-6 bottom-2 md:bottom-3 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
              </Motion.div>
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
