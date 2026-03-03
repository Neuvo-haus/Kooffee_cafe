import React from "react";
import CoffeeDivider from "./components/cooffeedivider";
import { FaArrowRight } from "react-icons/fa6";
import { motion } from "framer-motion";
import { IoTimeOutline } from "react-icons/io5";

const Visits = () => {
    return (
        <div className="w-full relative flex items-center flex-col pb-20 pt-28 md:pt-32 bg-[rgba(245,240,232,1)]">
            
            {/* SECTION 1: First Time Here */}
            <div className="w-full flex flex-col items-center justify-center pt-6 md:pt-10 pb-12 md:pb-16 px-6 md:px-0">
                <div className="w-full md:w-[80%] flex flex-col items-start gap-6 md:gap-10">
                    <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">Welcome</h6>
                    
                    <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-4xl md:text-6xl italic">
                        First Time Here?
                    </h1>

                    <p className="w-full md:w-[45%] font-dmsans text-[rgba(140,136,128,1)] text-[14px] md:text-[15px] leading-loose mb-6 md:mb-10">
                        Here's everything you need to know before you walk in. No surprises — just comfort.
                    </p>

                    <div className="flex flex-col md:flex-row gap-10 md:gap-20 w-full">
                        {/* Left Side: What to Expect */}
                        <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8">
                             <h3 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-2xl md:text-3xl">What to Expect</h3>
                             
                             <ul className="flex flex-col gap-4 md:gap-6 font-dmsans text-[rgba(140,136,128,1)] text-[13px] md:text-[14px] leading-relaxed pl-4 list-disc marker:text-[#C4A882]">
                                 <li>Walk in, find a table you like, and settle in. No host stand, no rush. Order at the counter or flag us down.</li>
                                 <li>Everything on the menu is made fresh. Some things take a few extra minutes — that's the point.</li>
                                 <li>Stay as long as you want. Read, work, talk, or just sit. No time limits, no judgement.</li>
                             </ul>
                        </div>

                        {/* Right Side: Where to Sit */}
                        <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8">
                             <h3 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-2xl md:text-3xl">Where to Sit (Based on Mood)</h3>
                             
                             <div className="flex flex-col gap-4">
                                 <div className="w-full md:w-[90%] p-5 md:p-6 rounded-xl border border-[rgba(226,221,213,0.8)] bg-[rgba(245,240,232,0.5)]">
                                     <h4 className="font-dmsans text-[rgba(28,28,26,1)] font-medium text-[14px] md:text-[15px] mb-2">Want focus?</h4>
                                     <p className="font-dmsans text-[rgba(140,136,128,1)] text-[12px] md:text-[13px] leading-relaxed">Corner table near the east window. Morning light, no foot traffic, power outlet nearby.</p>
                                 </div>
                                 <div className="w-full md:w-[90%] p-5 md:p-6 rounded-xl border border-[rgba(226,221,213,0.8)] bg-[rgba(245,240,232,0.5)]">
                                     <h4 className="font-dmsans text-[rgba(28,28,26,1)] font-medium text-[14px] md:text-[15px] mb-2">Want to talk?</h4>
                                     <p className="font-dmsans text-[rgba(140,136,128,1)] text-[12px] md:text-[13px] leading-relaxed">Central communal bench. This is where strangers become friends over shared tables.</p>
                                 </div>
                                 <div className="w-full md:w-[90%] p-5 md:p-6 rounded-xl border border-[rgba(226,221,213,0.8)] bg-[rgba(245,240,232,0.5)]">
                                     <h4 className="font-dmsans text-[rgba(28,28,26,1)] font-medium text-[14px] md:text-[15px] mb-2">Want quiet?</h4>
                                     <p className="font-dmsans text-[rgba(140,136,128,1)] text-[12px] md:text-[13px] leading-relaxed">Back alcove behind the bookshelf. Dim, cozy, and tucked away from the world.</p>
                                 </div>
                             </div>
                        </div>
                    </div>

                    {/* Atmosphere Cues */}
                    <div className="w-full mt-6 md:mt-10 p-6 md:p-8 rounded-xl border border-[rgba(226,221,213,0.8)] bg-[rgba(245,240,232,0.5)] flex flex-col gap-4 md:gap-6">
                        <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-[10px] uppercase">Atmosphere Cues</h6>
                        <div className="flex flex-col md:flex-row gap-4 md:gap-12 font-dmsans text-[rgba(28,28,26,0.8)] text-[12px] md:text-[13px] font-medium">
                            <span className="flex items-center gap-2">🎵 Lo-fi jazz & ambient</span>
                            <span className="flex items-center gap-2">💡 Warm, natural lighting</span>
                            <span className="flex items-center gap-2">🔉 Soft conversation-level noise</span>
                        </div>
                    </div>
                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 2: Location */}
            <div className="w-full flex flex-col items-center justify-center py-12 md:py-16 px-6 md:px-0">
                <div className="w-full md:w-[80%] flex flex-col md:flex-row justify-between items-start md:items-center gap-8 md:gap-10">
                    <div className="w-full md:w-[45%] flex flex-col gap-4 md:gap-6">
                        <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">Location</h6>
                        <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl md:text-5xl mb-4 md:mb-6">Find Us</h1>
                        
                        <div className="font-dmsans text-[rgba(28,28,26,0.8)] leading-snug text-[14px] md:text-[15px] mb-4 md:mb-6 font-medium">
                            Kooffe Cafe<br />
                            Ground Floor, Heritage House<br />
                            Near Law Garden, Navrangpura<br />
                            Ahmedabad, Gujarat 380001
                        </div>

                        <div className="font-dmsans text-[rgba(140,136,128,1)] text-[12px] md:text-[13px]">
                            <span className="font-bold text-[rgba(28,28,26,0.8)]">Landmark:</span> Opposite Crossword Bookstore, near Law Garden night market entrance
                        </div>
                    </div>

                    {/* Map Placeholder */}
                    <div className="w-full md:w-[50%] h-[250px] md:h-[350px] bg-[rgba(226,221,213,0.5)] rounded-2xl flex flex-col items-center justify-center text-[rgba(200,169,110,1)] border border-[rgba(226,221,213,0.8)] shadow-sm">
                        <svg className="w-8 h-8 md:w-10 md:h-10 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                        <span className="font-dmsans text-sm font-medium text-[rgba(140,136,128,1)]">Google Maps</span>
                        <span className="font-dmsans text-xs mt-1 text-[rgba(140,136,128,1)]">Navrangpura, Ahmedabad</span>
                    </div>
                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 3: Our Hours */}
            <div className="w-full flex flex-col items-center justify-center py-12 md:py-16 px-6 md:px-0">
                <div className="w-full md:w-[80%] flex flex-col items-center gap-8 md:gap-12">
                    <div className="flex flex-col items-center gap-3 md:gap-4">
                        <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">When To Come</h6>
                        <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl md:text-5xl text-center">Our Hours</h1>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 w-full">
                        {/* Hour Card 1 */}
                        <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col items-center text-center gap-3 md:gap-4 rounded-xl border border-[rgba(226,221,213,0.8)] bg-transparent shadow-sm">
                            <span className="text-2xl">🌅</span>
                            <h3 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-xl md:text-2xl">Golden Hour</h3>
                            <span className="font-dmsans tracking-[0.1em] text-[rgba(200,169,110,1)] text-[10px] uppercase font-bold">7-10 AM</span>
                            <p className="font-dmsans text-[rgba(140,136,128,1)] text-[12px] md:text-[13px] leading-relaxed mt-1 md:mt-2">
                                The café at its quietest. Fresh brews, morning pastries, and the first light of day.
                            </p>
                        </div>
                        {/* Hour Card 2 */}
                        <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col items-center text-center gap-3 md:gap-4 rounded-xl border border-[rgba(226,221,213,0.8)] bg-transparent shadow-sm">
                            <span className="text-2xl">☕</span>
                            <h3 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-xl md:text-2xl">Conversation Hour</h3>
                            <span className="font-dmsans tracking-[0.1em] text-[rgba(200,169,110,1)] text-[10px] uppercase font-bold">12-4 PM</span>
                            <p className="font-dmsans text-[rgba(140,136,128,1)] text-[12px] md:text-[13px] leading-relaxed mt-1 md:mt-2">
                                The social hours. Lunch, long blacks, and the kind of talk that goes somewhere.
                            </p>
                        </div>
                        {/* Hour Card 3 */}
                        <div className="w-full md:w-1/3 p-6 md:p-8 flex flex-col items-center text-center gap-3 md:gap-4 rounded-xl border border-[rgba(226,221,213,0.8)] bg-transparent shadow-sm">
                            <span className="text-2xl">🌙</span>
                            <h3 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-xl md:text-2xl">Quiet Hour</h3>
                            <span className="font-dmsans tracking-[0.1em] text-[rgba(200,169,110,1)] text-[10px] uppercase font-bold">6-9 PM</span>
                            <p className="font-dmsans text-[rgba(140,136,128,1)] text-[12px] md:text-[13px] leading-relaxed mt-1 md:mt-2">
                                Laptops open, lights dimmed. The café transforms into a work-friendly retreat.
                            </p>
                        </div>
                    </div>

                    <div className="font-dmsans text-[rgba(140,136,128,1)] text-[11px] md:text-[12px] flex items-center gap-2 border border-[rgba(226,221,213,0.8)] rounded-full px-4 md:px-6 py-2 text-center">
                        <IoTimeOutline className="text-sm flex-shrink-0" /> 
                        Standard hours: Monday–Sunday, 7 AM – 9 PM
                    </div>
                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 4: Practical Info */}
            <div className="w-full flex flex-col items-center justify-center py-12 md:py-16 px-6 md:px-0">
                <div className="w-full md:w-[80%] flex flex-col items-start gap-8 md:gap-12">
                     <div className="flex flex-col items-start gap-3 md:gap-4">
                        <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">Good To Know</h6>
                        <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl md:text-5xl">Practical Info</h1>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 w-full">
                        {/* Info 1 */}
                        <div className="p-6 md:p-8 flex flex-col gap-3 md:gap-4 rounded-xl border border-[rgba(226,221,213,0.8)] bg-transparent shadow-sm">
                            <span className="text-[#C4A882] text-xl">🚘</span>
                            <h4 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-lg md:text-xl">Parking</h4>
                            <p className="font-dmsans text-[rgba(140,136,128,1)] text-[12px] md:text-[13px] leading-relaxed">
                                Street parking available along the road. Paid parking lot 200m north.
                            </p>
                        </div>
                        {/* Info 2 */}
                        <div className="p-6 md:p-8 flex flex-col gap-3 md:gap-4 rounded-xl border border-[rgba(226,221,213,0.8)] bg-transparent shadow-sm">
                            <span className="text-[#C4A882] text-xl">📶</span>
                            <h4 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-lg md:text-xl">WiFi</h4>
                            <p className="font-dmsans text-[rgba(140,136,128,1)] text-[12px] md:text-[13px] leading-relaxed">
                                Free high-speed WiFi. Ask at the counter for the password.
                            </p>
                        </div>
                        {/* Info 3 */}
                        <div className="p-6 md:p-8 flex flex-col gap-3 md:gap-4 rounded-xl border border-[rgba(226,221,213,0.8)] bg-transparent shadow-sm">
                            <span className="text-[#C4A882] text-xl">🔌</span>
                            <h4 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-lg md:text-xl">Power Outlets</h4>
                            <p className="font-dmsans text-[rgba(140,136,128,1)] text-[12px] md:text-[13px] leading-relaxed">
                                Available at window seats and the communal bench. Bring your charger.
                            </p>
                        </div>
                        {/* Info 4 */}
                        <div className="p-6 md:p-8 flex flex-col gap-3 md:gap-4 rounded-xl border border-[rgba(226,221,213,0.8)] bg-transparent shadow-sm">
                            <span className="text-[#C4A882] text-xl">🐾</span>
                            <h4 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-lg md:text-xl">Pet Policy</h4>
                            <p className="font-dmsans text-[rgba(140,136,128,1)] text-[12px] md:text-[13px] leading-relaxed">
                                Pets are welcome in the outdoor seating area. Water bowls provided.
                            </p>
                        </div>
                    </div>

                    {/* Contact Us Footer */}
                    <div className="w-full mt-2 md:mt-4 p-6 md:p-8 rounded-xl border border-[rgba(226,221,213,0.8)] bg-transparent flex flex-col md:flex-row justify-between items-start md:items-center gap-6 md:gap-4 shadow-sm">
                        <div className="flex flex-col gap-2">
                             <h4 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-lg md:text-xl">Contact Us Directly</h4>
                             <p className="font-dmsans text-[rgba(140,136,128,1)] text-[12px] md:text-[13px]">We're happy to answer any questions before you visit.</p>
                        </div>
                        <div className="flex gap-3 md:gap-4 flex-wrap">
                            <button className="bg-[rgba(28,28,26,1)] text-white font-dmsans text-[10px] tracking-[0.1em] py-3 px-6 md:px-8 rounded-full flex items-center gap-2 hover:bg-black transition-colors font-bold uppercase">
                                📞 CALL NOW
                            </button>
                            <button className="bg-transparent border border-[rgba(226,221,213,0.8)] text-[rgba(28,28,26,0.8)] font-dmsans text-[10px] tracking-[0.1em] py-3 px-6 md:px-8 rounded-full flex items-center gap-2 hover:border-[rgba(28,28,26,0.5)] transition-colors font-bold uppercase">
                                WHATSAPP
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 5: Footer Actions */}
            <div className="w-full flex justify-center py-16 md:py-32 mb-6 md:mb-10 px-6 md:px-0">
                <div className="w-full md:w-[60%] flex flex-col items-center gap-8 md:gap-10">
                    <h1 className="font-['Cormorant_Garamond'] text-[rgba(140,136,128,1)] text-3xl md:text-5xl italic text-center">
                        No rush. We'll be here.
                    </h1>

                    <div className="flex flex-col md:flex-row items-center gap-4 md:gap-10 mt-2 md:mt-4">
                        <motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block cursor-pointer px-5 md:px-6 py-3 md:py-4 border border-[rgba(226,221,213,0.8)] rounded-full hover:border-[rgba(200,169,110,0.5)] transition-colors">
                            <span className="flex items-center gap-2 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-dmsans uppercase pb-1 text-[rgba(28,28,26,1)] font-medium">VIEW ON MAP <FaArrowRight /></span>
                            <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-5 md:left-6 right-5 md:right-6 bottom-2 md:bottom-3 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
                        </motion.div>
                        
                        <motion.div initial="rest" whileHover="hover" animate="rest" className="relative inline-block cursor-pointer px-5 md:px-6 py-3 md:py-4 border border-[rgba(226,221,213,0.8)] rounded-full hover:border-[rgba(200,169,110,0.5)] transition-colors">
                            <span className="flex items-center gap-2 text-xs md:text-sm tracking-[0.2em] md:tracking-[0.3em] font-dmsans uppercase pb-1 text-[rgba(28,28,26,1)] font-medium">GET DIRECTIONS <FaArrowRight /></span>
                            <motion.div variants={{ rest: { scaleX: 0 }, hover: { scaleX: 1 } }} transition={{ type: "spring", stiffness: 300, damping: 25 }} className="absolute left-5 md:left-6 right-5 md:right-6 bottom-2 md:bottom-3 h-[1px] bg-[rgba(200,169,110,1)] origin-left" />
                        </motion.div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Visits;