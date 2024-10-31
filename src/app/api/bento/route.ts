import fetchUserData from "@/actions/fetchUserData";
import { fetchContributions } from "@/actions/githubGraphql";
import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from 'fs';
import satori from "satori";

export const maxDuration = 45;

export async function GET(req: NextRequest) {
  const satoshi = await fs.readFile("./Satori.ttf").then(buffer => buffer.buffer.slice(0, buffer.byteLength));
  const { searchParams } = new URL(req.url);
  const n = searchParams.get("n");
  const g = searchParams.get("g");
  const i = searchParams.get("i");
  const x = searchParams.get("x");
  const l = searchParams.get("l");
  let htmlofGithubStats = ``;

  if (g) {
    const { userStats } = await fetchUserData(g);
    const contributionStats = await fetchContributions(g);

    htmlofGithubStats = `
      <div class="grid gap-4 grid-cols-4 col-span-4 row-span-2">
        <div class="col-span-2 row-span-2">
          <div class="grid grid-cols-4 grid-rows-3 gap-4 auto-rows-fr rounded-xl overflow-hidden w-full h-full">
            <!-- Total Stars Card -->
            <div class="bg-gradient-to-br from-amber-500/40 via-amber-500/10 to-transparent rounded-xl p-4 flex flex-col justify-between col-span-2 relative row-span-2">
              <div class="flex absolute top-2 px-3 left-0 items-center justify-between w-full opacity-70">
                <i data-lucide="star" class="w-10 h-10 text-yellow-400 fill-current"></i>
                <i data-lucide="star" class="w-10 h-10 text-yellow-400 fill-current"></i>
                <i data-lucide="star" class="w-10 h-10 text-yellow-400 fill-current"></i>
                <i data-lucide="star" class="w-10 h-10 text-yellow-400 fill-current"></i>
                <i data-lucide="star" class="w-10 h-10 text-yellow-400 fill-current"></i>
              </div>
              <h3 class="text-2xl mt-16 text-end text-muted-foreground font-medium">Total Stars</h3>
              <div class="text-end text-yellow-400 text-7xl font-bold">${userStats["Star Earned"]}</div>
            </div>
            <!-- PRs Card -->
            <div class="bg-gradient-to-b from-pink-900/20 to-neutral-900/50 rounded-xl relative p-4 flex flex-col justify-between col-span-1 row-span-1">
              <i data-lucide="git-pull-request" class="text-pink-400 absolute top-2 w-5 h-5"></i>
              <span class="text-gray-300 text-sm pt-4 font-medium">PRs</span>
              <div class="text-pink-400 text-3xl font-bold mt-2">${userStats["Pull Requests"]}</div>
            </div>
            <!-- Followers Card -->
            <div class="bg-gradient-to-tl from-rose-950/20 to-stone-900/50 relative rounded-xl p-4 flex flex-col justify-between col-span-1 row-span-1">
              <i data-lucide="users" class="text-red-500 absolute top-2 w-5 h-5"></i>
              <span class="text-gray-300 text-sm pt-4 font-medium">Followers</span>
              <div class="text-red-500 text-4xl font-bold mt-2">${userStats.Followers}</div>
            </div>
            <!-- Commits Card -->
            <div class="bg-gradient-to-t from-black to-slate-800/50 overflow-hidden relative rounded-xl p-4 flex flex-col justify-between col-span-2 row-span-2">
              <svg class="absolute inset-0 object-cover rotate-180" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800">
                <defs>
                  <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="oooscillate-grad">
                    <stop stop-color="hsl(105, 69%, 40%)" stop-opacity="1" offset="0%"></stop>
                    <stop stop-color="hsl(105, 69%, 60%)" stop-opacity="1" offset="100%"></stop>
                  </linearGradient>
                </defs>
                <g stroke-width="2" stroke="url(#oooscillate-grad)" fill="none" stroke-linecap="round">
                  <path d="M 0 500 Q 200 35 400 400 Q 600 765 800 500" opacity="1.00"></path>
                  <path d="M 0 475 Q 200 35 400 400 Q 600 765 800 475" opacity="0.95"></path>
                  <path d="M 0 450 Q 200 35 400 400 Q 600 765 800 450" opacity="0.90"></path>
                  <path d="M 0 425 Q 200 35 400 400 Q 600 765 800 425" opacity="0.85"></path>
                  <path d="M 0 400 Q 200 35 400 400 Q 600 765 800 400" opacity="0.80"></path>
                  <path d="M 0 375 Q 200 35 400 400 Q 600 765 800 375" opacity="0.75"></path>
                  <path d="M 0 350 Q 200 35 400 400 Q 600 765 800 350" opacity="0.70"></path>
                  <path d="M 0 325 Q 200 35 400 400 Q 600 765 800 325" opacity="0.65"></path>
                  <path d="M 0 300 Q 200 35 400 400 Q 600 765 800 300" opacity="0.60"></path>
                  <path d="M 0 275 Q 200 35 400 400 Q 600 765 800 275" opacity="0.55"></path>
                  <path d="M 0 250 Q 200 35 400 400 Q 600 765 800 250" opacity="0.50"></path>
                  <path d="M 0 225 Q 200 35 400 400 Q 600 765 800 225" opacity="0.45"></path>
                  <path d="M 0 200 Q 200 35 400 400 Q 600 765 800 200" opacity="0.40"></path>
                  <path d="M 0 175 Q 200 35 400 400 Q 600 765 800 175" opacity="0.35"></path>
                  <path d="M 0 150 Q 200 35 400 400 Q 600 765 800 150" opacity="0.30"></path>
                  <path d="M 0 125 Q 200 35 400 400 Q 600 765 800 125" opacity="0.25"></path>
                  <path d="M 0 100 Q 200 35 400 400 Q 600 765 800 100" opacity="0.20"></path>
                  <path d="M 0 75 Q 200 35 400 400 Q 600 765 800 75" opacity="0.15"></path>
                  <path d="M 0 50 Q 200 35 400 400 Q 600 765 800 50" opacity="0.10"></path>
                </g>
              </svg>
              <div class="flex items-center w-full">
                <i data-lucide="activity" class="text-green-400 w-11 h-11"></i>
                <span class="text-muted-foreground w-full text-end text-2xl font-medium">Commits</span>
              </div>
              <div class="text-green-400 text-6xl text-end font-bold">${userStats.Commits}</div>
            </div>
            <!-- Contributed To Card -->
            <div class="bg-muted/30 relative overflow-hidden rounded-xl p-4 flex flex-col justify-between col-span-2 row-span-1">
              <svg class="absolute -z-10 inset-0 object-cover" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800">
                <defs>
                  <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="oooscillate-grad-2">
                    <stop stop-color="hsl(274, 99%, 42%)" stop-opacity="1" offset="0%"></stop>
                    <stop stop-color="hsl(274, 99%, 72%)" stop-opacity="1" offset="100%"></stop>
                  </linearGradient>
                </defs>
                <g stroke-width="2" stroke="url(#oooscillate-grad-2)" fill="none" stroke-linecap="round">
                  <path d="M 0 500 Q 200 35 400 400 Q 600 765 800 500" opacity="1.00"></path>
                  <path d="M 0 475 Q 200 35 400 400 Q 600 765 800 475" opacity="0.95"></path>
                  <path d="M 0 450 Q 200 35 400 400 Q 600 765 800 450" opacity="0.90"></path>
                  <path d="M 0 425 Q 200 35 400 400 Q 600 765 800 425" opacity="0.85"></path>
                  <path d="M 0 400 Q 200 35 400 400 Q 600 765 800 400" opacity="0.80"></path>
                  <path d="M 0 375 Q 200 35 400 400 Q 600 765 800 375" opacity="0.75"></path>
                  <path d="M 0 350 Q 200 35 400 400 Q 600 765 800 350" opacity="0.70"></path>
                  <path d="M 0 325 Q 200 35 400 400 Q 600 765 800 325" opacity="0.65"></path>
                  <path d="M 0 300 Q 200 35 400 400 Q 600 765 800 300" opacity="0.60"></path>
                  <path d="M 0 275 Q 200 35 400 400 Q 600 765 800 275" opacity="0.55"></path>
                  <path d="M 0 250 Q 200 35 400 400 Q 600 765 800 250" opacity="0.50"></path>
                  <path d="M 0 225 Q 200 35 400 400 Q 600 765 800 225" opacity="0.45"></path>
                  <path d="M 0 200 Q 200 35 400 400 Q 600 765 800 200" opacity="0.40"></path>
                  <path d="M 0 175 Q 200 35 400 400 Q 600 765 800 175" opacity="0.35"></path>
                  <path d="M 0 150 Q 200 35 400 400 Q 600 765 800 150" opacity="0.30"></path>
                  <path d="M 0 125 Q 200 35 400 400 Q 600 765 800 125" opacity="0.25"></path>
                  <path d="M 0 100 Q 200 35 400 400 Q 600 765 800 100" opacity="0.20"></path>
                  <path d="M 0 75 Q 200 35 400 400 Q 600 765 800 75" opacity="0.15"></path>
                  <path d="M 0 50 Q 200 35 400 400 Q 600 765 800 50" opacity="0.10"></path>
                </g>
              </svg>
              <span class="text-muted-foreground w-full text-end text-lg font-medium">Contributed To</span>
              <div class="text-indigo-500 text-5xl text-end font-bold">${userStats["Contributed To"]}</div>
            </div>
            <!-- Issues Card -->
            <div class="bg-gradient-to-b from-neutral-950/20 to-black/50 relative rounded-xl p-4 flex flex-col justify-between col-span-1 row-span-1">
              <i data-lucide="info" class="text-gray-400 absolute top-2 w-5 h-5"></i>
              <span class="text-gray-300 text-sm pt-4 font-medium">Issues</span>
              <div class="text-gray-400 text-3xl font-bold mt-2">${userStats.Issues}</div>
            </div>
            <!-- Repo Card -->
            <div class="bg-gradient-to-tr from-rose-950/20 to-neutral-900/50 relative rounded-xl p-4 flex flex-col justify-between col-span-1 row-span-1">
              <i data-lucide="github" class="text-purple-400 absolute top-2 w-5 h-5"></i>
              <span class="text-gray-300 text-sm pt-4 font-medium">Repos</span>
              <div class="text-purple-400 text-4xl font-bold mt-2">${userStats.Repositories}</div>
            </div>
            <!-- Followers Card -->
            <div class="bg-gradient-to-b from-pink-900/20 to-neutral-900/50 rounded-xl relative p-4 flex flex-col justify-between col-span-1 row-span-1">
              <i data-lucide="users" class="text-pink-400 absolute top-2 w-5 h-5"></i>
              <span class="text-gray-300 text-sm pt-4 font-medium">Followers</span>
              <div class="text-pink-400 text-3xl font-bold mt-2">${userStats.Followers}</div>
            </div>
            <!-- Gists Card -->
            <div class="bg-gradient-to-b from-black to-slate-800/50 overflow-hidden relative rounded-xl p-4 flex flex-col justify-between col-span-2 row-span-2">
              <svg class="absolute inset-0 object-cover rotate-180" xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:svgjs="http://svgjs.dev/svgjs" viewBox="0 0 800 800">
                <defs>
                  <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="oooscillate-grad-3">
                    <stop stop-color="hsl(105, 69%, 40%)" stop-opacity="1" offset="0%"></stop>
                    <stop stop-color="hsl(105, 69%, 60%)" stop-opacity="1" offset="100%"></stop>
                  </linearGradient>
                </defs>
                <g stroke-width="2" stroke="url(#oooscillate-grad-3)" fill="none" stroke-linecap="round">
                  <path d="M 0 500 Q 200 35 400 400 Q 600 765 800 500" opacity="1.00"></path>
                  <path d="M 0 475 Q 200 35 400 400 Q 600 765 800 475" opacity="0.95"></path>
                  <path d="M 0 450 Q 200 35 400 400 Q 600 765 800 450" opacity="0.90"></path>
                  <path d="M 0 425 Q 200 35 400 400 Q 600 765 800 425" opacity="0.85"></path>
                  <path d="M 0 400 Q 200 35 400 400 Q 600 765 800 400" opacity="0.80"></path>
                  <path d="M 0 375 Q 200 35 400 400 Q 600 765 800 375" opacity="0.75"></path>
                  <path d="M 0 350 Q 200 35 400 400 Q 600 765 800 350" opacity="0.70"></path>
                  <path d="M 0 325 Q 200 35 400 400 Q 600 765 800 325" opacity="0.65"></path>
                  <path d="M 0 300 Q 200 35 400 400 Q 600 765 800 300" opacity="0.60"></path>
                  <path d="M 0 275 Q 200 35 400 400 Q 600 765 800 275" opacity="0.55"></path>
                  <path d="M 0 250 Q 200 35 400 400 Q 600 765 800 250" opacity="0.50"></path>
                  <path d="M 0 225 Q 200 35 400 400 Q 600 765 800 225" opacity="0.45"></path>
                  <path d="M 0 200 Q 200 35 400 400 Q 600 765 800 200" opacity="0.40"></path>
                  <path d="M 0 175 Q 200 35 400 400 Q 600 765 800 175" opacity="0.35"></path>
                  <path d="M 0 150 Q 200 35 400 400 Q 600 765 800 150" opacity="0.30"></path>
                  <path d="M 0 125 Q 200 35 400 400 Q 600 765 800 125" opacity="0.25"></path>
                  <path d="M 0 100 Q 200 35 400 400 Q 600 765 800 100" opacity="0.20"></path>
                  <path d="M 0 75 Q 200 35 400 400 Q 600 765 800 75" opacity="0.15"></path>
                  <path d="M 0 50 Q 200 35 400 400 Q 600 765 800 50" opacity="0.10"></path>
                </g>
              </svg>
              <div class="flex items-center w-full">
                <i data-lucide="file-code" class="text-green-400 w-11 h-11"></i>
                <span class="text-muted-foreground w-full text-end text-2xl font-medium">Gists</span>
              </div>
              <div class="text-green-400 text-6xl text-end font-bold">${userStats.Gists}</div>
            </div>
          </div>
        </div>
        <div class="bg-black p-6 row-span-2 col-span-2 flex justify-center items-center rounded-2xl">
          ${contributionStats}
        </div>
      </div>`;
  }

  const html = `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          background: #f0f0f0;
        }
        .container {
          background: white;
          padding: 20px;
          border-radius: 8px;
          box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="flex flex-col items-center justify-center space-y-10 w-full">
          <div class="border border-muted w-full flex justify-center rounded-xl p-5">
            <h1 class="text-3xl font-semibold">${n}</h1>
          </div>
          <div class="w-full flex justify-center">
            <img
              class="rounded-full w-48"
              src="${i}"
              alt="User's profile picture"
            />
          </div>
          ${htmlofGithubStats}
          <div class="grid grid-cols-2 gap-4 col-span-2 w-full items-center">
            <div class="flex justify-center items-center col-span-2">
              <h2 class="text-2xl font-semibold text-center">${x}</h2>
            </div>
            <div
              class="flex flex-col col-span-2 items-center justify-center space-y-2"
            >
              <p class="text-muted-foreground">
                Here are some repos I have been working on:
              </p>
              ${l}
            </div>
          </div>
        </div>
      </div>
    </body>
  </html>`;

  const satoshiBuffer = Buffer.from(satoshi);

  const renderedHtml = await satori(html, {
    height: 800,
    width: 800,
    fonts: [{ data: satoshiBuffer, name: "Inter" }],
  });

  return new NextResponse(renderedHtml, {
    headers: {
      "Content-Type": "image/svg+xml",
    },
  });
}
