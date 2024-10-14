import { NextRequest, NextResponse } from "next/server";
import fetchUserData from "@/actions/fetchUserData";
import puppeteer from "puppeteer";
import { UserStats } from "@/types";
import { Buffer } from 'buffer';

// The API handler
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get("username");

  if (!username) {
    return NextResponse.json({ error: "Username is required" }, { status: 400 });
  }

  try {
    const { userStats } = await fetchUserData(username);

    // Now generate the HTML with stats
    const htmlContent = generateHtml(userStats, username);

    // Use Puppeteer to take a screenshot of the HTML
    const imageBuffer = await htmlToImage(htmlContent);

    return new Response(imageBuffer, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}

// Generate HTML instead of SVG
const generateHtml = (stats: UserStats, username: string) => {
  const {
    'Star Earned': stars,
    Commits: commits,
    'Pull Requests': prs,
    Issues: issues,
    'Contributed To': contributedTo,
  } = stats;

  return `
    <html>
      <body style="background-color: #1e1e2e; color: #cdd6f4; font-family: Arial, sans-serif;">
        <div style="padding: 20px;">
          <h2>${username}'s GitHub Stats</h2>
          <div style="display: flex; flex-wrap: wrap;">
            <div style="width: 200px; padding: 10px; background-color: #313244; margin: 10px; border-radius: 10px;">
              <h3>Stars</h3>
              <p style="font-size: 24px; color: #f9e2af;">${stars}</p>
            </div>
            <div style="width: 200px; padding: 10px; background-color: #313244; margin: 10px; border-radius: 10px;">
              <h3>Commits</h3>
              <p style="font-size: 24px; color: #94e2d5;">${commits}</p>
            </div>
            <div style="width: 200px; padding: 10px; background-color: #313244; margin: 10px; border-radius: 10px;">
              <h3>PRs</h3>
              <p style="font-size: 24px; color: #f38ba8;">${prs}</p>
            </div>
            <div style="width: 200px; padding: 10px; background-color: #313244; margin: 10px; border-radius: 10px;">
              <h3>Issues</h3>
              <p style="font-size: 24px; color: #fab387;">${issues}</p>
            </div>
            <div style="width: 200px; padding: 10px; background-color: #313244; margin: 10px; border-radius: 10px;">
              <h3>Contributed To</h3>
              <p style="font-size: 24px; color: #a6e3a1;">${contributedTo}</p>
            </div>
          </div>
        </div>
      </body>
    </html>
  `;
};

// Convert HTML to image using Puppeteer
const htmlToImage = async (html: string): Promise<Buffer> => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  // Set the content of the page to be the HTML
  await page.setContent(html);

  // Screenshot the page and convert Uint8Array to Buffer
  const screenshotBuffer = await page.screenshot({ fullPage: true });
  const buffer = Buffer.from(screenshotBuffer);

  await browser.close();

  return buffer;
};
