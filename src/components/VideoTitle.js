const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" px-10 pt-5 mb-20 pb-5 absolute bottom-10 left-5 max-w-xl w-full z-50 text-white bg-gradient-to-r from-black">
      <h1 className="font-semibold text-4xl">{title}</h1>
      <p className="pt-4 w-1/2">{overview}</p>
      <div className="pt-3">
        <button className="bg-white text-black font-semibold p-3 px-8 text-lg rounded-md bg-opacity-50">
          ▷ Play
        </button>
        <button className="bg-gray-400 text-white p-3 px-8 text-lg rounded-md mx-2 bg-opacity-50">
          ⓘ More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
