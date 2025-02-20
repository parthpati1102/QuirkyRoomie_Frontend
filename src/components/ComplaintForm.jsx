"use client"

import { useState } from "react"
import axios from "axios"

const ComplaintForm = ({ onComplaintAdded }) => {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [type, setType] = useState("Noise")
  const [severity, setSeverity] = useState("Mild")

  const submitComplaint = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://quirkyroomie-backend.onrender.com/api/complaints",
        { title, description, type, severity },
        { headers: { Authorization: localStorage.getItem("token") } }
      );
  
      alert("Complaint submitted!"); // Show success alert only on success
  
      if (onComplaintAdded) {
        onComplaintAdded(); // Refresh complaints list
      }
    } catch (err) {
      alert("Error submitting complaint"); // This will now ONLY show if an error occurs
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 pt-16 px-4">
      <form onSubmit={submitComplaint} className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl space-y-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">Submit a Complaint</h2>

        <div className="space-y-2">
          <label htmlFor="title" className="text-sm font-medium text-gray-700">
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter complaint title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            required
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="description" className="text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            placeholder="Describe your complaint"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            rows={4}
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="type" className="text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Noise">Noise</option>
              <option value="Cleanliness">Cleanliness</option>
              <option value="Bills">Bills</option>
              <option value="Pets">Pets</option>
            </select>
          </div>

          <div className="space-y-2">
            <label htmlFor="severity" className="text-sm font-medium text-gray-700">
              Severity
            </label>
            <select
              id="severity"
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Mild">Mild</option>
              <option value="Annoying">Annoying</option>
              <option value="Major">Major</option>
              <option value="Nuclear">Nuclear</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
          Submit Complaint
        </button>

        <p className="text-xs text-gray-500 flex items-center justify-center mt-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
              clipRule="evenodd"
            />
          </svg>
          Your complaint will be reviewed by our team
        </p>
      </form>
    </div>
  )
}

export default ComplaintForm

