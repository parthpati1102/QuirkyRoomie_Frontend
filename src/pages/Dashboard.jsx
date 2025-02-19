import ComplaintForm from "../components/ComplaintForm";
import ComplaintList from "../components/ComplaintList";

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <ComplaintForm />
      <ComplaintList />
    </div>
  );
};

export default Dashboard;
