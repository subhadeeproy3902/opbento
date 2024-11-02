import { Linkedin, Globe, Save } from "lucide-react";
import Block from "./ui/Block";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useState } from "react";
import { toast } from "sonner";

export default function BioBlock({
  setLinkedinURL,
  setPortfolioURL,
}: {
  setLinkedinURL: (url: string) => void;
  setPortfolioURL: (url: string) => void;
}) {
  const [lUrl, setLUrl] = useState("");
  const [pUrl, setPUrl] = useState("");
  return (
    <>
      <Block className="bg-gradient-to-br col-span-12 sm:col-span-6 md:col-span-4 from-blue-500 to-purple-600 h-[230px]">
        <div className="grid h-full place-content-center text-3xl text-white">
          <Linkedin size={18} className="w-6 h-6 absolute top-2 left-2" />
          <h1 className="text-2xl font-bold mx-auto mb-2 text-blue-200">
            LinkedIn Username
          </h1>
          <div className="relative mt-2">
            <Input
              className="w-full focus-visible:ring-purple-700 placeholder:text-gray-200 bg-transparent pr-10 text-white border-yellow-200/50 ring-offset-indigo-500"
              placeholder="Enter your username"
              type="url"
              value={lUrl}
              onChange={(e) => setLUrl(e.target.value)}
            />
            <Button
              className="absolute top-0 right-0 p-2 px-2.5 bg-purple-500 hover:bg-purple-600"
              onClick={() => {
                setLinkedinURL(lUrl);
                toast.success("LinkedIn URL saved");
              }}
            >
              <Save className="text-white" size={20} />
            </Button>
          </div>
        </div>
      </Block>

      <Block className="bg-gradient-to-br col-span-12 sm:col-span-6 md:col-span-4 from-gray-50 to-gray-600 h-[230px]">
        <div className="grid h-full place-content-center text-3xl text-white py-4">
          <Globe
            size={18}
            className="w-5 h-5 absolute top-2 left-2 text-gray-500"
          />
          <h1 className="text-2xl font-bold mx-auto mb-2 text-gray-800">
            Your Website URL
          </h1>
          <div className="relative mt-2">
            <Input
              className="w-full focus-visible:ring-gray-600 placeholder:text-gray-200 bg-transparent pr-10 text-secondary border-yellow-200/50 ring-offset-gray-400"
              placeholder="Enter your portfolio url"
              type="url"
              value={pUrl}
              onChange={(e) => setPUrl(e.target.value)}
            />
            <Button
              className="absolute top-0 right-0 p-2 px-2.5 bg-gray-500 hover:bg-gray-600"
              onClick={() => {
                setPortfolioURL(pUrl);
                toast.success("Portfolio URL saved");
              }}
            >
              <Save className="text-white" size={20} />
            </Button>
          </div>
        </div>
      </Block>
      <Block className="col-span-12 sm:col-span-6 md:col-span-4 bg-gradient-to-r from-rose-300 to-rose-500 h-[230px]">
        <div className="grid h-full place-content-center text-3xl text-white py-4">
          <Globe
            size={18}
            className="w-5 h-5 absolute top-2 left-2 text-gray-500"
          />
          <h1 className="text-2xl font-bold mx-auto mb-2 text-zinc-800">
            Kuch chota mota image de dena....
          </h1>
        </div>
      </Block>
    </>
  );
}
