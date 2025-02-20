import { useEffect, useState } from "react";
import axios from "axios";

const TopComplaint = () => {
  const [topComplaint, setTopComplaint] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTopComplaint();
  }, []);

  const fetchTopComplaint = async () => {
    try {
      const res = await axios.get("https://quirkyroomie-backend.onrender.com/api/complaints/trending", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      setTopComplaint(res.data);
    } catch (err) {
      console.error("Error fetching top complaint:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-4 bg-yellow-200 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">🏆 Flatmate Problem of the Week</h2>
      {loading ? (
        <p>Loading...</p>
      ) : topComplaint ? (
        <div>
          <h3 className="font-bold text-indigo-700">{topComplaint.title}</h3>
          <p>{topComplaint.description}</p>
          <p className="text-sm font-semibold">Votes: {topComplaint.votes}</p>
          <p className="text-sm text-gray-600">Filed by: {topComplaint.user?.name}</p>
        </div>
      ) : (
        <p>No trending complaints this week!</p>
      )}
    </div>
  );
};

export default TopComplaint;
