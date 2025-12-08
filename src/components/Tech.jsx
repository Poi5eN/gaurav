import React from "react";

import { BallCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { technologies } from "../constants";

const Tech = () => {
  return (
    <>
      <div className="flex flex-col items-center justify-center mb-10">
        <h2
          className={`text-white font-black md:text-[60px] sm:text-[50px] xs:text-[40px] text-[30px] text-center text-liquid`}
        >
          Technologies.
        </h2>
      </div>
      <div className="flex flex-row flex-wrap justify-center gap-10">
        {technologies.map((technology) => (
          <div
            className="w-28 h-28 hover:scale-110 transition-transform duration-300"
            key={technology.name}
          >
            <BallCanvas icon={technology.icon} />
          </div>
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(Tech, "");
