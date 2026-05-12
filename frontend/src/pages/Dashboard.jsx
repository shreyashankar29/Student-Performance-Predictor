import Sidebar from "../components/Sidebar";
import Overview from "../sections/Overview";
import Insights from "../sections/Insights";
import Recommendations from "../sections/Recommendations";
import AdaptivePlanner from "../sections/AdaptivePlanner";
import ProgressTracking from "../sections/ProgressTracking";

function Dashboard() {
  return (
    <div style={{ display: "flex" }}>
      
      <Sidebar />

      <div
      style={{
        marginLeft: "240px",
        padding: "20px",
        minheight: "100vh",
        overflowY: "auto",
        }}
        >
        <Overview />
        <Insights />
        <Recommendations />
        <AdaptivePlanner />
        <ProgressTracking />
      </div>

    </div>
  );
}

export default Dashboard;
