import React from "react";
import { Line } from "react-chartjs-2";

const MoodTracker = ({ moodData = [] }) => {
  const data = {
    labels: moodData.map((entry) => new Date(entry.date).toLocaleDateString()),
    datasets: [
      {
        label: "Mood Trend",
        data: moodData.map((entry) =>
          entry.mood === "happy" ? 2 : entry.mood === "neutral" ? 1 : 0
        ),
        borderColor: "#4a90e2",
      },
    ],
  };

  return (
    <div className="mood-tracker">
      <h3>Mood History</h3>
      {moodData.length > 0 ? (
        <Line data={data} />
      ) : (
        <p>No mood data available. Start tracking your mood!</p>
      )}
    </div>
  );
};

export default MoodTracker;
