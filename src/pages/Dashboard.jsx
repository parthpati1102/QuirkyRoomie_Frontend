import ComplaintForm from "../components/ComplaintForm";
import ComplaintList from "../components/ComplaintList";
import TopComplaint from "../components/TopComplaint";
import BestFlatmate from "../components/BestFlatmate";
import Leaderboard from "../components/Leaderboard";
import ComplaintStats from "../components/ComplaintStats";

const Dashboard = () => {
  return (
    <div className="p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
        Welcome to Your Dashboard 🎉
      </h1>

      {/* Flatmate Problem of the Week */}
      <div className="mb-6">
        <TopComplaint />
      </div>

      {/* Best Flatmate of the Month */}
      <div className="max-w-2xl mx-auto mb-6">
        <BestFlatmate />
      </div>

      {/* Leaderboard & Complaint Stats */}
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Leaderboard />
        <ComplaintStats />
      </div>

      {/* Complaint Form */}
      <div className="max-w-3xl mx-auto bg-white p-6 shadow-lg rounded-lg mb-6">
        <ComplaintForm />
      </div>

      {/* Complaint List */}
      <div className="max-w-4xl mx-auto bg-white p-6 shadow-lg rounded-lg">
        <ComplaintList />
      </div>
    </div>
  );
};

export default Dashboard;
