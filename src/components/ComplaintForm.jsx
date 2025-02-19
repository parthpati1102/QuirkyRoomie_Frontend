import { useState } from "react";
import axios from "axios";

const ComplaintForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submitComplaint = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/complaints", { title, description }, {
        headers: { Authorization: localStorage.getItem("token") }
      });
      alert("Complaint submitted!");
    } catch (err) {
      alert("Error submitting complaint");
    }
  };

  return (
    <form onSubmit={submitComplaint}>
      <input type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <textarea placeholder="Description" onChange={(e) => setDescription(e.target.value)} />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ComplaintForm;
