import {
  Github,
  Linkedin,
  Twitter,
  Youtube,
  CircleUser,
  Save,
  Loader,
  Loader2,
} from "lucide-react";
import Block from "./ui/Block";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";
import { Graph, StreakStats, UserStats } from "@/types";
import { useState } from "react";
import { Button } from "./ui/button";
import { toast } from "sonner";

export default function SocialsBlock({
  setName,
  setGithubURL,
  showStats,
  setShowStats,
  showGraph,
  setShowGraph,
  setTwitterURL,
  setImageUrl,
  setStats,
  setStreak,
  setGraph,
}: {
  setName: (name: string) => void;
  setGithubURL: (url: string) => void;
  setShowStats: (show: boolean) => void;
  setShowGraph: (show: boolean) => void;
  setTwitterURL: (url: string) => void;
  setImageUrl: (url: string) => void;
  setStats: (stats: UserStats | undefined) => void;
  setStreak: (streak: StreakStats | undefined) => void;
  setGraph: (graph: Graph[] | undefined) => void;
  showStats: boolean;
  showGraph: boolean;
}) {
  const [tUrl, setTUrl] = useState("");
  const [gUrl, setGUrl] = useState("");
  const [iUrl, setIUrl] = useState("");
  const [nameText, setNameText] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStats = async () => {
    setLoading(true);
    setGraph(undefined);
    setStats(undefined);
    setStreak(undefined);
    console.log(showStats, showGraph);
    if (!showStats && !showGraph) {
      setGithubURL(gUrl);
      toast.success("Github Username saved");
      setLoading(false);
      return;
    }
    if (!gUrl) {
      toast.error("Github Username is required");
      setLoading(false);
      return;
    }

    if (showStats && showGraph) {
      const res1 = await fetch("/api/stats?&username=" + gUrl);
      const data = await res1.json();
      if (data.error) {
        toast.error("Username not found");
        setLoading(false);
        return;
      }
      setStats(data.stats);
      const res2 = await fetch("/api/streak?&username=" + gUrl);
      const streak = await res2.json();
      setStreak(streak.stats);

      const res3 = await fetch("/api/graph?username=" + gUrl);
      const graph = await res3.json();
      setGraph(graph);
    }

    if (showStats && !showGraph) {
      const res1 = await fetch("/api/stats?&username=" + gUrl);
      const data = await res1.json();
      if (data.error) {
        toast.error("Username not found");
        setLoading(false);
        return;
      }
      setStats(data.stats);
      const res2 = await fetch("/api/streak?&username=" + gUrl);
      const streak = await res2.json();
      setStreak(streak.stats);
    }

    if (showGraph && !showStats) {
      const res = await fetch("/api/graph?username=" + gUrl);
      const graph = await res.json();
      console.log(graph);
      setGraph(graph);
    }

    setGithubURL(gUrl);
    if (showStats && showGraph) {
      toast.success(gUrl + " stat cards and contribution graph added");
    }
    if (showStats) {
      toast.success(gUrl + " stat cards added");
    }
    if (showGraph) {
      toast.success(gUrl + " contribution graph added");
    }
    setLoading(false);
  };

  return (
    <>
      <Block className="col-span-12 sm:col-span-6 bg-red-500 md:col-span-3">
        <div className="grid h-full text-3xl text-white">
          <CircleUser size={18} className="w-6 h-6 absolute top-2 left-2" />
          <h1 className="text-2xl font-bold mx-auto mb-2 text-rose-200">
            Your Name
          </h1>
          <div className="relative mt-2">
            <Input
              className="w-full placeholder:text-gray-200 bg-transparent border border-red-200/50 pr-10 text-white ring-offset-red-500"
              placeholder="Enter your first Name"
              value={nameText}
              onChange={(e) => setNameText(e.target.value)}
            />
            <Button
              className="absolute top-0 right-0 p-2 px-2.5 bg-red-600 hover:bg-red-700"
              onClick={() => {
                setName(nameText);
                toast.success("Name saved");
              }}
            >
              <Save className="text-white" size={20} />
            </Button>
          </div>
        </div>
      </Block>

      <Block className="col-span-12 sm:col-span-6 bg-gradient-to-br from-yellow-500 to-rose-400 md:col-span-3">
        <div className="grid h-full text-3xl text-white py-4">
          <Linkedin size={18} className="w-5 h-5 absolute top-2 left-2" />
          <h1 className="text-2xl font-bold mx-auto mb-2 text-yellow-200">
            Image URL
          </h1>
          <div className="relative mt-2">
            <Input
              className="w-full focus-visible:ring-orange-700 placeholder:text-gray-200 bg-transparent pr-10 text-white border-yellow-200/50 ring-offset-orange-500"
              placeholder="Enter your image url"
              type="url"
              value={iUrl}
              onChange={(e) => setIUrl(e.target.value)}
            />
            <Button
              className="absolute top-0 right-0 p-2 px-2.5 bg-orange-500 hover:bg-orange-600"
              onClick={() => {
                setImageUrl(iUrl);
                toast.success("Image URL saved");
              }}
            >
              <Save className="text-white" size={20} />
            </Button>
          </div>
        </div>
      </Block>

      <Block className="col-span-12 sm:col-span-6 bg-green-600 md:col-span-3">
        <div className="grid h-full text-3xl text-white">
          <Github size={18} className="w-5 h-5 absolute top-2 left-2" />
          <h1 className="text-2xl font-bold mx-auto mb-2 text-green-200">
            Github Username
          </h1>
          <div className="relative mt-2 mb-3">
            <Input
              className="w-full pr-10 focus-visible:ring-green-700 placeholder:text-gray-200 bg-transparent border border-green-200/50 text-white ring-offset-green-600"
              placeholder="Enter your username"
              value={gUrl}
              onChange={(e) => setGUrl(e.target.value)}
            />
            <Button
              className="absolute top-0 right-0 p-2 px-2.5 bg-emerald-500 hover:bg-green-500"
              onClick={async () => {
                await handleStats();
              }}
            >
              {loading ? (
                <Loader2 className="text-white animate-spin" size={20} />
              ) : (
                <Save className="text-white" size={20} />
              )}
            </Button>
          </div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Label htmlFor="stats">Stats</Label>
              <Switch
                className="data-[state=checked]:bg-emerald-200"
                id="stats"
                onCheckedChange={async (checked) => {
                  setShowStats(checked);
                }}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Label htmlFor="graph">Graph</Label>
              <Switch
                className="data-[state=checked]:bg-emerald-200"
                id="graph"
                onCheckedChange={(checked) => setShowGraph(checked)}
              />
            </div>
          </div>
        </div>
      </Block>

      <Block className="col-span-12 sm:col-span-6 bg-blue-500 md:col-span-3">
        <div className="grid h-full text-3xl text-white py-4">
          <Twitter
            size={18}
            className="w-5 h-5 absolute top-2 left-2 text-white"
          />
          <h1 className="text-2xl font-bold mx-auto mb-2 text-blue-200">
            Twitter Username
          </h1>
          <div className="relative mt-2">
            <Input
              className="w-full focus-visible:ring-blue-700 placeholder:text-gray-200 bg-transparent pr-10 border border-blue-200/50 text-secondary ring-offset-blue-500"
              placeholder="Enter your username"
              value={tUrl}
              onChange={(e) => setTUrl(e.target.value)}
            />
            <Button
              className="absolute top-0 right-0 p-2 px-2.5 bg-blue-600 hover:bg-blue-700"
              onClick={() => {
                setTwitterURL(tUrl);
                toast.success("Twitter Username saved");
              }}
            >
              <Save className="text-white" size={20} />
            </Button>
          </div>
        </div>
      </Block>
    </>
  );
}
