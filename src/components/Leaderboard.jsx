import { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const res = await axios.get("https://quirkyroomie-backend.onrender.com/api/complaints/leaderboard", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      setLeaderboard(res.data);
    } catch (err) {
      console.error("Error fetching leaderboard:", err);
    }
  };

  return (
    <div className="p-4 bg-red-200 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-red-700">⚠ Flatmates with Most Complaints</h2>
      {leaderboard.length > 0 ? (
        <ul className="mt-2">
          {leaderboard.map((entry, index) => (
            <li key={index} className="text-red-600 font-semibold">
              {index + 1}. {entry.name} - {entry.complaintsCount} Complaints
            </li>
          ))}
        </ul>
      ) : (
        <p>No complaints filed yet.</p>
      )}
    </div>
  );
};

export default Leaderboard;
