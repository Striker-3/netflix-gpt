import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BACKGROUND_IMG } from "../utils/constants";

const GptSearchPage = () => {
  return (
    <div className="h-screen md:h-[100vh]">
      <img
        className="fixed -z-20 overflow-x-hidden w-full h-full object-cover  -mt-[120px]"
        src={BACKGROUND_IMG}
        alt="bg-img"
      />
      <div className="relative z-10">
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </div>
  );
};

export default GptSearchPage;
