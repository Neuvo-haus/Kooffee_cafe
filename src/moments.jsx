import React, { useState } from "react";
import CoffeeDivider from "./components/cooffeedivider";

const Moments = () => {
    const [filter, setFilter] = useState("ALL");

    const categories = ["ALL", "FAM VISITS", "QUIET AFTERNOONS", "CONVERSATIONS", "FILM DISCUSSIONS"];

    const images = [
        { id: 1, category: "FAM VISITS", height: "h-[300px] md:h-[450px]", gradient: "url('https://images.unsplash.com/photo-1511920170033-f8396924c348?q=80&w=600&auto=format&fit=crop')" },
        { id: 2, category: "QUIET AFTERNOONS", height: "h-[200px] md:h-[300px]", gradient: "url('https://images.unsplash.com/photo-1497935586351-b67a49e012bf?q=80&w=600&auto=format&fit=crop')" },
        { id: 3, category: "QUIET AFTERNOONS", height: "h-[250px] md:h-[400px]", gradient: "url('https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=600&auto=format&fit=crop')" },
        { id: 4, category: "QUIET AFTERNOONS", height: "h-[220px] md:h-[350px]", gradient: "url('https://images.unsplash.com/photo-1445116572660-236099cea460?q=80&w=600&auto=format&fit=crop')" },
        { id: 5, category: "FAM VISITS", height: "h-[300px] md:h-[450px]", gradient: "url('https://images.unsplash.com/photo-1521017430205-c25200ee6b0b?q=80&w=600&auto=format&fit=crop')" },
        { id: 6, category: "FAM VISITS", height: "h-[200px] md:h-[300px]", gradient: "url('https://images.unsplash.com/photo-1554118811-1e0d58224f24?q=80&w=600&auto=format&fit=crop')" },
        { id: 7, category: "CONVERSATIONS", height: "h-[250px] md:h-[400px]", gradient: "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=600&auto=format&fit=crop')" },
        { id: 8, category: "CONVERSATIONS", height: "h-[220px] md:h-[350px]", gradient: "url('https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?q=80&w=600&auto=format&fit=crop')" },
        { id: 9, category: "CONVERSATIONS", height: "h-[300px] md:h-[500px]", gradient: "url('https://images.unsplash.com/photo-1522851145625-7828decd27ec?q=80&w=600&auto=format&fit=crop')" },
        { id: 10, category: "FILM DISCUSSIONS", height: "h-[300px] md:h-[450px]", gradient: "url('https://images.unsplash.com/photo-1606140510507-681b4fb5abde?q=80&w=600&auto=format&fit=crop')" },
        { id: 11, category: "FILM DISCUSSIONS", height: "h-[250px] md:h-[400px]", gradient: "url('https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?q=80&w=600&auto=format&fit=crop')" },
        { id: 12, category: "FILM DISCUSSIONS", height: "h-[200px] md:h-[300px]", gradient: "url('https://images.unsplash.com/photo-1559525839-b184a4d698c7?q=80&w=600&auto=format&fit=crop')" },
    ];

    const quotes = [
        "I came for coffee. I stayed for the light.",
        "The best conversations happen when nobody's in a hurry.",
        "This place understands silence.",
        "I wrote my best chapter here. Table 7, near the window.",
        "Some mornings, this is the only place that makes sense.",
        "The saffron latte tastes like someone cares.",
        "I don't know anyone here, and that's the comfort.",
        "Three hours, two cups, one good idea. That's my ratio."
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
            className={`w-full ${img.height} rounded-2xl relative group overflow-hidden shadow-sm border border-[rgba(226,221,213,0.5)] bg-cover bg-center transition-transform duration-500 hover:scale-[1.02]`}
            style={{ backgroundImage: img.gradient }}
        >
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500"></div>
            <div className="absolute bottom-4 left-4 bg-[rgba(245,240,232,0.95)] text-[rgba(28,28,26,1)] font-dmsans text-[10px] tracking-[0.1em] py-2 px-4 rounded-full opacity-0 translate-y-2 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 font-bold uppercase shadow-sm">
                {img.category}
            </div>
        </div>
    );

    return (
        <div className="w-full relative flex items-center flex-col pb-20 pt-28 md:pt-32 bg-[rgba(245,240,232,1)]">
            
            {/* SECTION 1: Header */}
            <div className="w-full flex flex-col items-center justify-center pt-6 md:pt-10 pb-12 md:pb-16 px-6 md:px-0">
                <div className="w-full md:w-[60%] flex flex-col items-center gap-4 md:gap-6 text-center">
                    <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">The Gallery</h6>
                    
                    <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-4xl md:text-6xl italic">
                        Some moments stay.
                    </h1>

                    <p className="w-full md:w-[70%] font-dmsans text-[rgba(140,136,128,1)] text-[14px] md:text-[15px] leading-loose">
                        We don't try to manufacture moments here. They just happen. Between the slow drip of a pour-over and the fading afternoon light, here is a collection of life unfolding at its own pace.
                    </p>
                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 2: Filters */}
            <div className="w-full flex justify-center py-6 md:py-10">
                <div className="w-[90%] md:w-[70%] flex justify-center flex-wrap gap-3 md:gap-4">
                    {categories.map((cat) => (
                        <button 
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`select-none font-dmsans text-[10px] md:text-xs tracking-[0.1em] md:tracking-[0.2em] py-3 px-6 md:px-8 rounded-full border transition-colors duration-300 font-bold uppercase ${
                                filter === cat 
                                ? "bg-[rgba(28,28,26,1)] text-white border-[rgba(28,28,26,1)] shadow-md" 
                                : "bg-[rgba(245,240,232,0.5)] text-[rgba(100,96,88,1)] border-[rgba(226,221,213,0.8)] hover:border-[rgba(28,28,26,0.5)]"
                            }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            {/* SECTION 3: Masonry Gallery Grid */}
            {/* Mobile: 2 columns */}
            <div className="w-[90%] md:hidden flex items-start justify-center gap-4 mb-20 mt-4">
                <div className="flex flex-col gap-4 w-1/2">
                    {mobileCol1.map(renderImageCard)}
                </div>
                <div className="flex flex-col gap-4 w-1/2">
                    {mobileCol2.map(renderImageCard)}
                </div>
            </div>

            {/* Desktop: 3 columns */}
            <div className="hidden md:flex w-[85%] lg:w-[75%] items-start justify-center gap-6 mb-32 mt-4">
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

            <CoffeeDivider />

            {/* SECTION 4: Quotes Cards */}
            <div className="w-full flex flex-col items-center justify-center py-16 md:py-24 px-6 md:px-0">
                <div className="w-full md:w-[85%] lg:w-[80%] flex flex-col items-center gap-12 md:gap-16">
                    <div className="flex flex-col items-center gap-3 text-center">
                        <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase">Overheard</h6>
                        <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl md:text-5xl italic mb-4">
                            Thoughts That Stayed Here
                        </h1>
                    </div>

                    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                        {quotes.map((quote, index) => (
                            <div key={index} className="p-8 md:p-10 rounded-2xl border border-[rgba(226,221,213,0.8)] bg-[rgba(250,247,242,0.8)] flex flex-col justify-start items-center text-center shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1">
                                <span className="text-[rgba(200,169,110,0.5)] font-['Cormorant_Garamond'] text-5xl leading-none mb-2">"</span>
                                <p className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,0.9)] text-lg md:text-[22px] italic leading-relaxed">
                                    {quote}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Moments;