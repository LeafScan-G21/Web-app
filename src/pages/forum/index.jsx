import React from "react";
import hero from "../../assets/forum/hero-plants.jpg";
const Forum = () => {
  return (
    <>
      <div className="relative h-64 md:h-80 rounded-xl overflow-x-auto mb-8">
        <img
          src={hero}
          alt="Plant care community"
          className="w-full h-full object-cover overflow-hidden rounded-xl"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="text-center text-white">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <h1 className="text-4xl md:text-5xl font-bold">
                LeafScan Community Forum
              </h1>
            </div>
            <p className="text-xl md:text-2xl opacity-90">
              Helping plants thrive together
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Forum;
