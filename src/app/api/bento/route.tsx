import { ImageResponse } from "next/og";
import { NextRequest } from "next/server";
import fetchUserData from "@/actions/fetchUserData";
import { fetchContributions } from "@/actions/githubGraphql";
import crypto from "crypto";

export const config = {
  runtime: "edge",
};

// const spaceGrotesk = fetch(
//   new URL("../../public/fonts/SpaceGrotesk-Bold.ttf", import.meta.url)
// ).then((res) => res.arrayBuffer());

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const n = searchParams.get("n");
  const g = searchParams.get("g");
  const i = searchParams.get("i");
  const x = searchParams.get("x");
  const l = searchParams.get("l");
  const s = searchParams.get("s");
  const key = searchParams.get("key");
  const iv = searchParams.get("iv");

  if (!g) {
    return new Response("GitHub username is required", { status: 400 });
  }

  const algorithm = "aes-256-cbc";

  function decrypt(encryptedText: string): string {
    const keyz = Buffer.from(key!, "hex");
    const ivz = Buffer.from(iv!, "hex");

    const decipher = crypto.createDecipheriv(algorithm, keyz, ivz);
    let decrypted = decipher.update(encryptedText, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
  }

  const decryptedSkills: string = decrypt(s!);
  const skillsArray: string[] = decryptedSkills.split(",");

  try {
    const { userStats } = await fetchUserData(g);
    const contributionStats = await fetchContributions(g);
    // const fontData = await spaceGrotesk;

    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#030312",
            padding: "16px",
            fontFamily: "Space Grotesk",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "16px",
              width: "100%",
              maxWidth: "1280px",
              margin: "8px auto 32px auto",
            }}
          >
            {/* Intro Card */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, #22d3ee, #3b82f6, #7c3aed)",
                padding: "24px 32px",
                borderRadius: "8px",
                gridColumn: "span 1",
                display: "flex",
                flexDirection: "column",
                height: "128px",
              }}
            >
              <p style={{ color: "white", fontSize: "20px", margin: "0" }}>
                Hey I'm
              </p>
              <h2
                style={{
                  color: "white",
                  fontSize: "32px",
                  fontWeight: "bold",
                  margin: "8px 0",
                  textTransform: "capitalize",
                }}
              >
                {n}
              </h2>
            </div>

            {/* Profile Image */}
            <div
              style={{
                gridColumn: "span 2",
                gridRow: "span 2",
                borderRadius: "8px",
                overflow: "hidden",
                height: "320px",
              }}
            >
              <img
                src={i}
                alt="Profile"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </div>

            {/* Twitter Card */}
            <div
              style={{
                background: "linear-gradient(135deg, #000000, #1d9bf0)",
                borderRadius: "8px",
                padding: "16px",
                position: "relative",
                height: "150px",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "16px",
                  marginBottom: "24px",
                }}
              >
                @{x}
              </p>
            </div>

            {/* GitHub Card */}
            <div
              style={{
                background:
                  "linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8))",
                borderRadius: "8px",
                gridRow: "span 2",
                position: "relative",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                padding: "24px",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "16px",
                  backgroundColor: "rgba(219, 39, 119, 0.8)",
                  padding: "8px 16px",
                  borderRadius: "6px",
                  marginBottom: "24px",
                }}
              >
                @{g}
              </p>
            </div>

            {/* LinkedIn Card */}
            <div
              style={{
                background: "linear-gradient(135deg, #000000, #0077b5)",
                borderRadius: "8px",
                padding: "16px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <p
                style={{
                  color: "white",
                  fontSize: "16px",
                }}
              >
                @{l}
              </p>
            </div>

            {/* Skills Section */}
            <div
              style={{
                gridColumn: "span 2",
                backgroundColor: "#1f2937",
                borderRadius: "8px",
                padding: "32px",
              }}
            >
              <h1
                style={{
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                  marginBottom: "16px",
                }}
              >
                My Skills
              </h1>
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "8px",
                }}
              >
                {skillsArray.map((skill, index) => (
                  <div
                    key={index}
                    style={{
                      background: "linear-gradient(135deg, #4ade80, #3b82f6)",
                      padding: "4px 8px",
                      borderRadius: "9999px",
                      color: "white",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>

            {/* Stats Grid */}
            <div
              style={{
                gridColumn: "span 4",
                gridRow: "span 2",
                display: "grid",
                gridTemplateColumns: "repeat(4, 1fr)",
                gap: "16px",
              }}
            >
              {/* Stats Left Section */}
              <div
                style={{
                  gridColumn: "span 2",
                  gridRow: "span 2",
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gridTemplateRows: "repeat(3, 1fr)",
                  gap: "16px",
                }}
              >
                {/* Stars Card */}
                <div
                  style={{
                    gridColumn: "span 2",
                    gridRow: "span 2",
                    background:
                      "linear-gradient(135deg, rgba(245, 158, 11, 0.4), transparent)",
                    borderRadius: "12px",
                    padding: "16px",
                    position: "relative",
                  }}
                >
                  <div
                    style={{
                      color: "#fcd34d",
                      fontSize: "64px",
                      fontWeight: "bold",
                      position: "absolute",
                      bottom: "16px",
                      right: "16px",
                    }}
                  >
                    {userStats["Star Earned"]}
                  </div>
                </div>

                {/* PR Card */}
                <div
                  style={{
                    background: "rgba(219, 39, 119, 0.2)",
                    borderRadius: "12px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ color: "#f472b6", fontSize: "14px" }}>
                    PRs
                  </span>
                  <div
                    style={{
                      color: "#f472b6",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {userStats["Pull Requests"]}
                  </div>
                </div>

                {/* Followers Card */}
                <div
                  style={{
                    background: "rgba(239, 68, 68, 0.2)",
                    borderRadius: "12px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ color: "#ef4444", fontSize: "14px" }}>
                    Followers
                  </span>
                  <div
                    style={{
                      color: "#ef4444",
                      fontSize: "32px",
                      fontWeight: "bold",
                    }}
                  >
                    {userStats.Followers}
                  </div>
                </div>

                {/* Commits Card */}
                <div
                  style={{
                    gridColumn: "span 2",
                    gridRow: "span 2",
                    background:
                      "linear-gradient(to top, black, rgba(30, 41, 59, 0.5))",
                    borderRadius: "12px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <span
                    style={{
                      color: "#4ade80",
                      fontSize: "24px",
                      textAlign: "right",
                    }}
                  >
                    Commits
                  </span>
                  <div
                    style={{
                      color: "#4ade80",
                      fontSize: "48px",
                      fontWeight: "bold",
                      textAlign: "right",
                    }}
                  >
                    {userStats.Commits}
                  </div>
                </div>

                {/* Contributed To Card */}
                <div
                  style={{
                    gridColumn: "span 2",
                    background: "rgba(59, 130, 246, 0.1)",
                    borderRadius: "12px",
                    padding: "16px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#93c5fd", fontSize: "14px" }}>
                    Contributed To
                  </span>
                  <div
                    style={{
                      color: "#93c5fd",
                      fontSize: "32px",
                      fontWeight: "bold",
                    }}
                  >
                    {userStats["Contributed To"]}
                  </div>
                </div>
              </div>

              {/* Contribution Stats */}
              <div
                style={{
                  gridColumn: "span 2",
                  gridRow: "span 2",
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                  }}
                >
                  {/* Total Contributions */}
                  <div
                    style={{
                      background:
                        "linear-gradient(135deg, #1e293b, rgba(59, 130, 246, 0.2))",
                      borderRadius: "8px",
                      padding: "16px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ color: "#93c5fd", fontSize: "14px" }}>
                      Total Contributions
                    </span>
                    <div
                      style={{
                        color: "#93c5fd",
                        fontSize: "24px",
                        fontWeight: "bold",
                        margin: "8px 0",
                      }}
                    >
                      {contributionStats.totalContributions}
                    </div>
                    <span style={{ color: "#64748b", fontSize: "12px" }}>
                      {contributionStats.firstDateofContribution} - Present
                    </span>
                  </div>

                  {/* Longest Streak */}
                  <div
                    style={{
                      background:
                        "linear-gradient(to bottom, rgba(234, 179, 8, 0.15), transparent)",
                      borderRadius: "8px",
                      padding: "16px",
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span style={{ color: "#fcd34d", fontSize: "14px" }}>
                      Longest Streak
                    </span>
                    <div
                      style={{
                        color: "#fcd34d",
                        fontSize: "24px",
                        fontWeight: "bold",
                        margin: "8px 0",
                      }}
                    >
                      {contributionStats.longestStreak}
                    </div>
                    <span style={{ color: "#64748b", fontSize: "12px" }}>
                      {contributionStats.longestStreakStartDate} -{" "}
                      {contributionStats.longestStreakEndDate}
                    </span>
                  </div>
                </div>

                {/* Current Streak */}
                <div
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(234, 88, 12, 0.1), rgba(234, 88, 12, 0.1))",
                    borderRadius: "8px",
                    padding: "24px",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <span style={{ color: "#fb923c", fontSize: "18px" }}>
                    Current Streak
                  </span>
                  <div
                    style={{
                      color: "#fb923c",
                      fontSize: "48px",
                      fontWeight: "bold",
                      margin: "16px 0",
                    }}
                  >
                    {contributionStats.currentStreak}
                  </div>
                  <span style={{ color: "#64748b", fontSize: "14px" }}>
                    {contributionStats.currentStreakStartDate} - Present
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1100,
        height: 1200,
        // fonts: [
        //   {
        //     name: "Space Grotesk",
        //     data: fontData,
        //     style: "normal",
        //   },
        // ],
      }
    );
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response("Failed to generate image", { status: 500 });
  }
}
