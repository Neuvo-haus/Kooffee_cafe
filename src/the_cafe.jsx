import React from "react";
import CoffeeDivider from "./components/cooffeedivider";
import { FiDownload } from "react-icons/fi";
import { FaExternalLinkAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";

const TheCafe = () => {
    return (
        <div className="w-full relative flex items-center flex-col pb-20">
            
            {/* SECTION 1: Our Story */}
            <div className="w-full min-h-screen flex flex-col items-center justify-center pt-24 px-6 md:px-0">
                <div className="w-full md:w-[80%] flex flex-col items-start gap-5">
                    <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">Our Story</h6>
                    
                    <div className="flex flex-col md:flex-row gap-10 md:gap-20 w-full mt-5">
                        <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-10">
                            <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-4xl md:text-6xl italic">Why This Space Exists</h1>
                            <div className="pl-6 border-l-2 border-[#C4A882]">
                                <p className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,0.8)] text-xl md:text-3xl italic leading-relaxed">
                                    "We didn't set out to build a café. We set out to build a reason to slow down."
                                </p>
                            </div>
                        </div>
                        
                        <div className="w-full md:w-1/2 flex flex-col gap-6 md:gap-8 font-dmsans text-[rgba(140,136,128,1)] text-[14px] md:text-[15px] leading-loose">
                            <p>Kooffe was born from a simple observation: Ahmedabad moves fast, but its best moments happen slowly. A cup of chai with a stranger. A morning walk along the Sabarmati. The way sunlight hits the old city walls at 7 AM.</p>
                            <p>We wanted to create a space that honors that pace — where time is not something you manage, but something you inhabit. Where the coffee is brewed with patience, the food is prepared with intention, and the conversations unfold without urgency.</p>
                            <p>This isn't about being trendy or instagrammable. It's about being real. About using local Gujarat produce because it's better, not because it's fashionable. About choosing quiet over noise, depth over breadth, presence over performance.</p>
                        </div>
                    </div>
                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 2: The People Behind */}
            <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-0">
                <div className="w-full md:w-[80%] flex flex-col items-center gap-5">
                    <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase text-center">The People Behind</h6>
                    <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl md:text-5xl italic text-center mb-10 md:mb-16">Founded on Friendship</h1>
                    
                    <div className="flex flex-col md:flex-row gap-12 md:gap-32 w-full md:w-[90%] justify-center">
                        {/* Person 1 */}
                        <div className="w-full md:w-1/2 flex flex-col items-center text-center gap-6 md:gap-8">
                            <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl border border-[rgba(226,221,213,0.5)]">
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "linear-gradient(135deg, #C2AB89 0%, #A68F6E 100%)" }}></div>
                            </div>
                            <h3 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-2xl md:text-3xl">Malhar Thakar</h3>
                            <p className="font-dmsans text-[rgba(140,136,128,1)] text-[13px] leading-relaxed px-2 md:px-4">
                                I grew up in the old city, where every lane has a chai stall and every stall has a story. Kooffe is my attempt to build a space where those stories continue — over better coffee, in a quieter room, with a little more intention. This place is personal.
                            </p>
                        </div>

                        {/* Person 2 */}
                        <div className="w-full md:w-1/2 flex flex-col items-center text-center gap-6 md:gap-8">
                            <div className="w-36 h-36 md:w-48 md:h-48 rounded-full overflow-hidden shadow-xl border border-[rgba(226,221,213,0.5)]">
                                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: "linear-gradient(135deg, #B8A381 0%, #9C8666 100%)" }}></div>
                            </div>
                            <h3 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-2xl md:text-3xl">Puja Joshi</h3>
                            <p className="font-dmsans text-[rgba(140,136,128,1)] text-[13px] leading-relaxed px-2 md:px-4">
                                I believe food and drink should nourish more than the body. Every recipe here comes from somewhere — a grandmother's kitchen, a farmer's field, a conversation that changed how I see flavor. Kooffe is where all those threads come together.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 3: Interior Philosophy */}
            <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-0">
                <div className="w-full md:w-[80%] flex flex-col items-start gap-5">
                    <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">Interior Philosophy</h6>
                    <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl md:text-5xl mb-4 md:mb-6">The Space Itself</h1>
                    
                    <div className="flex flex-col md:flex-row gap-6 md:gap-20 w-full mb-8 md:mb-12">
                        <p className="w-full md:w-1/2 font-dmsans text-[rgba(140,136,128,1)] text-[14px] md:text-[15px] leading-loose">
                            Every surface in Kooffe has been chosen with care. The reclaimed teak tables came from old Ahmedabad havelis. The ceramic cups are handmade by local artisans in Kheda. The lighting is warm but never dim — bright enough to read, soft enough to dream.
                        </p>
                        <p className="w-full md:w-1/2 font-dmsans text-[rgba(140,136,128,1)] text-[14px] md:text-[15px] leading-loose">
                            We designed the seating to offer choices: communal benches for the social, corner nooks for the solitary, and a window counter for those who like to watch the world go by. The outdoor area is lined with neem trees, and yes, your dog is welcome there.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
                        <div className="flex flex-col gap-4">
                            <div className="w-full h-48 md:h-64 rounded-2xl shadow-sm" style={{ background: "linear-gradient(180deg, #AFA08B 0%, #90806B 100%)" }}></div>
                            <span className="font-dmsans text-[rgba(140,136,128,1)] italic text-[13px]">Reclaimed teak communal table</span>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="w-full h-48 md:h-64 rounded-2xl shadow-sm" style={{ background: "linear-gradient(180deg, #BCAB94 0%, #9D8C76 100%)" }}></div>
                            <span className="font-dmsans text-[rgba(140,136,128,1)] italic text-[13px]">Handmade Kheda ceramics</span>
                        </div>
                        <div className="flex flex-col gap-4">
                            <div className="w-full h-48 md:h-64 rounded-2xl shadow-sm" style={{ background: "linear-gradient(180deg, #B5A58D 0%, #96866F 100%)" }}></div>
                            <span className="font-dmsans text-[rgba(140,136,128,1)] italic text-[13px]">Morning light through east windows</span>
                        </div>
                    </div>
                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 4: Why Here */}
            <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-0">
                <div className="w-full md:w-[80%] flex flex-col items-center gap-5">
                    <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase text-center">Why Here</h6>
                    <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl md:text-5xl mb-4 md:mb-6 text-center">Why Ahmedabad</h1>
                    
                    <p className="w-full md:w-[85%] text-center font-dmsans text-[rgba(140,136,128,1)] text-[14px] md:text-[15px] leading-loose mb-10 md:mb-16">
                        Ahmedabad is a city of contrasts — ancient pol houses next to modern glass towers, street food vendors beside fine dining restaurants, the noise of commerce and the silence of the Sabarmati. It's a city that knows how to hold both energy and calm. Kooffe exists in that calm. We chose this city because it chose us — because there was room here for something quiet, something intentional, something that felt like home.
                    </p>

                    <div className="w-full md:w-[70%] border-t border-b border-[rgba(226,221,213,0.8)] py-10 md:py-14 text-center">
                        <p className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,0.8)] text-2xl md:text-4xl italic">
                            "Some cities wake up slowly. We built a place for that."
                        </p>
                    </div>
                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 5: For Media */}
            <div className="w-full min-h-screen flex flex-col items-center justify-center px-6 md:px-0">
                <div className="w-full md:w-[80%] flex flex-col items-start gap-5">
                    <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">For Media</h6>
                    <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl md:text-5xl mb-4 md:mb-6">Press</h1>
                    
                    <p className="w-full md:w-[50%] font-dmsans text-[rgba(140,136,128,1)] text-[14px] md:text-[15px] leading-loose mb-6 md:mb-8">
                        Kooffe is a specialty café in Ahmedabad celebrating slow living, Gujarat heritage ingredients, and meaningful human connection. Founded by Malhar Thakar and Puja Joshi.
                    </p>

                    <button className="bg-[rgba(28,28,26,1)] text-white font-dmsans text-xs tracking-[0.1em] py-3 md:py-4 px-6 md:px-8 rounded-full flex items-center gap-2 hover:bg-black transition-colors font-medium">
                        <FiDownload className="text-sm" />
                        DOWNLOAD MEDIA KIT
                    </button>

                    <div className="flex flex-col md:flex-row gap-4 md:gap-8 mt-6">
                        <a href="#" className="flex items-center gap-2 font-dmsans text-[rgba(28,28,26,0.8)] text-[13px] font-bold border-b border-[#222221] pb-0.5">
                            <FaExternalLinkAlt className="text-[10px]" /> Official Photos
                        </a>
                        <a href="mailto:press@kooffe.in" className="flex items-center gap-2 font-dmsans text-[rgba(28,28,26,0.8)] text-[13px] font-bold border-b border-[#222221] pb-0.5">
                            <MdOutlineMailOutline className="text-sm" /> press@kooffe.in
                        </a>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default TheCafe;