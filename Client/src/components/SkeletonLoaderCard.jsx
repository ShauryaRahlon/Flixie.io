import React from "react";

export default function SkeletonLoaderCard() {
    return (
        <div className="flex flex-col items-center cursor-pointer w-fit">
            <div className="border border-white/30 rounded-xl backdrop-filter backdrop-blur-3xl  shadow-xl text-white transition-all duration-300 hover:bg-white/50 hover:scale-105 hover:text-black items-center">
                {/* Skeleton for image */}
                <div className="w-40 h-52 sm:w-44 sm:h-64 md:w-36 md:h-48 rounded-xl bg-gray-300 animate-pulse"></div>
                
                {/* Skeleton for title */}
                <div className="md:hidden flex  m-1 h-4 sm:h-5 md:h-6 w-3/4 bg-gray-300 animate-pulse rounded"></div>
            </div>
        </div>
    );
}
