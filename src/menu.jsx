import React, { useState } from "react";
import CoffeeDivider from "./components/cooffeedivider";

// Coffee images
import menuCoffeeDefault from "./assets/menu/menu-coffee-default.jpeg";
import menuCoffeeHouseEspresso from "./assets/home/menu-coffee-house-espresso.jpeg";
import menuCoffeeSaffronLatte from "./assets/menu/menu-coffee-saffron-latte.jpeg";
import menuCoffeePourOver from "./assets/menu/menu-coffee-pour-over.jpeg";
import menuCoffeeColdBrew from "./assets/menu/menu-coffee-cold-brew.jpeg";
import menuCoffeeCortado from "./assets/menu/menu-coffee-cortado.jpeg";
// Tea images
import menuTeaOldCityChai from "./assets/menu/menu-tea-old-city-chai.jpeg";
import menuTeaLemongrassMint from "./assets/menu/menu-tea-lemongrass-mint.jpeg";
import menuTeaHibiscusIcedTea from "./assets/menu/menu-tea-hibiscus-iced-tea.jpeg";
import menuTeaHotChocolate from "./assets/menu/menu-tea-hot-chocolate.jpeg";
// Food images
import menuFoodMawaCroissant from "./assets/menu/menu-food-mawa-croissant.jpeg";
import menuFoodPistachioRoseCake from "./assets/menu/menu-food-pistachio-rose-cake.jpeg";
import menuFoodSourdoughToast from "./assets/menu/menu-food-sourdough-toast.jpeg";
import menuFoodSpicedHandPie from "./assets/menu/menu-food-spiced-hand-pie.jpeg";
import menuFoodAlmondBiscottiFallback from "./assets/menu/menu-food-almond-biscotti-fallback.jpeg";

const Menu = () => {
    const [hoveredCoffee, setHoveredCoffee] = useState(null);
    const [hoveredTea, setHoveredTea] = useState(null);
    const [hoveredFood, setHoveredFood] = useState(null);

    const defaultCoffeeImg = `url('${menuCoffeeDefault}')`;
    const defaultTeaImg = `url('${menuTeaOldCityChai}')`;
    const defaultFoodImg = `url('${menuFoodMawaCroissant}')`;

    const coffeeImages = {
        "House Espresso": `url('${menuCoffeeHouseEspresso}')`,
        "Saffron Latte": `url('${menuCoffeeSaffronLatte}')`,
        "Pour Over": `url('${menuCoffeePourOver}')`,
        "Cold Brew": `url('${menuCoffeeColdBrew}')`,
        "Cortado": `url('${menuCoffeeCortado}')`,
    };
    const teaImages = {
        "Old City Chai": `url('${menuTeaOldCityChai}')`,
        "Lemongrass Mint Green": `url('${menuTeaLemongrassMint}')`,
        "Hibiscus Iced Tea": `url('${menuTeaHibiscusIcedTea}')`,
        "Classic Hot Chocolate": `url('${menuTeaHotChocolate}')`,
    };
    const foodImages = {
        "Mawa Croissant": `url('${menuFoodMawaCroissant}')`,
        "Pistachio Rose Cake": `url('${menuFoodPistachioRoseCake}')`,
        "Sourdough Toast": `url('${menuFoodSourdoughToast}')`,
        "Spiced Hand Pie": `url('${menuFoodSpicedHandPie}')`,
        "Almond Biscotti": `url('${menuFoodAlmondBiscottiFallback}')`,
    };

    const bindPreviewHandlers = (setHoveredItem, itemName) => ({
        onMouseEnter: () => setHoveredItem(itemName),
        onFocus: () => setHoveredItem(itemName),
        onClick: () => setHoveredItem(itemName),
        onTouchStart: () => setHoveredItem(itemName),
        onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setHoveredItem(itemName);
            }
        },
    });

    return (
        <div className="w-full relative flex items-center flex-col pb-20 pt-28 md:pt-32 bg-[rgba(245,240,232,1)]">
            
            {/* SECTION 1: Intro / Quote */}
            <div className="w-full flex flex-col items-center justify-center pt-6 md:pt-10 pb-12 md:pb-16 px-6 md:px-0">
                <div className="w-full md:w-[80%] flex flex-col items-center gap-6 md:gap-10">
                    <h6 className="font-dmsans tracking-[0.2em] text-[rgba(140,136,128,1)] text-xs uppercase text-center">Menu</h6>
                    
                    <div className="w-full md:w-[80%] text-center mt-3 md:mt-5 mb-6 md:mb-10">
                        <p className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,0.8)] text-3xl md:text-5xl italic leading-relaxed">
                            "A good cup of coffee is a conversation <br className="hidden md:block" /> waiting to happen."
                        </p>
                    </div>

                    <p className="w-full md:w-[60%] text-center font-dmsans text-[rgba(140,136,128,1)] text-[13px] md:text-[15px] leading-loose">
                        We source our beans from independent estates in Chikmagalur and roast them locally. Our food is an ode to Gujarati ingredients, treated with modern restraint. Everything is made from scratch, with intention.
                    </p>
                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 2: Coffee & Espresso */}
            <div className="w-full flex flex-col items-center justify-center py-12 md:py-16 px-6 md:px-0">
                <div className="w-full md:w-[80%] flex flex-col md:flex-row items-start gap-8 md:gap-16">
                    {/* Image Side */}
                    <div className="w-full md:w-2/5 flex flex-col gap-4 md:sticky md:top-32 transition-all duration-500">
                        <div 
                            className="w-full h-[250px] md:h-[500px] rounded-2xl shadow-sm bg-cover bg-center transition-all duration-500" 
                            style={{ backgroundImage: hoveredCoffee ? coffeeImages[hoveredCoffee] : defaultCoffeeImg }}
                        ></div>
                        <span className="font-dmsans text-[rgba(140,136,128,1)] italic text-[13px] transition-all duration-300">
                            {hoveredCoffee ? `Viewing: ${hoveredCoffee}` : "Our signature slow-pour process"}
                        </span>
                    </div>

                    {/* Menu Side */}
                    <div className="w-full md:w-3/5 flex flex-col gap-8 md:gap-10" onMouseLeave={() => setHoveredCoffee(null)}>
                        <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl md:text-5xl italic mb-4 md:mb-6">Coffee & Espresso</h1>
                        
                        <div className="flex flex-col gap-8 md:gap-12">
                            {[
                                { name: "House Espresso", desc: "Notes of dark chocolate and toasted almond", price: "₹220" },
                                { name: "Saffron Latte", desc: "Our signature. House espresso, steamed milk, Kashmiri saffron infusion", price: "₹320" },
                                { name: "Pour Over", desc: "Rotating single-origin beans. Ask us what's brewing today", price: "₹280" },
                                { name: "Cold Brew", desc: "Steeped for 18 hours. Smooth, bold, refreshing", price: "₹250" },
                                { name: "Cortado", desc: "Equal parts espresso and warm microfoam", price: "₹240" }
                            ].map((item) => (
                                <div 
                                    key={item.name}
                                    className="flex justify-between items-end border-b border-[rgba(226,221,213,0.8)] pb-4 select-none cursor-pointer hover:border-[#C4A882] transition-colors duration-300 group"
                                    role="button"
                                    tabIndex={0}
                                    {...bindPreviewHandlers(setHoveredCoffee, item.name)}
                                >
                                    <div className="flex flex-col gap-1 md:gap-2 w-[75%] md:w-[80%]">
                                        <h3 className="font-dmsans text-[rgba(28,28,26,1)] group-hover:text-[#8C6D46] transition-colors duration-300 text-base md:text-lg tracking-wide uppercase">{item.name}</h3>
                                        <p className="font-['Cormorant_Garamond'] text-[rgba(140,136,128,1)] text-base md:text-lg italic">{item.desc}</p>
                                    </div>
                                    <span className="font-dmsans text-[rgba(28,28,26,1)] group-hover:text-[#8C6D46] transition-colors duration-300 text-base md:text-lg">{item.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 3: Teas & Others */}
            <div className="w-full flex flex-col items-center justify-center py-12 md:py-16 px-6 md:px-0">
                <div className="w-full md:w-[80%] flex flex-col-reverse md:flex-row-reverse items-start gap-8 md:gap-16">
                    {/* Image Side */}
                    <div className="w-full md:w-2/5 flex flex-col gap-4 md:sticky md:top-32 transition-all duration-500">
                        <div 
                            className="w-full h-[200px] md:h-[400px] rounded-2xl shadow-sm bg-cover bg-center transition-all duration-500" 
                            style={{ backgroundImage: hoveredTea ? teaImages[hoveredTea] : defaultTeaImg }}
                        ></div>
                        <span className="font-dmsans text-[rgba(140,136,128,1)] italic text-[13px] md:text-right transition-all duration-300">
                             {hoveredTea ? `Viewing: ${hoveredTea}` : "Brewed to perfection"}
                        </span>
                    </div>

                    {/* Menu Side */}
                    <div className="w-full md:w-3/5 flex flex-col gap-8 md:gap-10" onMouseLeave={() => setHoveredTea(null)}>
                        <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl md:text-5xl italic mb-4 md:mb-6">Teas & Infusions</h1>
                        
                        <div className="flex flex-col gap-8 md:gap-12">
                            {[
                                { name: "Old City Chai", desc: "Strong, spiced, authentic. Boiled to perfection", price: "₹150" },
                                { name: "Lemongrass Mint Green", desc: "Light, soothing, grown organically", price: "₹180" },
                                { name: "Hibiscus Iced Tea", desc: "Tart, Ruby red, mildly sweetened with agave", price: "₹220" },
                                { name: "Classic Hot Chocolate", desc: "Rich 70% dark cocoa, velvety smooth", price: "₹260" }
                            ].map((item) => (
                                <div 
                                    key={item.name}
                                    className="flex justify-between items-end border-b border-[rgba(226,221,213,0.8)] pb-4 select-none cursor-pointer hover:border-[#C4A882] transition-colors duration-300 group"
                                    role="button"
                                    tabIndex={0}
                                    {...bindPreviewHandlers(setHoveredTea, item.name)}
                                >
                                    <div className="flex flex-col gap-1 md:gap-2 w-[75%] md:w-[80%]">
                                        <h3 className="font-dmsans text-[rgba(28,28,26,1)] group-hover:text-[#8C6D46] transition-colors duration-300 text-base md:text-lg tracking-wide uppercase">{item.name}</h3>
                                        <p className="font-['Cormorant_Garamond'] text-[rgba(140,136,128,1)] text-base md:text-lg italic">{item.desc}</p>
                                    </div>
                                    <span className="font-dmsans text-[rgba(28,28,26,1)] group-hover:text-[#8C6D46] transition-colors duration-300 text-base md:text-lg">{item.price}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <CoffeeDivider />

            {/* SECTION 4: Food & Bakes */}
            <div className="w-full flex flex-col items-center justify-center py-12 md:py-16 px-6 md:px-0">
                <div className="w-full md:w-[80%] flex flex-col md:flex-row items-start gap-8 md:gap-16">
                     {/* Image Side */}
                     <div className="w-full md:w-2/5 flex flex-col gap-4 md:sticky md:top-32 transition-all duration-500">
                        <div 
                            className="w-full h-[250px] md:h-[500px] rounded-2xl shadow-sm bg-cover bg-center transition-all duration-500" 
                            style={{ backgroundImage: hoveredFood ? foodImages[hoveredFood] : defaultFoodImg }}
                        ></div>
                        <span className="font-dmsans text-[rgba(140,136,128,1)] italic text-[13px] transition-all duration-300">
                            {hoveredFood ? `Viewing: ${hoveredFood}` : "Fresh from the oven every morning"}
                        </span>
                    </div>

                    {/* Menu Side */}
                    <div className="w-full md:w-3/5 flex flex-col gap-8 md:gap-10" onMouseLeave={() => setHoveredFood(null)}>
                        <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl md:text-5xl italic mb-4 md:mb-6">From The Oven</h1>
                        
                        <div className="flex flex-col gap-8 md:gap-12">
                             {[
                                { name: "Mawa Croissant", desc: "Flaky, buttery, filled with sweet caramelized mawa", price: "₹280" },
                                { name: "Pistachio Rose Cake", desc: "Delicate sponge, rose water buttercream, crushed nuts", price: "₹300" },
                                { name: "Sourdough Toast", desc: "Whipped feta, local figs, wild honey drizzle", price: "₹350" },
                                { name: "Spiced Hand Pie", desc: "Savory pastry filled with smoked aubergine and cumin", price: "₹250" },
                                { name: "Almond Biscotti", desc: "Twice-baked, perfectly crunchy. Ideal with your espresso", price: "₹120" }
                            ].map((item) => (
                                <div 
                                    key={item.name}
                                    className="flex flex-col border-b border-[rgba(226,221,213,0.8)] pb-4 gap-1 md:gap-2 select-none cursor-pointer hover:border-[#C4A882] transition-colors duration-300 group"
                                    role="button"
                                    tabIndex={0}
                                    {...bindPreviewHandlers(setHoveredFood, item.name)}
                                >
                                    <div className="flex justify-between items-end">
                                        <h3 className="font-dmsans text-[rgba(28,28,26,1)] group-hover:text-[#8C6D46] transition-colors duration-300 text-base md:text-lg tracking-wide uppercase">{item.name}</h3>
                                        <span className="font-dmsans text-[rgba(28,28,26,1)] group-hover:text-[#8C6D46] transition-colors duration-300 text-base md:text-lg">{item.price}</span>
                                    </div>
                                    <p className="font-['Cormorant_Garamond'] text-[rgba(140,136,128,1)] text-base md:text-lg italic">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <CoffeeDivider />

             {/* SECTION 5: Footer Quote */}
            <div className="w-full flex flex-col items-center justify-center py-16 md:py-20 pb-10 px-6 md:px-0">
                <div className="w-full md:w-[60%] text-center border-t border-[rgba(226,221,213,0.8)] pt-12 md:pt-16">
                     <p className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,0.8)] text-2xl md:text-4xl italic leading-relaxed">
                        "There is always time for a <br /> second cup."
                     </p>
                </div>
            </div>

        </div>
    );
};

export default Menu;
