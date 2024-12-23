import React from "react";
import GptSearchBar from "./GptSearchBar";
import GptMovieSuggestions from "./GptMovieSuggestions";
import { BACKGROUND_IMG } from "../utils/constants";

const GptSearchPage = () => {
  return (
    <div className="h-[100vh] ">
      <img
        className="-mt-[120px] fixed -z-20 overflow-x-hidden"
        src={BACKGROUND_IMG}
        alt="bg-img"
      />
      <GptSearchBar />
      <GptMovieSuggestions />
    </div>
  );
};

export default GptSearchPage;
