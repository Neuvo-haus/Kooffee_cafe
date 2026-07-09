import React from "react";
import CoffeeDivider from "./components/cooffeedivider";
import { FaArrowRight, FaWhatsapp } from "react-icons/fa6";
import { motion as Motion } from "framer-motion";
import { IoTimeOutline, IoCarOutline, IoPawOutline } from "react-icons/io5";
import { FiMusic, FiSun, FiVolume2, FiSunrise, FiCoffee, FiMoon, FiWifi, FiZap, FiPhoneCall } from "react-icons/fi";
import { CONTACT, CONTACT_LINKS, SITE_HOURS } from "./config/site";

const Visits = () => {
    return (
        <div className="w-full relative flex items-center flex-col pb-20 pt-24 md:pt-32 bg-[rgba(245,240,232,1)]">
             
            {/* SECTION 1: Editorial Hero / First Time Here */}
            <div className="w-full flex justify-center px-6 md:px-0 mb-16 md:mb-24">
                <div className="w-full md:w-[85%] lg:w-[75%] flex flex-col items-center relative gap-10">
                    <div className="w-full flex flex-col items-center text-center gap-4">
                        <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">Welcome to Kooffee</h6>
                        <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-5xl md:text-7xl italic">
                            First Time Here?
                        </h1>
                        <p className="w-full md:w-[50%] font-dmsans text-[rgba(140,136,128,1)] text-[14px] md:text-[15px] leading-loose mt-2">
                            Here's everything you need to know before you walk in. No surprises — just comfort and good coffee.
                        </p>
                    </div>

                    <div className="w-full flex flex-col md:flex-row items-center gap-10 mt-6">
                        {/* Left: Atmospheric Image */}
                        <div className="w-full md:w-[50%] h-[400px] md:h-[600px] relative rounded-2xl overflow-hidden shadow-lg group">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=800&auto=format&fit=crop')" }}></div>
                            <div className="absolute inset-0 bg-black/10 transition-colors duration-1000"></div>
                        </div>
                        
                        {/* Right: What to Expect & Where to Sit */}
                        <div className="w-full md:w-[50%] flex flex-col gap-10 md:pl-8">
                            <div className="flex flex-col gap-6 font-dmsans text-[rgba(100,96,88,1)] text-[14px] md:text-[15px] leading-loose">
                                <h3 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl italic">The Flow</h3>
                                <p>Walk in, find a table you like, and settle in. No host stand, no rush. Order at the counter or flag us down when you're ready. Everything on the menu is made fresh, so some things take a few extra minutes — that's the point.</p>
                                <p>Stay as long as you want. Read, work, talk, or just sit. We built this space to hold time, not count it.</p>
                            </div>

                            <div className="flex flex-col gap-6">
                                <h3 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl italic">Find Your Corner</h3>
                                <div className="flex flex-col gap-4">
                                    <div className="group border-b border-[rgba(226,221,213,0.8)] pb-4">
                                        <h4 className="font-dmsans text-[rgba(28,28,26,1)] font-bold text-[13px] uppercase tracking-wider mb-2 group-hover:text-[#C4A882] transition-colors">For Deep Focus</h4>
                                        <p className="font-dmsans text-[rgba(140,136,128,1)] text-[13px] leading-relaxed">East window tables. Morning light, minimal foot traffic, accessible power outlets.</p>
                                    </div>
                                    <div className="group border-b border-[rgba(226,221,213,0.8)] pb-4">
                                        <h4 className="font-dmsans text-[rgba(28,28,26,1)] font-bold text-[13px] uppercase tracking-wider mb-2 group-hover:text-[#C4A882] transition-colors">For Conversation</h4>
                                        <p className="font-dmsans text-[rgba(140,136,128,1)] text-[13px] leading-relaxed">The central teak communal bench. Where strangers share space and occasionally, stories.</p>
                                    </div>
                                    <div className="group pb-2">
                                        <h4 className="font-dmsans text-[rgba(28,28,26,1)] font-bold text-[13px] uppercase tracking-wider mb-2 group-hover:text-[#C4A882] transition-colors">For Quiet Solitude</h4>
                                        <p className="font-dmsans text-[rgba(140,136,128,1)] text-[13px] leading-relaxed">The back alcove behind the bookshelf. Dim, cozy, tucked away from the world.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 2: Location & Atmosphere (Split Card Design) */}
            <div className="w-full flex flex-col items-center justify-center py-16 md:py-24 px-6 md:px-0">
                <div className="w-full md:w-[85%] lg:w-[75%] flex flex-col md:flex-row gap-6 md:gap-8">
                    
                    {/* Location Card */}
                    <div className="w-full md:w-3/5 p-8 md:p-12 rounded-2xl border border-[rgba(226,221,213,0.8)] bg-[rgba(250,247,242,0.6)] shadow-sm flex flex-col md:flex-row justify-between gap-8 md:gap-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col gap-6 md:w-1/2">
                            <div className="flex flex-col gap-2">
                                <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">Location</h6>
                                <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-4xl italic">Find Us</h1>
                            </div>
                            
                            <div className="font-dmsans text-[rgba(28,28,26,0.9)] leading-loose text-[14px]">
                                Kooffee Cafe<br />
                                Ground Floor, Heritage House<br />
                                Near Law Garden, Navrangpura<br />
                                Ahmedabad, Gujarat 380001
                            </div>

                            <div className="font-dmsans text-[rgba(140,136,128,1)] text-[12px] p-4 bg-[rgba(245,240,232,0.8)] rounded-xl border border-[rgba(226,221,213,0.5)]">
                                <span className="font-bold text-[rgba(28,28,26,0.9)] uppercase tracking-wider text-[10px]">Landmark</span><br/>
                                Opposite Crossword Bookstore, near Law Garden night market entrance.
                            </div>
                        </div>
                        
                        {/* Minimal Map Aesthetic Placeholder */}
                        <a
                            href={CONTACT_LINKS.map}
                            target="_blank"
                            rel="noreferrer"
                            className="w-full md:w-[45%] h-[200px] md:h-auto rounded-xl overflow-hidden relative group select-none cursor-pointer border border-[rgba(226,221,213,0.8)] block"
                        >
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop')" }}></div>
                            <div className="absolute inset-0 bg-[#A68F6E]/20 group-hover:bg-transparent transition-colors duration-500"></div>
                            <div className="absolute inset-0 flex flex-col items-center justify-center text-white drop-shadow-md">
                                <svg className="w-10 h-10 mb-2 transform group-hover:-translate-y-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                                <span className="font-dmsans text-xs tracking-[0.2em] font-bold uppercase">View Map</span>
                            </div>
                        </a>
                    </div>

                    {/* Atmosphere Cues Card */}
                    <div className="w-full md:w-2/5 p-8 md:p-12 rounded-2xl border border-[rgba(226,221,213,0.8)] bg-[#2C2A28] shadow-sm flex flex-col justify-center text-center items-center gap-8 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-700" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop')" }}></div>
                        
                        <div className="relative z-10 flex flex-col gap-2 w-full">
                            <h6 className="font-dmsans tracking-[0.2em] text-[#C4A882] text-xs uppercase">The Vibe</h6>
                            <h1 className="font-['Cormorant_Garamond'] text-white text-4xl italic">Atmosphere</h1>
                        </div>

                        <div className="relative z-10 flex flex-col gap-6 w-full mt-4">
                            <div className="flex flex-col items-center gap-2 border-b border-white/10 pb-4">
                                <span className="text-xl text-[rgba(245,240,232,0.7)]"><FiMusic /></span>
                                <span className="font-dmsans text-[rgba(245,240,232,0.9)] text-[13px] tracking-wide mt-1">Lo-fi jazz & acoustic ambient</span>
                            </div>
                            <div className="flex flex-col items-center gap-2 border-b border-white/10 pb-4">
                                <span className="text-xl text-[rgba(245,240,232,0.7)]"><FiSun /></span>
                                <span className="font-dmsans text-[rgba(245,240,232,0.9)] text-[13px] tracking-wide mt-1">Warm, natural & diffused lighting</span>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <span className="text-xl text-[rgba(245,240,232,0.7)]"><FiVolume2 /></span>
                                <span className="font-dmsans text-[rgba(245,240,232,0.9)] text-[13px] tracking-wide mt-1">Soft conversation-level murmur</span>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 3: Our Hours (Elevated Glass Cards) */}
            <div className="w-full flex flex-col items-center justify-center py-16 md:py-24 px-6 md:px-0 bg-[#f8f6f2] border-y border-[rgba(226,221,213,0.5)] relative overflow-hidden">
                {/* Subtle Background Pattern/Texture */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiMwMDAwMDAiLz48L3N2Zz4=')]"></div>
                
                <div className="w-full md:w-[85%] lg:w-[75%] flex flex-col items-center gap-12 md:gap-16 relative z-10">
                    <div className="flex flex-col items-center gap-3 text-center">
                        <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">When To Come</h6>
                        <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-4xl md:text-5xl italic">The Daily Rhythm</h1>
                    </div>

                    <div className="flex flex-col md:flex-row justify-center gap-6 md:gap-8 w-full">
                        {/* Hour Card 1 */}
                        <div className="w-full md:w-1/3 p-8 md:p-10 flex flex-col items-center text-center gap-5 rounded-2xl border border-[rgba(226,221,213,0.8)] bg-white shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow duration-500 group">
                            <div className="w-16 h-16 rounded-full bg-[rgba(250,247,242,1)] border border-[rgba(226,221,213,0.8)] flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform duration-500 text-[rgba(140,136,128,1)]"><FiSunrise /></div>
                            <h3 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl italic">Golden Hour</h3>
                            <span className="font-dmsans tracking-[0.2em] text-[rgba(200,169,110,1)] text-[11px] uppercase font-bold border-t border-b border-[rgba(200,169,110,0.3)] py-1 px-4">{SITE_HOURS.goldenHour}</span>
                            <p className="font-dmsans text-[rgba(140,136,128,1)] text-[13px] leading-relaxed mt-2">
                                The café at its quietest. Fresh brews, morning pastries, and the beautiful first light of day.
                            </p>
                        </div>
                        {/* Hour Card 2 */}
                        <div className="w-full md:w-1/3 p-8 md:p-10 flex flex-col items-center text-center gap-5 rounded-2xl border border-[rgba(200,169,110,0.4)] bg-[rgba(250,247,242,1)] shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow duration-500 group relative md:-translate-y-4">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-[#C4A882] text-white text-[9px] font-dmsans uppercase tracking-widest px-3 py-1 font-bold rounded-b-md">Peak Time</div>
                            <div className="w-16 h-16 rounded-full bg-white border border-[rgba(226,221,213,0.8)] flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform duration-500 mt-2 text-[#C4A882]"><FiCoffee /></div>
                            <h3 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl italic">The Midday Buzz</h3>
                            <span className="font-dmsans tracking-[0.2em] text-[rgba(200,169,110,1)] text-[11px] uppercase font-bold border-t border-b border-[rgba(200,169,110,0.3)] py-1 px-4">12 PM – 4 PM</span>
                            <p className="font-dmsans text-[rgba(140,136,128,1)] text-[13px] leading-relaxed mt-2">
                                The social hours. Light lunch, long blacks, and the kind of vibrant talk that goes somewhere.
                            </p>
                        </div>
                        {/* Hour Card 3 */}
                        <div className="w-full md:w-1/3 p-8 md:p-10 flex flex-col items-center text-center gap-5 rounded-2xl border border-[rgba(226,221,213,0.8)] bg-white shadow-[0_4px_20px_rgb(0,0,0,0.02)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] transition-shadow duration-500 group">
                            <div className="w-16 h-16 rounded-full bg-[rgba(250,247,242,1)] border border-[rgba(226,221,213,0.8)] flex items-center justify-center text-2xl mb-2 group-hover:scale-110 transition-transform duration-500 text-[rgba(140,136,128,1)]"><FiMoon /></div>
                            <h3 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl italic">Quiet Evening</h3>
                            <span className="font-dmsans tracking-[0.2em] text-[rgba(200,169,110,1)] text-[11px] uppercase font-bold border-t border-b border-[rgba(200,169,110,0.3)] py-1 px-4">6 PM – 9 PM</span>
                            <p className="font-dmsans text-[rgba(140,136,128,1)] text-[13px] leading-relaxed mt-2">
                                Laptops open, lights dimmed low. The café transforms into a calm, work-friendly retreat.
                            </p>
                        </div>
                    </div>

                    <div className="font-dmsans text-[rgba(100,96,88,1)] text-[12px] flex items-center gap-2 border border-[rgba(226,221,213,1)] bg-white rounded-full px-6 py-3 text-center shadow-sm">
                        <IoTimeOutline className="text-sm flex-shrink-0 text-[#C4A882]" /> 
                        Standard hours: Monday-Sunday, <strong className="font-bold text-[rgba(28,28,26,0.9)]">{SITE_HOURS.standard}</strong>
                    </div>
                </div>
            </div>

            {/* SECTION 4: Practical Info Menu Style Layout */}
            <div className="w-full flex flex-col items-center justify-center py-16 md:py-24 px-6 md:px-0">
                <div className="w-full md:w-[85%] lg:w-[75%] flex flex-col md:flex-row gap-12 md:gap-20">
                    
                    {/* Left: Title & Intro */}
                    <div className="w-full md:w-1/3 flex flex-col gap-6">
                        <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">The Details</h6>
                        <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-4xl md:text-5xl italic leading-tight">Practical Information</h1>
                        <p className="font-dmsans text-[rgba(140,136,128,1)] text-[14px] leading-relaxed mt-2">
                            A quick reference guide for your visit. If there's anything else you need to know, just ask when you arrive.
                        </p>
                        
                        <div className="hidden md:flex flex-col gap-4 mt-8 p-6 rounded-2xl bg-[rgba(250,247,242,0.8)] border border-[rgba(226,221,213,0.8)]">
                            <h4 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-2xl italic">Have a specific question?</h4>
                            <a href="mailto:hello@kooffee.in" className="font-dmsans text-[12px] uppercase tracking-widest font-bold text-[#C4A882] hover:text-[rgba(28,28,26,1)] transition-colors">
                                Drop us an email
                            </a>
                        </div>
                    </div>

                    {/* Right: Info List */}
                    <div className="w-full md:w-2/3 flex flex-col">
                        {/* Info 1 */}
                        <div className="flex gap-6 p-6 border-b border-[rgba(226,221,213,0.8)] hover:bg-[rgba(250,247,242,0.5)] transition-colors group relative">
                            <div className="w-10 h-10 rounded-full border border-[rgba(226,221,213,0.8)] bg-white flex shrink-0 items-center justify-center text-[rgba(140,136,128,1)] mt-1 group-hover:text-[rgba(28,28,26,1)] group-hover:border-[rgba(28,28,26,0.3)] transition-colors"><IoCarOutline className="text-[18px]" /></div>
                            <div className="flex flex-col gap-2 w-[85%]">
                                <h4 className="font-dmsans font-bold text-[rgba(28,28,26,1)] text-[14px] uppercase tracking-wide">Parking</h4>
                                <p className="font-dmsans text-[rgba(100,96,88,1)] text-[14px] leading-relaxed">
                                    Street parking is available along the main road. Alternatively, there is a paid municipal parking lot located exactly 200m north of the café entrance.
                                </p>
                            </div>
                        </div>
                        {/* Info 2 */}
                        <div className="flex gap-6 p-6 border-b border-[rgba(226,221,213,0.8)] hover:bg-[rgba(250,247,242,0.5)] transition-colors group relative">
                            <div className="w-10 h-10 rounded-full border border-[rgba(226,221,213,0.8)] bg-white flex shrink-0 items-center justify-center text-[rgba(140,136,128,1)] mt-1 group-hover:text-[rgba(28,28,26,1)] group-hover:border-[rgba(28,28,26,0.3)] transition-colors"><FiWifi className="text-[16px]" /></div>
                            <div className="flex flex-col gap-2 w-[85%]">
                                <h4 className="font-dmsans font-bold text-[rgba(28,28,26,1)] text-[14px] uppercase tracking-wide">Internet Connection</h4>
                                <p className="font-dmsans text-[rgba(100,96,88,1)] text-[14px] leading-relaxed">
                                    We provide complimentary, unmetered high-speed WiFi for all guests. The network name and current password are provided on a card at your table or the main counter.
                                </p>
                            </div>
                        </div>
                        {/* Info 3 */}
                        <div className="flex gap-6 p-6 border-b border-[rgba(226,221,213,0.8)] hover:bg-[rgba(250,247,242,0.5)] transition-colors group relative">
                            <div className="w-10 h-10 rounded-full border border-[rgba(226,221,213,0.8)] bg-white flex shrink-0 items-center justify-center text-[rgba(140,136,128,1)] mt-1 group-hover:text-[rgba(28,28,26,1)] group-hover:border-[rgba(28,28,26,0.3)] transition-colors"><FiZap className="text-[16px]" /></div>
                            <div className="flex flex-col gap-2 w-[85%]">
                                <h4 className="font-dmsans font-bold text-[rgba(28,28,26,1)] text-[14px] uppercase tracking-wide">Power & Charging</h4>
                                <p className="font-dmsans text-[rgba(100,96,88,1)] text-[14px] leading-relaxed">
                                    Power outlets are generously distributed along the window bar seating and beneath the central communal table. Please bring your own charging adapters.
                                </p>
                            </div>
                        </div>
                        {/* Info 4 */}
                        <div className="flex gap-6 p-6 hover:bg-[rgba(250,247,242,0.5)] transition-colors group relative">
                            <div className="w-10 h-10 rounded-full border border-[rgba(226,221,213,0.8)] bg-white flex shrink-0 items-center justify-center text-[rgba(140,136,128,1)] mt-1 group-hover:text-[rgba(28,28,26,1)] group-hover:border-[rgba(28,28,26,0.3)] transition-colors"><IoPawOutline className="text-[18px]" /></div>
                            <div className="flex flex-col gap-2 w-[85%]">
                                <h4 className="font-dmsans font-bold text-[rgba(28,28,26,1)] text-[14px] uppercase tracking-wide">Pet Policy</h4>
                                <p className="font-dmsans text-[rgba(100,96,88,1)] text-[14px] leading-relaxed">
                                    Well-behaved pets are wholeheartedly welcome in our shaded outdoor seating area under the neem trees. Fresh water bowls are provided upon request.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* SECTION 5: Footer Actions */}
            <div className="w-full flex justify-center py-16 md:py-24 mb-6 md:mb-10 px-6 md:px-0 border-t border-[rgba(226,221,213,0.5)]">
                <div className="w-full md:w-[60%] flex flex-col items-center gap-8 md:gap-10">
                    <h1 className="font-['Cormorant_Garamond'] text-[rgba(140,136,128,1)] text-3xl md:text-5xl italic text-center">
                        No rush. We'll be here.
                    </h1>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 py-4 w-full">
                        <Motion.a
                            href={`tel:${CONTACT.phoneRaw}`}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="select-none w-full md:w-auto bg-[rgba(28,28,26,1)] text-white font-dmsans text-[10px] md:text-xs tracking-[0.2em] py-4 px-10 rounded-full flex items-center justify-center gap-3 hover:bg-[#C4A882] transition-colors duration-500 font-bold uppercase shadow-lg"
                        >
                            <FiPhoneCall className="text-[14px]" /> CALL US NOW
                        </Motion.a>
                        
                        <Motion.a
                            href={CONTACT_LINKS.whatsapp}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="select-none w-full md:w-auto bg-[rgba(250,247,242,1)] border border-[rgba(226,221,213,1)] text-[rgba(28,28,26,0.9)] font-dmsans text-[10px] md:text-xs tracking-[0.2em] py-4 px-10 rounded-full flex items-center justify-center gap-3 hover:border-[rgba(28,28,26,0.5)] hover:bg-white transition-all duration-500 font-bold uppercase shadow-sm"
                        >
                            <FaWhatsapp className="text-[14px]" /> Chat on WhatsApp
                        </Motion.a>
                        
                        <Motion.a
                            href={CONTACT_LINKS.directions}
                            target="_blank"
                            rel="noreferrer"
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className="select-none w-full md:w-auto bg-transparent border border-transparent text-[rgba(140,136,128,1)] font-dmsans text-[10px] md:text-xs tracking-[0.2em] py-4 px-6 md:px-8 flex items-center justify-center gap-2 hover:text-[rgba(28,28,26,1)] transition-colors duration-500 font-bold uppercase underline underline-offset-4"
                        >
                            GET DIRECTIONS <FaArrowRight className="text-[10px]" />
                        </Motion.a>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Visits;
