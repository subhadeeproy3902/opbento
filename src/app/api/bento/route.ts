import { NextRequest, NextResponse } from "next/server";
import puppeteer from "puppeteer";

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url);
    const n = searchParams.get("n");
    const g = searchParams.get("g");
    const i = searchParams.get("i");
    const x = searchParams.get("x");
    const l = searchParams.get("l");

    // Create HTML content
    const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Space Grotesk',Arial, sans-serif;
            background-color: #1a202c;
            color: white;
            margin: 0;
            padding: 0;
        }
        .bento-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            max-width: 80rem;
            margin: 4px auto;
            padding: 1rem;
        }
        .bento-item {
            background-color: #2d3748;
            border-radius: 0.5rem;
            overflow: hidden;
        }
        .name-card {
            grid-column: span 1;
            grid-row: span 1;
            background: linear-gradient(to bottom right, #22d3ee, #3b82f6, #8b5cf6);
            padding: 1.5rem 2rem;
            min-height: 8rem;
        }
        .name-card h2 {
            font-size: 2rem;
            margin: 0;
        }
        .profile-pic {
            grid-column: span 2;
            grid-row: span 2;
            height: 20rem;
        }
        .profile-pic img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .twitter-card {
            grid-column: span 1;
            grid-row: span 2;
            background: linear-gradient(to bottom right, #000000, #3b82f6);
            position: relative;
            padding: 1rem;
        }
        .twitter-icon {
            position: absolute;
            top: -0.75rem;
            left: -1rem;
            width: 6.25rem;
            height: 6.25rem;
            color: #29BEF0;
        }
        .github-card {
            grid-column: span 1;
            grid-row: span 2;
            position: relative;
        }
        .github-card img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
        .github-card::after {
            content: '';
            position: absolute;
            inset: 0;
            background: linear-gradient(to bottom, transparent, rgba(0,0,0,0.8));
        }
        .github-link {
            position: absolute;
            bottom: 1.5rem;
            left: 0;
            right: 0;
            text-align: center;
            z-index: 10;
        }
        .github-link a {
            color: white;
            text-decoration: none;
            font-weight: 600;
            padding: 0.5rem 1rem;
            background-color: rgba(236, 72, 153, 0.8);
            border-radius: 0.375rem;
        }
        .music-player {
            grid-column: span 2;
            grid-row: span 1;
            padding: 1rem;
        }
        .music-controls {
            display: flex;
            justify-content: space-between;
            margin-top: 0.5rem;
        }
        .music-control {
            width: 1.5rem;
            height: 1.5rem;
            background-color: #4a5568;
            border-radius: 50%;
        }
        .op-bento {
            grid-column: span 1;
            grid-row: span 1;
            background: linear-gradient(to bottom right, #ea580c, #eab308, #e11d48);
            display: flex;
            align-items: center;
            justify-content: center;
            min-height: 8rem;
        }
        .op-bento h2 {
            font-size: 1.5rem;
            text-align: center;
        }
        @media (max-width: 768px) {
            .bento-grid {
                grid-template-columns: 1fr;
            }
            .profile-pic, .twitter-card, .github-card, .music-player {
                grid-column: span 1;
            }
        }
    </style>
</head>
<body>
    <div class="bento-grid">
        <div class="bento-item name-card">
            <p>Hey I'm</p>
            <h2>${n}</h2>
        </div>
        <div class="bento-item profile-pic">
            <img src=${i} alt="Profile Picture">
        </div>
        <div class="bento-item twitter-card">
            <svg class="twitter-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
            </svg>
            <p style="position: absolute; bottom: 1.5rem; text-align: center; width: 100%;">@${x}</p>
        </div>
        <div class="bento-item github-card">
            <img src="https://i.pinimg.com/736x/cf/95/4b/cf954b8923fbafc5cfc0c66344b6a6f9.jpg" alt="GitHub Background">
            <div class="github-link">
                <a href="https://github.com/${g}">@${g}</a>
            </div>
        </div>
        <div class="bento-item music-player">
            <p style="color: #22d3ee; font-size: 0.75rem; margin-bottom: 0.5rem;">Los Angeles</p>
            <p style="font-size: 0.75rem;">The Midnight</p>
            <div class="music-controls">
                <div class="music-control"></div>
                <div class="music-control"></div>
                <div class="music-control"></div>
                <div class="music-control"></div>
                <div class="music-control"></div>
            </div>
        </div>
        <div class="bento-item op-bento">
            <h2>Made using OP Bento</h2>
        </div>
    </div>
</body>
</html>
  `;

    try {
        const browser = await puppeteer.launch({headless: false});
        const page = await browser.newPage();
        await page.setContent(html, { waitUntil: "networkidle0" });
        const screenshot = await page.screenshot({ type: "png" });
        await browser.close();

        return new NextResponse(screenshot, {
            headers: {
                "Content-Type": "image/png",
                "Content-Disposition": 'inline; filename="bento.png"',
            },
        });
    } catch (error) {
        console.error("Error generating image:", error);
        return new NextResponse("Error generating image", { status: 500 });
    }
}
