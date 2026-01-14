import React from "react";
import { Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { TrendingUp } from "lucide-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const MoodTracker = ({ moodData = [] }) => {
  const recentMoods = moodData.slice(0, 7).reverse();

  const moodToValue = (mood) => {
    switch (mood) {
      case "happy": return 3;
      case "neutral": return 2;
      case "sad": return 1;
      default: return 2;
    }
  };

  const moodToEmoji = (mood) => {
    switch (mood) {
      case "happy": return "😊";
      case "neutral": return "😐";
      case "sad": return "😢";
      default: return "😐";
    }
  };

  const data = {
    labels: recentMoods.map((entry) => 
      new Date(entry.date).toLocaleDateString("en-US", { weekday: "short" })
    ),
    datasets: [
      {
        label: "Mood",
        data: recentMoods.map((entry) => moodToValue(entry.mood)),
        borderColor: "#8b5cf6",
        backgroundColor: "rgba(139, 92, 246, 0.1)",
        fill: true,
        tension: 0.4,
        pointBackgroundColor: "#8b5cf6",
        pointBorderColor: "white",
        pointBorderWidth: 2,
        pointRadius: 5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      y: {
        min: 0.5,
        max: 3.5,
        ticks: {
          stepSize: 1,
          callback: (value) => ({ 1: "😢", 2: "😐", 3: "😊" }[value] || ""),
          color: "rgba(255,255,255,0.5)",
        },
        grid: { color: "rgba(255,255,255,0.05)" },
      },
      x: {
        ticks: { color: "rgba(255,255,255,0.5)" },
        grid: { display: false },
      },
    },
  };

  const totalEntries = moodData.length;
  const happyCount = moodData.filter(m => m.mood === "happy").length;
  const happyPercent = totalEntries > 0 ? Math.round((happyCount / totalEntries) * 100) : 0;

  // Styles
  const cardStyle = {
    background: "rgba(255,255,255,0.05)",
    borderRadius: "12px",
    padding: "16px",
    border: "1px solid rgba(255,255,255,0.1)",
    marginBottom: "12px",
  };

  const headerStyle = {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
    fontSize: "14px",
    fontWeight: "500",
  };

  const statsRowStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const pillStyle = {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    background: "rgba(255,255,255,0.05)",
    marginRight: "8px",
    marginBottom: "8px",
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      {/* Chart Card */}
      <div style={cardStyle}>
        <div style={headerStyle}>
          <TrendingUp size={16} color="#8b5cf6" />
          <span>Mood Trend</span>
        </div>
        {moodData.length > 0 ? (
          <div style={{ height: "120px" }}>
            <Line data={data} options={options} />
          </div>
        ) : (
          <div style={{ height: "120px", display: "flex", alignItems: "center", justifyContent: "center", color: "rgba(255,255,255,0.5)", fontSize: "14px" }}>
            Track your mood to see trends!
          </div>
        )}
      </div>

      {/* Stats Card */}
      <div style={cardStyle}>
        <div style={statsRowStyle}>
          <div>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Happy Days</p>
            <p style={{ fontSize: "24px", fontWeight: "bold", color: "#22c55e" }}>{happyPercent}%</p>
          </div>
          <div style={{ textAlign: "right" }}>
            <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.5)" }}>Total Entries</p>
            <p style={{ fontSize: "24px", fontWeight: "bold" }}>{totalEntries}</p>
          </div>
        </div>
      </div>

      {/* Recent Moods */}
      {moodData.length > 0 && (
        <div style={cardStyle}>
          <p style={{ fontSize: "14px", fontWeight: "500", marginBottom: "12px" }}>Recent</p>
          <div style={{ display: "flex", flexWrap: "wrap" }}>
            {moodData.slice(0, 5).map((entry, i) => (
              <span key={entry._id || i} style={pillStyle}>
                {moodToEmoji(entry.mood)}
                <span style={{ color: "rgba(255,255,255,0.5)" }}>
                  {new Date(entry.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default MoodTracker;
