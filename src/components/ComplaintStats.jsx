import { useEffect, useState } from "react";
import axios from "axios";

const ComplaintStats = () => {
  const [stats, setStats] = useState([]);

  useEffect(() => {
    fetchComplaintStats();
  }, []);

  const fetchComplaintStats = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaints/stats", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      setStats(res.data);
    } catch (err) {
      console.error("Error fetching complaint stats:", err);
    }
  };

  return (
    <div className="p-4 bg-blue-200 rounded-lg shadow-md">
      <h2 className="text-lg font-bold text-blue-700">📊 Most Common Complaints</h2>
      {stats.length > 0 ? (
        <ul className="mt-2">
          {stats.map((entry, index) => (
            <li key={index} className="text-blue-600 font-semibold">
              {index + 1}. {entry._id} - {entry.count} Complaints
            </li>
          ))}
        </ul>
      ) : (
        <p>No complaint data available.</p>
      )}
    </div>
  );
};

export default ComplaintStats;
