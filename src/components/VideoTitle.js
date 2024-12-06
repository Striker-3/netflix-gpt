const VideoTitle = ({ title, overview }) => {
  return (
    <div className="px-10 pt-10">
      <h1 className="font-semibold text-4xl">{title}</h1>
      <p className="pt-4 w-1/4">{overview}</p>
      <div className="pt-3">
        <button className="bg-gray-400 text-black p-3 px-8 text-lg rounded-md bg-opacity-50">
          ▷ Play
        </button>
        <button className="bg-gray-400 text-black p-3 px-8 text-lg rounded-md mx-2 bg-opacity-50">
          ⓘ More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
