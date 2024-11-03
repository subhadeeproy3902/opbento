
import * as fs from "fs/promises";

interface BentoResponse {
  url: string;
}

export class BentoStatsUpdater {
  private readonly apiUrl: string;
  private readonly readmePath: string;

  constructor(
    apiUrl: string,
    readmePath = "README.md"
  ) {
    this.apiUrl = apiUrl;
    this.readmePath = readmePath;
  }

  async fetchBentoUrl(): Promise<string> {
    try {
      const response = await fetch(this.apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: BentoResponse = await response.json();
      return data.url;
    } catch (error) {
      console.error("Error fetching Bento URL:", error);
      throw error;
    }
  }

  async checkUrlChange(newUrl: string): Promise<boolean> {
    try {
      const fileExists = await fs
        .access(this.lastUrlFile)
        .then(() => true)
        .catch(() => false);

      if (fileExists) {
        const lastUrl = await fs.readFile(this.lastUrlFile, "utf-8");
        if (lastUrl.trim() === newUrl) {
          console.log("No changes detected in the image URL.");
          return false;
        }
      }

      await fs.writeFile(this.lastUrlFile, newUrl);
      return true;
    } catch (error) {
      console.error("Error checking URL change:", error);
      throw error;
    }
  }

  async updateReadme(imageUrl: string): Promise<void> {
    try {
      // Delete existing README if it exists
      try {
        await fs.unlink(this.readmePath);
      } catch (error) {
        // Ignore if file doesn't exist
      }

      // Create new README
      const content = `# Bento GitHub Stats\n![Bento GitHub Stats](${imageUrl})`;
      await fs.writeFile(this.readmePath, content);
      console.log("Created new README.md with the latest image URL.");
    } catch (error) {
      console.error("Error updating README:", error);
      throw error;
    }
  }

  async run(): Promise<void> {
    try {
      const newUrl = await this.fetchBentoUrl();
      const hasChanged = await this.checkUrlChange(newUrl);

      if (hasChanged) {
        await this.updateReadme(newUrl);
        return;
      }

      console.log("No updates needed.");
    } catch (error) {
      console.error("Error running Bento stats update:", error);
      throw error;
    }
  }
}

// Run if called directly
if (require.main === module) {
  const updater = new BentoStatsUpdater(apiUrl);
  updater.run();
}
