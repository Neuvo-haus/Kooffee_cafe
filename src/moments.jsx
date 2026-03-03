import React, { useState } from "react";
import CoffeeDivider from "./components/cooffeedivider";

const Moments = () => {
    const [filter, setFilter] = useState("ALL");

    const categories = ["ALL", "FAM VISITS", "QUIET AFTERNOONS", "CONVERSATIONS", "FILM DISCUSSIONS"];

    const images = [
        { id: 1, category: "FAM VISITS", height: "h-[300px] md:h-[450px]", gradient: "linear-gradient(135deg, rgba(179, 144, 118, 0.9) 0%, rgba(135, 107, 88, 0.9) 100%)" },
        { id: 2, category: "QUIET AFTERNOONS", height: "h-[200px] md:h-[300px]", gradient: "linear-gradient(180deg, rgba(206, 178, 146, 0.9) 0%, rgba(181, 149, 115, 0.9) 100%)" },
        { id: 3, category: "QUIET AFTERNOONS", height: "h-[250px] md:h-[400px]", gradient: "linear-gradient(135deg, rgba(160, 110, 70, 0.9) 0%, rgba(200, 150, 110, 0.9) 100%)" },
        { id: 4, category: "QUIET AFTERNOONS", height: "h-[220px] md:h-[350px]", gradient: "linear-gradient(180deg, rgba(140, 100, 70, 0.9) 0%, rgba(180, 140, 110, 0.9) 100%)" },
        { id: 5, category: "FAM VISITS", height: "h-[300px] md:h-[450px]", gradient: "linear-gradient(180deg, rgba(82, 60, 48, 0.9) 0%, rgba(135, 107, 88, 0.9) 100%)" },
        { id: 6, category: "FAM VISITS", height: "h-[200px] md:h-[300px]", gradient: "linear-gradient(135deg, rgba(180, 150, 120, 0.9) 0%, rgba(140, 110, 80, 0.9) 100%)" },
        { id: 7, category: "CONVERSATIONS", height: "h-[250px] md:h-[400px]", gradient: "linear-gradient(180deg, rgba(150, 120, 90, 0.9) 0%, rgba(110, 80, 50, 0.9) 100%)" },
        { id: 8, category: "CONVERSATIONS", height: "h-[220px] md:h-[350px]", gradient: "linear-gradient(180deg, rgba(220, 180, 130, 0.9) 0%, rgba(180, 140, 90, 0.9) 100%)" },
        { id: 9, category: "CONVERSATIONS", height: "h-[300px] md:h-[500px]", gradient: "linear-gradient(135deg, rgba(200, 160, 120, 0.9) 0%, rgba(160, 120, 80, 0.9) 100%)" },
        { id: 10, category: "FILM DISCUSSIONS", height: "h-[300px] md:h-[450px]", gradient: "linear-gradient(180deg, rgba(170, 130, 100, 0.9) 0%, rgba(130, 90, 60, 0.9) 100%)" },
        { id: 11, category: "FILM DISCUSSIONS", height: "h-[250px] md:h-[400px]", gradient: "linear-gradient(135deg, rgba(190, 150, 110, 0.9) 0%, rgba(150, 110, 70, 0.9) 100%)" },
        { id: 12, category: "FILM DISCUSSIONS", height: "h-[200px] md:h-[300px]", gradient: "linear-gradient(180deg, rgba(160, 120, 90, 0.9) 0%, rgba(120, 80, 50, 0.9) 100%)" },
    ];

    const quotes = [
        "\"I came for coffee. I stayed for the light.\"",
        "\"The best conversations happen when nobody's in a hurry.\"",
        "\"This place understands silence.\"",
        "\"I wrote my best chapter here. Table 7, near the window.\"",
        "\"Some mornings, this is the only place that makes sense.\"",
        "\"The saffron latte tastes like someone cares.\"",
        "\"I don't know anyone here, and that's the comfort.\"",
        "\"Three hours, two cups, one good idea. That's my ratio.\""
    ];

    const filteredImages = filter === "ALL" 
        ? images 
        : images.filter(img => img.category === filter);

    // Split into columns — 2 on mobile, 3 on desktop
    const col1 = filteredImages.filter((_, i) => i % 3 === 0);
    const col2 = filteredImages.filter((_, i) => i % 3 === 1);
    const col3 = filteredImages.filter((_, i) => i % 3 === 2);

    // For mobile: 2 columns
    const mobileCol1 = filteredImages.filter((_, i) => i % 2 === 0);
    const mobileCol2 = filteredImages.filter((_, i) => i % 2 === 1);

    const renderImageCard = (img) => (
        <div
            key={img.id}
            className={`w-full ${img.height} rounded-md relative group overflow-hidden shadow-sm`}
            style={{ background: img.gradient }}
        >
            <div className="absolute bottom-4 left-4 bg-[rgba(245,240,232,0.9)] text-[rgba(140,136,128,1)] font-dmsans text-[10px] tracking-[0.1em] py-1.5 px-4 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {img.category}
            </div>
        </div>
    );

    return (
        <div className="w-full relative flex items-center flex-col pb-20 pt-28 md:pt-32 bg-[rgba(245,240,232,1)]">
            
            {/* SECTION 1: Header */}
            <div className="w-full flex flex-col items-center justify-center pt-6 md:pt-10 pb-6 md:pb-8 px-6 md:px-0">
                <div className="w-full md:w-[80%] flex flex-col items-center gap-4 md:gap-6">
                    <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase text-center">Gallery</h6>
                    
                    <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-4xl md:text-6xl italic text-center">
                        Some moments stay.
                    </h1>

                    <p className="w-full md:w-[50%] text-center font-dmsans text-[rgba(140,136,128,1)] text-[12px] md:text-[13px] leading-loose">
                        Fam visits. Quiet afternoons. Conversations. Film discussions. No captions needed.
                    </p>
                </div>
            </div>

            {/* SECTION 2: Filters */}
            <div className="w-[90%] md:w-[80%] flex justify-center flex-wrap gap-2 md:gap-4 mb-10 md:mb-16">
                {categories.map((cat) => (
                    <button 
                        key={cat}
                        onClick={() => setFilter(cat)}
                        className={`font-dmsans text-[9px] md:text-[10px] tracking-[0.1em] py-2 px-4 md:px-6 rounded-full border transition-all duration-300 ${
                            filter === cat 
                            ? "bg-[rgba(28,28,26,1)] text-white border-[rgba(28,28,26,1)]" 
                            : "bg-transparent text-[rgba(140,136,128,1)] border-[rgba(226,221,213,0.8)] hover:border-[rgba(140,136,128,1)]"
                        }`}
                    >
                        {cat}
                    </button>
                ))}
            </div>

            {/* SECTION 3: Masonry Gallery Grid */}
            {/* Mobile: 2 columns */}
            <div className="w-[90%] md:hidden flex items-start justify-center gap-4 mb-20">
                <div className="flex flex-col gap-4 w-1/2">
                    {mobileCol1.map(renderImageCard)}
                </div>
                <div className="flex flex-col gap-4 w-1/2">
                    {mobileCol2.map(renderImageCard)}
                </div>
            </div>

            {/* Desktop: 3 columns */}
            <div className="hidden md:flex w-[80%] items-start justify-center gap-6 mb-32">
                <div className="flex flex-col gap-6 w-1/3">
                    {col1.map(renderImageCard)}
                </div>
                <div className="flex flex-col gap-6 w-1/3">
                    {col2.map(renderImageCard)}
                </div>
                <div className="flex flex-col gap-6 w-1/3">
                    {col3.map(renderImageCard)}
                </div>
            </div>

            {/* SECTION 4: Quotes Section */}
            <div className="w-full bg-[#f1eee8] py-16 md:py-32 flex flex-col items-center justify-center border-t border-[rgba(226,221,213,0.5)]">
                <div className="w-[90%] md:w-[60%] flex flex-col items-center gap-4 md:gap-6">
                    <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-[10px] uppercase text-center mb-4 md:mb-6">Anonymous</h6>
                    
                    <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl md:text-5xl mb-10 md:mb-20 text-center">
                        Thoughts That Stayed Here
                    </h1>

                    <div className="w-full flex flex-col items-center">
                        {quotes.map((quote, index) => (
                            <div key={index} className="w-full flex flex-col items-center">
                                <p className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,0.8)] text-lg md:text-xl italic text-center py-6 md:py-10 w-full md:w-[80%]">
                                    {quote}
                                </p>
                                {index !== quotes.length - 1 && (
                                    <div className="w-full h-[1px] bg-[rgba(226,221,213,0.6)]"></div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Moments;