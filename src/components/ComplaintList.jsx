import { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/complaints", {
        headers: { Authorization: localStorage.getItem("token") }
      });
      setComplaints(res.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const voteComplaint = async (id, voteType) => {
    if (!user) {
      alert("You must be logged in to vote!");
      return;
    }

    try {
      await axios.post(
        `http://localhost:5000/api/complaints/${id}/vote`,
        { vote: voteType },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      fetchComplaints(); // Refresh list after voting
    } catch (err) {
      alert(err.response?.data?.message || "Failed to vote");
    }
  };

  const resolveComplaint = async (id) => {
    if (!user) {
      alert("You must be logged in to resolve complaints!");
      return;
    }

    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${id}/resolve`,
        {},
        { headers: { Authorization: localStorage.getItem("token") } }
      );
      fetchComplaints(); // Refresh complaints list
      alert("Complaint resolved! You earned 10 karma points.");
    } catch (err) {
      alert(err.response?.data?.message || "Failed to resolve complaint");
    }
  };

  return (
    <div className="mt-4 p-4">
      <h2 className="text-xl font-bold">Complaints</h2>
      {complaints.map((c) => (
        <div key={c._id} className="p-4 bg-gray-100 rounded my-2 shadow-md">
          <h3 className="font-bold text-indigo-700">{c.title}</h3>
          <p>{c.description}</p>
          <p className="text-sm">Votes: {c.votes}</p>
          <p className="text-sm">Status: {c.status}</p>

          {/* Voting Buttons */}
          {user && (
            <div className="flex gap-2 mt-2">
              <button
                onClick={() => voteComplaint(c._id, "up")}
                className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
              >
                👍 Upvote
              </button>
              <button
                onClick={() => voteComplaint(c._id, "down")}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
              >
                👎 Downvote
              </button>
            </div>
          )}

          {/* Display Punishment if Assigned */}
          {c.punishment && (
            <div className="mt-2 p-3 bg-red-200 border-l-4 border-red-600 text-red-700">
              <p className="text-sm font-bold">⚠ Punishment Assigned:</p>
              <p>{c.punishment}</p>
            </div>
          )}

          {/* Resolve Complaint Button - Only for Active Complaints */}
          {c.status === "Active" && user && (
            <button
              onClick={() => resolveComplaint(c._id)}
              className="bg-blue-500 text-white px-3 py-1 rounded mt-2 hover:bg-blue-600"
            >
              ✅ Mark as Resolved
            </button>
          )}
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;
