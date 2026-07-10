import React, { useEffect, useMemo, useState } from "react";
import CoffeeDivider from "./components/cooffeedivider";
import { toPublicMenuSections } from "./features/admin/cms";
import { fetchPublishedMenu } from "./services/publicCms";

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

const imagePosition = (media = {}) =>
    `${Number.isFinite(media.image_position_x) ? media.image_position_x : 50}% ${Number.isFinite(media.image_position_y) ? media.image_position_y : 50}%`;

const Menu = () => {
    const [hoveredBySection, setHoveredBySection] = useState({});

    const defaultCoffeeImg = `url('${menuCoffeeDefault}')`;
    const defaultTeaImg = `url('${menuTeaOldCityChai}')`;
    const defaultFoodImg = `url('${menuFoodMawaCroissant}')`;

    const coffeeImages = useMemo(() => ({
        "House Espresso": `url('${menuCoffeeHouseEspresso}')`,
        "Saffron Latte": `url('${menuCoffeeSaffronLatte}')`,
        "Pour Over": `url('${menuCoffeePourOver}')`,
        "Cold Brew": `url('${menuCoffeeColdBrew}')`,
        "Cortado": `url('${menuCoffeeCortado}')`,
    }), []);
    const teaImages = useMemo(() => ({
        "Old City Chai": `url('${menuTeaOldCityChai}')`,
        "Lemongrass Mint Green": `url('${menuTeaLemongrassMint}')`,
        "Hibiscus Iced Tea": `url('${menuTeaHibiscusIcedTea}')`,
        "Classic Hot Chocolate": `url('${menuTeaHotChocolate}')`,
    }), []);
    const foodImages = useMemo(() => ({
        "Mawa Croissant": `url('${menuFoodMawaCroissant}')`,
        "Pistachio Rose Cake": `url('${menuFoodPistachioRoseCake}')`,
        "Sourdough Toast": `url('${menuFoodSourdoughToast}')`,
        "Spiced Hand Pie": `url('${menuFoodSpicedHandPie}')`,
        "Almond Biscotti": `url('${menuFoodAlmondBiscottiFallback}')`,
    }), []);

    const fallbackMenuSections = useMemo(() => [
        {
            key: "coffee",
            title: "Coffee & Espresso",
            defaultImg: defaultCoffeeImg,
            imageMap: coffeeImages,
            caption: "Our signature slow-pour process",
            items: [
                { name: "House Espresso", description: "Notes of dark chocolate and toasted almond", price_inr: 220 },
                { name: "Saffron Latte", description: "Our signature. House espresso, steamed milk, Kashmiri saffron infusion", price_inr: 320 },
                { name: "Pour Over", description: "Rotating single-origin beans. Ask us what's brewing today", price_inr: 280 },
                { name: "Cold Brew", description: "Steeped for 18 hours. Smooth, bold, refreshing", price_inr: 250 },
                { name: "Cortado", description: "Equal parts espresso and warm microfoam", price_inr: 240 }
            ],
        },
        {
            key: "tea",
            title: "Teas & Infusions",
            defaultImg: defaultTeaImg,
            imageMap: teaImages,
            caption: "Brewed to perfection",
            reverse: true,
            items: [
                { name: "Old City Chai", description: "Strong, spiced, authentic. Boiled to perfection", price_inr: 150 },
                { name: "Lemongrass Mint Green", description: "Light, soothing, grown organically", price_inr: 180 },
                { name: "Hibiscus Iced Tea", description: "Tart, Ruby red, mildly sweetened with agave", price_inr: 220 },
                { name: "Classic Hot Chocolate", description: "Rich 70% dark cocoa, velvety smooth", price_inr: 260 }
            ],
        },
        {
            key: "food",
            title: "From The Oven",
            defaultImg: defaultFoodImg,
            imageMap: foodImages,
            caption: "Fresh from the oven every morning",
            items: [
                { name: "Mawa Croissant", description: "Flaky, buttery, filled with sweet caramelized mawa", price_inr: 280 },
                { name: "Pistachio Rose Cake", description: "Delicate sponge, rose water buttercream, crushed nuts", price_inr: 300 },
                { name: "Sourdough Toast", description: "Whipped feta, local figs, wild honey drizzle", price_inr: 350 },
                { name: "Spiced Hand Pie", description: "Savory pastry filled with smoked aubergine and cumin", price_inr: 250 },
                { name: "Almond Biscotti", description: "Twice-baked, perfectly crunchy. Ideal with your espresso", price_inr: 120 }
            ],
        },
    ], [coffeeImages, defaultCoffeeImg, defaultFoodImg, defaultTeaImg, foodImages, teaImages]);
    const [menuSections, setMenuSections] = useState(fallbackMenuSections);

    useEffect(() => {
        fetchPublishedMenu(fallbackMenuSections).then((sections) => {
            setMenuSections(toPublicMenuSections(sections, fallbackMenuSections));
        });
    }, [fallbackMenuSections]);

    const setHoveredForSection = (sectionKey, itemName) => {
        setHoveredBySection((current) => ({
            ...current,
            [sectionKey]: itemName,
        }));
    };

    const bindPreviewHandlers = (sectionKey, itemName) => ({
        onMouseEnter: () => setHoveredForSection(sectionKey, itemName),
        onFocus: () => setHoveredForSection(sectionKey, itemName),
        onClick: () => setHoveredForSection(sectionKey, itemName),
        onTouchStart: () => setHoveredForSection(sectionKey, itemName),
        onKeyDown: (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                setHoveredForSection(sectionKey, itemName);
            }
        },
    });

    return (
        <div className="w-full min-w-0 relative flex items-center flex-col pb-20 pt-28 md:pt-32 bg-[rgba(245,240,232,1)]">
            
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

            {menuSections.map((section, index) => {
                const hoveredItemName = hoveredBySection[section.key];
                const hoveredItem = section.items.find((item) => item.name === hoveredItemName);
                const hoveredImage = hoveredItemName
                    ? section.imageMap[hoveredItemName] || (hoveredItem?.image_url ? `url('${hoveredItem.image_url}')` : section.defaultImg)
                    : section.defaultImg;
                const previewPosition = hoveredItem?.image_url ? imagePosition(hoveredItem) : imagePosition(section);
                const showCategoryVideo = !hoveredItemName && Boolean(section.video_url);
                const isStackedItem = section.key === "food" || section.layout === "stacked";

                return (
            <React.Fragment key={section.id || section.key}>
            <div className="w-full flex flex-col items-center justify-center py-12 md:py-16 px-6 md:px-0">
                <div className={`w-full md:w-[86%] lg:w-[80%] flex flex-col ${section.reverse ? "lg:flex-row-reverse" : "lg:flex-row"} items-start gap-8 md:gap-12 lg:gap-16`}>
                    {/* Image Side */}
                    <div className="w-full lg:w-2/5 flex flex-col gap-4 lg:sticky lg:top-32 transition-all duration-500">
                        {showCategoryVideo ? (
                            <video
                                className="h-[260px] w-full rounded-2xl object-cover shadow-sm sm:h-[360px] lg:h-[500px]"
                                src={section.video_url}
                                poster={section.image_url || undefined}
                                style={{ objectPosition: imagePosition(section) }}
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        ) : (
                            <div
                                className="w-full h-[260px] sm:h-[360px] lg:h-[500px] rounded-2xl shadow-sm bg-cover bg-center transition-all duration-500"
                                style={{ backgroundImage: hoveredImage, backgroundPosition: previewPosition }}
                            ></div>
                        )}
                        <span className={`font-dmsans text-[rgba(140,136,128,1)] italic text-[13px] transition-all duration-300 ${section.reverse ? "md:text-right" : ""}`}>
                            {hoveredItemName ? `Viewing: ${hoveredItemName}` : section.caption}
                        </span>
                    </div>

                    {/* Menu Side */}
                    <div className="w-full lg:w-3/5 flex flex-col gap-8 md:gap-10" onMouseLeave={() => setHoveredForSection(section.key, null)}>
                        <h1 className="font-['Cormorant_Garamond'] text-[rgba(28,28,26,1)] text-3xl md:text-5xl italic mb-4 md:mb-6">{section.title}</h1>
                        
                        <div className="flex flex-col gap-8 md:gap-12">
                            {section.items.map((item) => (
                                <div 
                                    key={item.name}
                                    className={`${isStackedItem ? "flex flex-col gap-1 md:gap-2" : "flex justify-between items-end gap-4"} min-w-0 border-b border-[rgba(226,221,213,0.8)] pb-4 select-none cursor-pointer hover:border-[#C4A882] transition-colors duration-300 group`}
                                    role="button"
                                    tabIndex={0}
                                    {...bindPreviewHandlers(section.key, item.name)}
                                >
                                    {isStackedItem ? (
                                    <>
                                    <div className="flex justify-between items-end gap-4">
                                        <h3 className="min-w-0 font-dmsans text-[rgba(28,28,26,1)] group-hover:text-[#8C6D46] transition-colors duration-300 text-base md:text-lg tracking-wide uppercase">{item.name}</h3>
                                        <span className="shrink-0 font-dmsans text-[rgba(28,28,26,1)] group-hover:text-[#8C6D46] transition-colors duration-300 text-base md:text-lg">₹{item.price_inr}</span>
                                    </div>
                                    <p className="font-['Cormorant_Garamond'] text-[rgba(140,136,128,1)] text-base md:text-lg italic">{item.description || item.desc}</p>
                                    </>
                                    ) : (
                                    <>
                                    <div className="flex min-w-0 flex-col gap-1 md:gap-2 w-[75%] md:w-[80%]">
                                        <h3 className="font-dmsans text-[rgba(28,28,26,1)] group-hover:text-[#8C6D46] transition-colors duration-300 text-base md:text-lg tracking-wide uppercase">{item.name}</h3>
                                        <p className="font-['Cormorant_Garamond'] text-[rgba(140,136,128,1)] text-base md:text-lg italic">{item.description || item.desc}</p>
                                    </div>
                                    <span className="shrink-0 font-dmsans text-[rgba(28,28,26,1)] group-hover:text-[#8C6D46] transition-colors duration-300 text-base md:text-lg">₹{item.price_inr}</span>
                                    </>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {index < menuSections.length - 1 && <CoffeeDivider />}
            </React.Fragment>
                );
            })}
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
