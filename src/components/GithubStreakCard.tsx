import React from "react";
import { Calendar, Flame, Trophy } from "lucide-react";
import { StreakStats } from "@/types";

export default function GitHubStreakCard({
  streak,
}: {
  streak: StreakStats | undefined;
}) {
  if (!streak) {
    return null;
  }

  const {
    currentStreak,
    currentStreakStartDate,
    currentStreakEndDate,
    longestStreak,
    longestStreakStartDate,
    longestStreakEndDate,
    totalContributions,
    firstDateofContribution,
  } = streak;

  return (
    <div className="max-w-xl size-full rounded-xl">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 size-full">
        <div className="flex size-full flex-col space-y-4">
          <div className="bg-secondary/80 rounded-lg p-4 h-full flex flex-col items-center justify-center">
            <Calendar className="w-8 h-8 mb-2 text-blue-400" />
            <h3 className="text-sm font-medium text-gray-400">
              Total Contributions
            </h3>
            <p className="text-3xl font-bold text-blue-400">
              {totalContributions}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {firstDateofContribution
                ? firstDateofContribution + "- Present"
                : "No contributions yet"}
            </p>
          </div>
          <div className="rounded-lg bg-secondary/80 p-4 h-full flex flex-col items-center justify-center">
            <Trophy className="w-8 h-8 mb-2 text-yellow-400" />
            <h3 className="text-sm font-medium text-gray-400">
              Longest Streak
            </h3>
            <p className="text-3xl font-bold text-yellow-400">
              {longestStreak}
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {longestStreakStartDate && longestStreakEndDate
                ? longestStreakStartDate + " - " + longestStreakEndDate
                : "No streak yet"}
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r to-orange-800/10 from-orange-800/10 via-muted/10 rounded-lg p-6 flex flex-col items-center justify-center relative">
          <Flame className="w-28 h-28 mb-4 text-orange-600 glow-orange rounded-full p-4" />
          <h3 className="text-lg font-medium text-gray-400">Current Streak</h3>
          <p className="text-6xl font-bold text-orange-600 my-4">
            {currentStreak}
          </p>
          <p className="text-sm text-gray-500">
            {currentStreakStartDate && currentStreakEndDate
              ? currentStreakStartDate + " - " + currentStreakEndDate
              : new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
