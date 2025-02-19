import { useEffect, useState } from "react";
import axios from "axios";

const ComplaintList = () => {
  const [complaints, setComplaints] = useState([]);

  useEffect(() => {
    axios.get("/api/complaints", {
      headers: { Authorization: localStorage.getItem("token") }
    }).then((res) => setComplaints(res.data));
  }, []);

  return (
    <div>
      <h2>Complaints</h2>
      {complaints.map((c) => (
        <div key={c._id}>
          <h3>{c.title}</h3>
          <p>{c.description}</p>
          <p>Votes: {c.votes}</p>
        </div>
      ))}
    </div>
  );
};

export default ComplaintList;
