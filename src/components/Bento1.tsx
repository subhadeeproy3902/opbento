/* eslint-disable @next/next/no-img-element */
import React from "react";

import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import Image from "next/image";

const space = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "300", "600", "700", "500"],
});

const BentoGrid = ({
  name,
  githubURL,
  twitterURL,
  linkedinURL,
  imageUrl,
}: {
  name: string;
  githubURL: string;
  twitterURL: string;
  linkedinURL?: string;
  imageUrl: string;
}) => {
  return (
    <div
      className={cn(
        "p-4 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl my-32 w-full mx-auto",
        space.className
      )}
    >
      <div className="bg-muted py-6 px-8 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 to col-span-1 row-span-1 min-h-32">
        <p className="text-white text-xl">Hey Im</p>
        <h2 className="text-4xl text-white font-bold mb-2 capitalize">
          {name || "Nigga"}
        </h2>
      </div>

      <div className="bg-muted h-80 overflow-hidden rounded-lg col-span-2 row-span-2 flex items-center justify-center">
        <img
          src={
            imageUrl ||
            "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={name}
          width={500}
          height={500}
          className="size-full object-cover"
        />
      </div>

      <div className="bg-muted p-4 rounded-lg col-span-1 row-span-2">
        <div className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg"></div>
      </div>

      <div className="bg-muted relative overflow-hidden rounded-lg col-span-1 row-span-2">
        <img
          src="https://i.pinimg.com/736x/cf/95/4b/cf954b8923fbafc5cfc0c66344b6a6f9.jpg"
          alt=""
          className="absolute saturate-150 size-full object-cover inset-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b to-black/80 from-transparent"></div>
        <p className="z-20 absolute bottom-6 text-center w-full">
          <a
            href={"https://github.com/" + githubURL}
            className="text-white font-semibold hover:underline p-2 px-4 bg-pink-600 opacity-80 rounded-md backdrop-blur"
          >
            @{githubURL}
          </a>
        </p>
      </div>

      <div className="bg-muted p-4 rounded-lg col-span-2 row-span-1">
        <p className="text-cyan-500 text-xs mb-2">Los Angeles</p>
        <p className="text-white text-xs">The Midnight</p>
        <div className="flex justify-between mt-2">
          <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
          <div className="w-6 h-6 bg-gray-700 rounded-full"></div>
        </div>
      </div>

      <div className="bg-muted p-4 rounded-lg col-span-1 row-span-1 flex flex-col items-center justify-center">
        <h2 className="text-yellow-500 text-3xl font-bold">25k+</h2>
        <p className="text-white text-sm">Box</p>
        <button className="mt-2 bg-cyan-500 text-white px-4 py-1 rounded-full text-xs">
          Join Bento Now
        </button>
      </div>
    </div>
  );
};

export default BentoGrid;
