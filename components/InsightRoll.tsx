import React from "react";

const InsightRoll = ({ insights }: { insights: string[] }) => {
  return (
    <div className="my-3 w-full bg-[#d2b041] text-white whitespace-nowrap overflow-hidden">
      <div className="w-full py-2 flex items-center justify-center capitalize font-light tracking-wider text-sm animation-roll">
        {insights.map((txt: string, idx: number) => (
          <div key={idx}>
            {txt} <span className="px-4">|</span>{" "}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InsightRoll;