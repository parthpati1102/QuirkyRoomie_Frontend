import { useEffect, useState } from "react";
import axios from "axios";

const BestFlatmate = () => {
  const [bestFlatmate, setBestFlatmate] = useState(null);

  useEffect(() => {
    fetchBestFlatmate();
  }, []);

  const fetchBestFlatmate = async () => {
    try {
      const res = await axios.get("https://quirkyroomie-backend.onrender.com/api/complaints/best-flatmate", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      setBestFlatmate(res.data);
    } catch (err) {
      console.error("Error fetching best flatmate:", err);
    }
  };

  return (
    <div className="p-4 bg-blue-200 rounded-lg shadow-md">
      <h2 className="text-lg font-bold">🏆 Best Flatmate of the Month</h2>
      {bestFlatmate ? (
        <p>{bestFlatmate.name} - {bestFlatmate.karmaPoints} Karma Points</p>
      ) : (
        <p>No best flatmate yet.</p>
      )}
    </div>
  );
};

export default BestFlatmate;
