/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import { Space_Grotesk } from "next/font/google";
import { cn } from "@/lib/utils";
import {
  Activity,
  Calendar,
  Clipboard,
  Download,
  Flame,
  GitBranch,
  GitPullRequest,
  Linkedin,
  Loader2,
  Star,
  Trophy,
  TwitterIcon,
  Users,
} from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Graph, StreakStats, UserStats } from "@/types";
import { generateContributionGraph } from "@/utils/generate-graph";
import { toast } from "sonner";
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
  stats,
  streak,
  graph,
  portfolioUrl,
}: {
  name: string;
  githubURL: string;
  twitterURL: string;
  linkedinURL: string;
  imageUrl: string;
  stats: UserStats | undefined;
  streak: StreakStats | undefined;
  graph: Graph[] | undefined;
  portfolioUrl: string;
}) => {
  const [bentoLink, setBentoLink] = useState<string>("");

  const getColor = (value: number) => {
    switch (value) {
      case 0:
        return "#191919";
      case 1:
        return "#14532D";
      case 2:
        return "#1E7A1E";
      case 3:
        return "#28A745";
      case 4:
        return "#00ef57";
      default:
        return "#27272A";
    }
  };

  const [loading, setLoading] = useState(false);

  const handleDownload = async () => {
    try {
      const yamlLink = document.createElement("a");
      yamlLink.href = "/update-bento.yml";
      yamlLink.download = "update-bento.yml";
      document.body.appendChild(yamlLink);
      yamlLink.click();
      document.body.removeChild(yamlLink);
      window.URL.revokeObjectURL(yamlLink.href);

      await new Promise((resolve) => setTimeout(resolve, 100));

      const response = await fetch("/getNewBento.ts.template");
      if (!response.ok) {
        throw new Error(`Failed to fetch template: ${response.statusText}`);
      }

      let fileContent = await response.text();

      const apiUrl = `https://opbento.vercel.app/api/bento?name=${encodeURIComponent(
        name
      )}&githubURL=${encodeURIComponent(
        githubURL
      )}&twitterURL=${encodeURIComponent(
        twitterURL
      )}&linkedinURL=${encodeURIComponent(
        linkedinURL
      )}&imageUrl=${encodeURIComponent(
        imageUrl
      )}&portfolioUrl=${encodeURIComponent(portfolioUrl)}`;

      fileContent = `const apiUrl = "${apiUrl}";\n` + fileContent;

      const blob = new Blob([fileContent], { type: "text/typescript" });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "getNewBento.ts";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      toast.success("Files downloaded successfully");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Error downloading file");
    }
  };

  const handleGenerateLink = async () => {
    setLoading(true);
    const apiURL = `/api/bento?n=${encodeURIComponent(
      name
    )}&i=${encodeURIComponent(imageUrl)}&g=${encodeURIComponent(
      githubURL
    )}&x=${encodeURIComponent(twitterURL)}&l=${encodeURIComponent(
      linkedinURL
    )}&p=${encodeURIComponent(portfolioUrl)}`;
    try {
      const res = await fetch(apiURL);
      const data = await res.json();
      setBentoLink(data.url);
    } catch (error) {
      console.error("Error generating or uploading the image:", error);
    }
    setLoading(false);
  };

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(`![OpBento](${bentoLink})`);
    toast.success("Copied to clipboard");
  };

  return (
    <div className="max-w-5xl mx-auto">
      <div
        className={cn(
          "p-4 grid grid-cols-1 md:grid-cols-4 gap-4 max-w-5xl mt-32 mb-8 w-full mx-auto",
          space.className
        )}
      >
        <div className="text-white py-6 px-8 rounded-lg bg-gradient-to-br from-cyan-400 via-blue-500 to-violet-600 to col-span-1 row-span-1 min-h-32">
          <p className="text-xl">Hey Im</p>
          <h2 className="text-4xl font-bold mb-2 capitalize">
            {name || "Nigga"}
          </h2>
        </div>

        <div className="bg-muted h-80 overflow-hidden rounded-lg col-span-2 row-span-2 flex items-center justify-center">
          <Image
            src={
              imageUrl ||
              "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            }
            alt={name}
            width={500}
            height={500}
            className="size-full hover:scale-110 duration-500 transition-all ease object-cover"
          />
        </div>

        <a
          href={"https://x.com/" + twitterURL}
          className="bg-gradient-to-br from-black to-blue-500 p-4 relative rounded-lg overflow-hidden col-span-1 row-span-1 min-h-[150px]"
        >
          <TwitterIcon
            className="absolute glow -top-3 -left-4"
            size={100}
            color="#29BEF0"
            strokeWidth={1}
          />
          <p className="z-20 absolute bottom-6 text-xl text-center w-full">
            @{twitterURL}
          </p>
        </a>

        <div className="bg-muted relative overflow-hidden rounded-lg col-span-1 row-span-2">
          <img
            src="https://i.postimg.cc/NGK80VQ1/cf954b8923fbafc5cfc0c66344b6a6f9.jpg"
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

        <a
          href={"https://www.linkedin.com/in/" + linkedinURL}
          className="bg-gradient-to-tl from-black to-blue-600 p-4 relative rounded-lg overflow-hidden col-span-1 columns-3 row-span-1 min-h-[150px]"
        >
          <Linkedin
            className="absolute glow -bottom-1 -right-2"
            size={80}
            color="#56d2ff"
            strokeWidth={1}
          />
          <p className="text-center text-lg w-full">@{linkedinURL}</p>
        </a>

        <div className="bg-muted overflow-hidden border border-red-600/40 rounded-lg col-span-2 row-span-1">
          <img
            src={`https://github-readme-activity-graph.vercel.app/graph?username=${githubURL}&bg_color=030312&color=ff8080&line=e00a60&point=ff7171&area=true&hide_border=true`}
            alt="graph"
            className="size-full object-cover h-[150px]"
          />
        </div>

        <div className="p-4 bg-gradient-to-br from-gray-100 via-gray-300 to-gray-600/80 rounded-lg col-span-1 row-span-1 flex relative flex-col items-center justify-center min-h-32 overflow-hidden">
          <h1 className="font-semibold text-xl bg-gradient-to-b from-[#797979] to-[#040e1f] bg-clip-text absolute top-6 break-all left-4 text-transparent leading-[100%] tracking-tighter">
            {portfolioUrl.startsWith("https://")
              ? portfolioUrl.replace("https://", "")
              : portfolioUrl}
          </h1>
          <img
            src="/earth.png"
            width={200}
            height={200}
            alt=""
            className="absolute -bottom-28 -right-28"
          />
        </div>

        {stats && (
          <div className="grid gap-4 grid-cols-4 col-span-4 row-span-2">
            <div className="col-span-2 row-span-2">
              <div className="grid grid-cols-4 grid-rows-3 gap-4 auto-rows-fr rounded-xl overflow-hidden size-full">
                <div className="bg-gradient-to-br from-amber-500/40 via-amber-500/10 to-transparent rounded-xl p-4 flex flex-col justify-between col-span-2 relative row-span-2">
                  <div className="flex absolute top-2 px-3 left-0 items-center justify-between w-full opacity-70">
                    <Star size={40} fill="gold" color="gold" />
                    <Star size={40} fill="gold" color="gold" />
                    <Star size={40} fill="gold" color="gold" />
                    <Star size={40} fill="gold" color="gold" />
                    <Star size={40} fill="gold" color="gold" />
                  </div>
                  <h3 className="text-2xl mt-16 text-end text-muted-foreground font-medium">
                    Total Stars
                  </h3>
                  <div className="text-end text-yellow-400 text-7xl font-bold">
                    {stats["Star Earned"]}
                  </div>
                </div>

                <div className="bg-gradient-to-b from-pink-900/20 to-neutral-900/50 rounded-xl relative p-4 flex flex-col justify-between col-span-1 row-span-1">
                  <GitPullRequest
                    className="text-pink-400 absolute top-2"
                    size={20}
                  />
                  <span className="text-gray-300 text-sm pt-4 font-medium">
                    PRs
                  </span>

                  <div className="text-pink-400 text-3xl font-bold mt-2">
                    {stats["Pull Requests"]}
                  </div>
                </div>
                <div className="bg-gradient-to-tl from-rose-950/20 to-stone-900/50 relative rounded-xl p-4 flex flex-col justify-between col-span-1 row-span-1">
                  <Users className="text-red-500 absolute top-2" size={20} />
                  <span className="text-gray-300 text-sm pt-4 font-medium">
                    Followers
                  </span>

                  <div className="text-red-500 text-4xl font-bold mt-2">
                    {stats.Followers}
                  </div>
                </div>
                <div className="bg-gradient-to-t from-black to-slate-800/50 overflow-hidden relative rounded-xl p-4 flex flex-col justify-between col-span-2 row-span-2">
                  <img
                    src={"/surf.svg"}
                    alt=""
                    width={450}
                    height={400}
                    className="absolute inset-0 object-cover rotate-180"
                  />
                  <div className="flex items-center w-full">
                    <Activity className="text-green-400" size={45} />
                    <span className="text-muted-foreground w-full text-end text-2xl font-medium">
                      Commits
                    </span>
                  </div>
                  <div className="text-green-400 text-6xl text-end font-bold ">
                    {stats.Commits}
                  </div>
                </div>
                <div className="bg-muted/30 relative overflow-hidden rounded-xl p-4 flex flex-col justify-between col-span-2 row-span-1">
                  <img
                    src={"/blocks.svg"}
                    alt=""
                    width={400}
                    height={400}
                    className="absolute -z-10 inset-0 object-cover brightness-150"
                  />
                  <GitBranch
                    className="text-blue-400 glow absolute left-12 bottom-4"
                    size={40}
                  />
                  <span className="text-muted-foreground text-center w-full text-sm font-medium">
                    Contributed To
                  </span>
                  <div className="text-blue-400 text-4xl text-center font-bold mt-2">
                    {stats["Contributed To"]}
                  </div>
                </div>
              </div>
            </div>
            <div className="size-full col-span-2 row-span-2">
              <div className="max-w-xl size-full rounded-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 size-full">
                  <div className="flex size-full flex-col space-y-4">
                    <div className="bg-gradient-to-tr from-slate-900 to-secondary/20 rounded-lg p-4 h-full flex flex-col items-center justify-center">
                      <Calendar className="w-8 h-8 mb-2 text-blue-400" />
                      <h3 className="text-sm font-medium text-gray-400">
                        Total Contributions
                      </h3>
                      <p className="text-3xl font-bold text-blue-400">
                        {streak?.totalContributions}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {streak?.firstDateofContribution
                          ? streak?.firstDateofContribution + "- Present"
                          : "No contributions yet"}
                      </p>
                    </div>
                    <div className="rounded-lg bg-gradient-to-b from-yellow-500/15 via-transparent to-yellow-500/10 p-4 h-full flex flex-col items-center justify-center">
                      <Trophy className="w-8 h-8 mb-2 text-yellow-400" />
                      <h3 className="text-sm font-medium text-gray-400">
                        Longest Streak
                      </h3>
                      <p className="text-3xl font-bold text-yellow-400">
                        {streak?.longestStreak}
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        {streak?.longestStreakStartDate &&
                        streak?.longestStreakEndDate
                          ? streak?.longestStreakStartDate +
                            " - " +
                            streak?.longestStreakEndDate
                          : "No streak yet"}
                      </p>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r to-orange-800/10 from-orange-800/10 via-muted/10 rounded-lg p-6 flex flex-col items-center justify-center relative">
                    <Flame className="w-28 h-28 mb-4 text-orange-600 glow-orange rounded-full p-4" />
                    <h3 className="text-lg font-medium text-gray-400">
                      Current Streak
                    </h3>
                    <p className="text-6xl font-bold text-orange-600 my-4">
                      {streak?.currentStreak}
                    </p>
                    <p className="text-sm text-gray-500">
                      {streak?.currentStreakStartDate &&
                      streak?.currentStreakEndDate
                        ? streak?.currentStreakStartDate +
                          " - " +
                          streak?.currentStreakEndDate
                        : new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {graph && (
          <div className="bg-gradient-to-br from-green-950/80 p-4 col-span-4 row-span-2 rounded-lg w-full h-full">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">
                {githubURL}'s Contribution Graph
              </h1>
              <div className="flex items-center justify-end text-sm">
                <span>Less</span>
                <div className="flex gap-2 mx-3">
                  {[0, 1, 2, 3, 4].map((value) => (
                    <div
                      key={value}
                      className="w-4 h-4 rounded-sm"
                      title={`Contribution level ${value}`}
                      style={{ backgroundColor: getColor(value) }}
                    />
                  ))}
                </div>
                <span>More</span>
              </div>
            </div>
            <div
              className="flex justify-center pb-4 items-center w-full h-full"
              dangerouslySetInnerHTML={{
                __html: generateContributionGraph(graph),
              }}
            />
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <Button className="" onClick={handleGenerateLink}>
          Generate Bento
          {loading && <Loader2 className="ml-2 size-4 animate-spin" />}
        </Button>
        {bentoLink && (
          <Button onClick={handleDownload} variant={"secondary"}>
            Download Files <Download size={16} className="ml-2" />
          </Button>
        )}
      </div>
      <div className="relative mt-4">
        <Input
          value={`[![OpBento](${bentoLink})](https://opbento.vercel.app)`}
          readOnly
        />
        <Button className="absolute top-0 right-0" onClick={copyToClipboard}>
          <Clipboard />
        </Button>
      </div>
    </div>
  );
};

export default BentoGrid;
