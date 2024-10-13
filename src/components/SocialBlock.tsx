import { Github, Linkedin, Twitter, Youtube, CircleUser } from "lucide-react";
import Block from "./ui/Block";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

export default function SocialsBlock({
  name,
  githubURL,
  setName,
  setGithubURL,
  setShowStats,
  setShowGraph,
  twitterURL,
  setTwitterURL,
  linkedinURL,
  setLinkedinURL,
}: {
  name: string;
  setName: (name: string) => void;
  githubURL: string;
  setGithubURL: (url: string) => void;
  setShowStats: (show: boolean) => void;
  setShowGraph: (show: boolean) => void;
  twitterURL: string;
  setTwitterURL: (url: string) => void;
  linkedinURL: string;
  setLinkedinURL: (url: string) => void;
}) {
  return (
    <>
      <Block className="col-span-12 sm:col-span-6 bg-red-500 md:col-span-3">
        <div className="grid h-full place-content-center text-3xl text-white">
          <CircleUser size={18} className="w-6 h-6 absolute top-2 left-2" />
          <h1 className="text-2xl font-bold mx-auto mb-2 text-rose-200">
            Your Name
          </h1>
          <Input
            className="w-full mt-2 placeholder:text-gray-200 bg-transparent border border-white text-white ring-offset-red-500"
            placeholder="Enter your username"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
      </Block>

      <Block className="col-span-12 sm:col-span-6 bg-green-600 md:col-span-3">
        <div className="grid h-full place-content-center text-3xl text-white">
          <Github size={18} className="w-5 h-5 absolute top-2 left-2" />
          <h1 className="text-2xl font-bold mx-auto mb-2 text-green-200">
            Github Username
          </h1>
          <Input
            className="w-full mt-2 focus-visible:ring-green-700 mb-3 placeholder:text-gray-200 bg-transparent border border-white text-white ring-offset-green-600"
            placeholder="Enter your username"
            value={githubURL}
            onChange={(e) => setGithubURL(e.target.value)}
          />
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Label htmlFor="stats">Stats</Label>
              <Switch
                className="data-[state=checked]:bg-emerald-300"
                id="stats"
                onCheckedChange={(checked) => setShowStats(checked)}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="graph">Graph</Label>
              <Switch
                className="data-[state=checked]:bg-emerald-300"
                id="graph"
                onCheckedChange={(checked) => setShowGraph(checked)}
              />
            </div>
          </div>
        </div>
      </Block>

      <Block className="col-span-12 sm:col-span-6 bg-zinc-50 md:col-span-3">
        <div className="grid h-full place-content-center text-3xl text-white py-4">
          <Twitter
            size={18}
            className="w-5 h-5 absolute top-2 left-2 text-secondary"
          />
          <h1 className="text-2xl font-bold mx-auto mb-2 text-secondary">
            Twitter Username
          </h1>
          <Input
            className="w-full mt-2 focus-visible:ring-secondary placeholder:text-gray-800 bg-transparent border border-secondary text-secondary ring-offset-white"
            placeholder="Enter your username"
            value={twitterURL}
            onChange={(e) => setTwitterURL(e.target.value)}
          />
        </div>
      </Block>

      <Block className="col-span-12 sm:col-span-6 bg-blue-500 md:col-span-3">
        <div className="grid h-full place-content-center text-3xl text-white py-4">
          <Linkedin size={18} className="w-5 h-5 absolute top-2 left-2" />
          <h1 className="text-2xl font-bold mx-auto mb-2 text-blue-300">
            LinkedIn Username
          </h1>
          <Input
            className="w-full mt-2 focus-visible:ring-blue-700 placeholder:text-gray-200 bg-transparent text-white border-white ring-offset-blue-500"
            placeholder="Enter your username"
            value={linkedinURL}
            onChange={(e) => setLinkedinURL(e.target.value)}
          />
        </div>
      </Block>
    </>
  );
}