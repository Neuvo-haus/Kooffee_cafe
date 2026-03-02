import { FaMugHot } from "react-icons/fa";

const CoffeeDivider = () => {
  return (
    <div className="w-full flex items-center justify-center py-8">
      <div className="flex items-center w-[90%] gap-6">

        {/* Left Line */}
        <div className="flex-1 flex items-center gap-4">
          <div className="h-px bg-[#C4A882] flex-1" />
          <svg
            width="40"
            height="8"
            viewBox="0 0 40 8"
            fill="none"
          >
            <path
              d="M0 4 Q5 0 10 4 T20 4 T30 4 T40 4"
              stroke="#C4A882"
              strokeWidth="1"
              fill="transparent"
            />
          </svg>
        </div>

        {/* Center Icon */}
        <div className="text-[#8C8880] text-2xl">
          <FaMugHot />
        </div>

        {/* Right Line */}
        <div className="flex-1 flex items-center gap-4">
          <svg
            width="40"
            height="8"
            viewBox="0 0 40 8"
            fill="none"
          >
            <path
              d="M0 4 Q5 0 10 4 T20 4 T30 4 T40 4"
              stroke="#C4A882"
              strokeWidth="1"
              fill="transparent"
            />
          </svg>
          <div className="h-px bg-[#C4A882] flex-1" />
        </div>

      </div>
    </div>
  );
};

export default CoffeeDivider;