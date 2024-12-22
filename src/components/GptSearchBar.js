import React, { useRef } from "react";
import lang from "../utils/languageConstants";
import { useDispatch, useSelector } from "react-redux";
import client from "../utils/mistral_ai";
import { MOVIE_API_OPTIONS } from "../utils/constants";
import { addGptMoviesAndResults } from "../utils/gptSlice";

const GptSearchBar = () => {
  const language = useSelector((store) => store.lang.lang);
  const prompt = useRef();
  const dispatch = useDispatch();
  const movieSearchTmdb = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
      MOVIE_API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleGptSearch = async () => {
    const chatCompletion = await client.chat.completions.create({
      model: "Qwen/Qwen2.5-Coder-32B-Instruct",
      messages: [
        {
          role: "user",
          content:
            " Give me only the names of the movies without any description and  " +
            " If the movies have sequels, list the sequels  and movies in comma separated values, not in brackets." +
            " Here is my query: " +
            prompt.current.value +
            "only give the number of movies as mentioned, if not mentioned then give only 7 and it should be in comma separated value" +
            "Just list the names in csv format and don't add any other text in the response",
        },
      ],
      max_tokens: 500,
    });

    // console.log(chatCompletion.choices[0].message);
    const LLM_MOVIES = chatCompletion?.choices[0]?.message?.content.split(",");
    console.log(LLM_MOVIES);

    const MoviesPromiseArray = LLM_MOVIES.map((movie) =>
      movieSearchTmdb(movie)
    );

    const tmdbResults = await Promise.all(MoviesPromiseArray);
    console.log(tmdbResults);
    dispatch(
      addGptMoviesAndResults({ gptMovies: LLM_MOVIES, gptResults: tmdbResults })
    );
  };
  return (
    <div className="pt-[6%] flex justify-center">
      <form
        className="bg-black w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          type="text"
          ref={prompt}
          className="p-4 m-4 col-span-9"
          placeholder={lang[language].searchPlaceholder}
        />
        <button
          className="bg-red-600 text-white rounded-lg m-4 p-2 px-6 col-span-3"
          onClick={handleGptSearch}
        >
          {lang[language].search}
        </button>
      </form>
    </div>
  );
};

export default GptSearchBar;
