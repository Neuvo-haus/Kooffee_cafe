import React from "react";
import CoffeeDivider from "./components/cooffeedivider";
import { FiDownload } from "react-icons/fi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { motion } from "framer-motion";

const TheCafe = () => {
    return (
        <div className="w-full relative flex items-center flex-col pb-20 pt-24 md:pt-32 bg-[rgba(245,240,232,1)]">
            
            {/* SECTION 1: Editorial Hero / Our Story */}
            <div className="w-full flex justify-center px-6 md:px-0 mb-20 md:mb-32">
                <div className="w-full md:w-[85%] lg:w-[75%] flex flex-col md:flex-row items-center relative gap-10 md:gap-0">
                    {/* Left: Atmospheric Image */}
                    <div className="w-full md:w-[55%] h-[400px] md:h-[650px] relative rounded-2xl overflow-hidden shadow-lg group">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=1000&auto=format&fit=crop')" }}></div>
                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-1000"></div>
                    </div>
                    
                    {/* Right: Glassmorphism Story Card overlapping the image on desktop */}
                    <div className="w-full md:w-[55%] md:-ml-[10%] relative z-10 p-8 md:p-14 rounded-2xl border border-[rgba(226,221,213,0.8)] bg-[rgba(250,247,242,0.92)] backdrop-blur-md shadow-xl flex flex-col gap-6 md:gap-8 hover:shadow-2xl transition-shadow duration-500">
                        <div className="flex flex-col gap-3">
                            <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">Our Story</h6>
                            <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-4xl md:text-5xl italic leading-tight">
                                Why This Space Exists
                            </h1>
                        </div>
                        
                        <div className="pl-6 border-l-2 border-[#C4A882]">
                            <p className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,0.9)] text-xl md:text-2xl italic leading-relaxed">
                                "We didn't set out to build a café. We set out to build a reason to slow down."
                            </p>
                        </div>
                        
                        <div className="flex flex-col gap-4 font-dmsans text-[rgba(100,96,88,1)] text-[13px] md:text-[14px] leading-loose">
                            <p>Kooffe was born from a simple observation: Ahmedabad moves fast, but its best moments happen slowly. A cup of chai with a stranger. A morning walk along the Sabarmati. The way sunlight hits the old city walls at 7 AM.</p>
                            <p>We wanted to create a space that honors that pace — where time is not something you manage, but something you inhabit. Where the coffee is brewed with patience, the food is prepared with intention, and the conversations unfold without urgency.</p>
                        </div>
                    </div>
                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 2: The People Behind (Elevated Portrait Cards) */}
            <div className="w-full flex flex-col items-center justify-center py-16 md:py-24 px-6 md:px-0">
                <div className="w-full md:w-[80%] flex flex-col items-center gap-12 md:gap-20">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">The People Behind</h6>
                        <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-4xl md:text-5xl italic">Founded on Friendship</h1>
                    </div>
                    
                    <div className="flex flex-col md:flex-row gap-8 md:gap-16 w-full justify-center">
                        {/* Person 1 Card */}
                        <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col group select-none cursor-pointer relative">
                            <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-md relative">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=600&auto=format&fit=crop')" }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute bottom-6 left-6 right-6 text-white text-left text-shadow flex flex-col gap-1 pb-10 group-hover:pl-2 transition-all duration-500">
                                    <h3 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl italic">Malhar Thakar</h3>
                                    <h6 className="font-dmsans tracking-[0.2em] text-[rgba(245,240,232,0.9)] text-[10px] uppercase font-bold">Co-Founder</h6>
                                </div>
                            </div>
                            <div className="w-[90%] mx-auto -mt-16 md:-mt-12 relative z-10 p-6 md:p-8 rounded-xl border border-[rgba(226,221,213,0.8)] bg-[rgba(250,247,242,1)] shadow-xl transition-transform duration-500 group-hover:-translate-y-4">
                                <p className="font-dmsans text-[rgba(100,96,88,1)] text-[13px] leading-loose">
                                    I grew up in the old city, where every lane has a chai stall and every stall has a story. Kooffe is my attempt to build a space where those stories continue — over better coffee, in a quieter room, with a little more intention. This place is personal.
                                </p>
                            </div>
                        </div>

                        {/* Person 2 Card */}
                        <div className="w-full md:w-[45%] lg:w-[40%] flex flex-col group select-none cursor-pointer relative md:mt-20">
                            <div className="w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-md relative">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop')" }}></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <div className="absolute bottom-6 left-6 right-6 text-white text-left text-shadow flex flex-col gap-1 pb-10 group-hover:pl-2 transition-all duration-500">
                                    <h3 className="font-['Cormorant_Garamond'] text-3xl md:text-4xl italic">Puja Joshi</h3>
                                    <h6 className="font-dmsans tracking-[0.2em] text-[rgba(245,240,232,0.9)] text-[10px] uppercase font-bold">Co-Founder</h6>
                                </div>
                            </div>
                            <div className="w-[90%] mx-auto -mt-16 md:-mt-12 relative z-10 p-6 md:p-8 rounded-xl border border-[rgba(226,221,213,0.8)] bg-[rgba(250,247,242,1)] shadow-xl transition-transform duration-500 group-hover:-translate-y-4">
                                <p className="font-dmsans text-[rgba(100,96,88,1)] text-[13px] leading-loose">
                                    I believe food and drink should nourish more than the body. Every recipe here comes from somewhere — a grandmother's kitchen, a farmer's field, a conversation that changed how I see flavor. Kooffe is where all those threads come together.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 3: Interior Philosophy (Staggered Masonry Layout) */}
            <div className="w-full flex flex-col items-center justify-center py-16 md:py-32 px-6 md:px-0 bg-[#f8f6f2] border-t border-[rgba(226,221,213,0.5)]">
                <div className="w-full md:w-[85%] lg:w-[80%] flex flex-col md:flex-row items-center gap-12 md:gap-20">
                    
                    {/* Left: Text Content */}
                    <div className="w-full md:w-[45%] flex flex-col items-start gap-6 md:gap-8">
                        <div className="flex flex-col gap-3">
                            <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">Interior Philosophy</h6>
                            <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-4xl md:text-6xl italic leading-tight mb-2">The Space Itself</h1>
                            <div className="w-16 h-0.5 bg-[#C4A882]"></div>
                        </div>
                        
                        <div className="flex flex-col gap-6 font-dmsans text-[rgba(100,96,88,1)] text-[14px] md:text-[15px] leading-loose">
                            <p>
                                Every surface in Kooffe has been chosen with care. The reclaimed teak tables came from old Ahmedabad havelis. The ceramic cups are handmade by local artisans in Kheda. The lighting is warm but never dim — bright enough to read, soft enough to dream.
                            </p>
                            <p>
                                We designed the seating to offer choices: communal benches for the social, corner nooks for the solitary, and a window counter for those who like to watch the world go by. The outdoor area is lined with neem trees, and yes, your dog is welcome there.
                            </p>
                        </div>
                    </div>

                    {/* Right: Staggered Image Composition */}
                    <div className="w-full md:w-[55%] flex gap-4 md:gap-6 h-[500px] md:h-[700px]">
                        {/* Tall Image */}
                        <div className="w-1/2 h-[90%] mt-[10%] rounded-2xl overflow-hidden shadow-lg relative group">
                            <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?q=80&w=600&auto=format&fit=crop')" }}></div>
                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors duration-500"></div>
                            <div className="absolute bottom-6 left-6 bg-[rgba(250,247,242,0.95)] px-4 py-2 rounded-full text-[10px] font-dmsans uppercase tracking-[0.1em] text-[rgba(28,28,26,1)] font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 backdrop-blur-sm border border-[rgba(226,221,213,0.5)]">Handmade Ceramics</div>
                        </div>
                        
                        {/* Stacked Images */}
                        <div className="w-1/2 h-full flex flex-col gap-4 md:gap-6">
                            <div className="h-[55%] w-full rounded-2xl overflow-hidden shadow-md relative group">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=600&auto=format&fit=crop')" }}></div>
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/30 transition-colors duration-500"></div>
                                <div className="absolute bottom-6 left-6 bg-[rgba(250,247,242,0.95)] px-4 py-2 rounded-full text-[10px] font-dmsans uppercase tracking-[0.1em] text-[rgba(28,28,26,1)] font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 backdrop-blur-sm border border-[rgba(226,221,213,0.5)]">Morning Light</div>
                            </div>
                            <div className="h-[40%] w-full rounded-2xl overflow-hidden shadow-md relative group mt-auto">
                                <div className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 group-hover:scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop')" }}></div>
                                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/30 transition-colors duration-500"></div>
                                <div className="absolute bottom-6 left-6 bg-[rgba(250,247,242,0.95)] px-4 py-2 rounded-full text-[10px] font-dmsans uppercase tracking-[0.1em] text-[rgba(28,28,26,1)] font-bold shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 backdrop-blur-sm border border-[rgba(226,221,213,0.5)]">Teak Tables</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 4: Why Here (Atmospheric Block) */}
            <div className="w-full flex flex-col items-center justify-center py-16 md:py-32 px-6 md:px-0">
                <div className="w-full md:w-[60%] lg:w-[50%] flex flex-col items-center gap-8 md:gap-12 relative">
                    <div className="flex flex-col items-center gap-4 text-center">
                        <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">Why Here</h6>
                        <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-4xl md:text-6xl italic">Why Ahmedabad</h1>
                    </div>
                    
                    <p className="font-dmsans text-[rgba(100,96,88,1)] text-[14px] md:text-[16px] leading-loose text-center relative z-10">
                        Ahmedabad is a city of contrasts — ancient pol houses next to modern glass towers, street food vendors beside fine dining restaurants, the noise of commerce and the silence of the Sabarmati. It's a city that knows how to hold both energy and calm. <strong className="font-medium text-[rgba(28,28,26,1)]">Kooffe exists in that calm.</strong> We chose this city because it chose us — because there was room here for something quiet, something intentional, something that felt like home.
                    </p>

                    <div className="w-[80%] md:w-[60%] h-[1px] bg-gradient-to-r from-transparent via-[#C4A882] to-transparent mt-4 mb-2 opacity-50"></div>

                    <h2 className="font-['Cormorant_Garamond'] text-[rgba(200,169,110,1)] text-3xl md:text-5xl italic text-center leading-snug">
                        "Some cities wake up slowly. <br className="hidden md:block"/>We built a place for that."
                    </h2>
                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 5: For Media */}
            <div className="w-full flex flex-col items-center justify-center pt-16 pb-32 px-6 md:px-0">
                <div className="w-full md:w-[60%] lg:w-[45%] p-10 md:p-16 rounded-[2rem] border border-[rgba(226,221,213,0.8)] bg-gradient-to-b from-[rgba(250,247,242,0.8)] to-[rgba(245,240,232,0.2)] flex flex-col items-center text-center gap-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] transition-shadow duration-500">
                    <div className="flex flex-col gap-2">
                        <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-[10px] md:text-xs uppercase font-bold">For Media</h6>
                        <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-4xl md:text-5xl italic">Press Inquiries</h1>
                    </div>
                    
                    <p className="font-dmsans text-[rgba(100,96,88,1)] text-[13px] md:text-[14px] leading-relaxed max-w-[90%] md:max-w-[80%] mt-2">
                        Kooffe is a specialty café in Ahmedabad celebrating slow living, Gujarat heritage ingredients, and meaningful human connection.
                    </p>

                    <motion.button whileHover={{ y: -2 }} whileTap={{ scale: 0.98 }} className="select-none mt-6 bg-[rgba(28,28,26,1)] text-white font-dmsans text-[10px] md:text-xs tracking-[0.2em] py-4 px-8 md:px-10 rounded-full flex items-center justify-center gap-3 hover:bg-[#C4A882] transition-colors duration-500 font-bold w-full md:w-auto shadow-xl">
                        <FiDownload className="text-base" />
                        DOWNLOAD MEDIA KIT
                    </motion.button>

                    <div className="flex items-center justify-center gap-6 mt-8 w-[80%] pt-8 border-t border-[rgba(226,221,213,0.6)]">
                        <a href="#" className="flex items-center gap-2 font-dmsans text-[rgba(140,136,128,1)] hover:text-[#C4A882] text-[11px] md:text-xs tracking-widest transition-colors duration-300 uppercase font-bold">
                            <FaExternalLinkAlt className="text-[10px] mb-[1px]" /> Brand Assets
                        </a>
                        <span className="text-[rgba(226,221,213,1)]">|</span>
                        <a href="mailto:press@kooffe.in" className="flex items-center gap-2 font-dmsans text-[rgba(140,136,128,1)] hover:text-[#C4A882] text-[11px] md:text-xs tracking-widest transition-colors duration-300 uppercase font-bold">
                            <MdOutlineMailOutline className="text-[14px] mb-[1px]" /> press@kooffe.in
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TheCafe;