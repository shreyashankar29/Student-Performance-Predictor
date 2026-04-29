function Sidebar() {
  return (
    <div
      style={{
        width: "220px",
        background: "#1e293b",
        color: "white",
        padding: "20px",
        position: "fixed",
        height: "100vh",
      }}
    >
      <h3>Menu</h3>
      <ul style={{ listStyle: "none", padding: 0 }}>
        <li><a href="#overview" style={{ color: "white" }}>Overview</a></li>
        <li><a href="#insights" style={{ color: "white" }}>Insights</a></li>
        <li><a href="#recommendations" style={{ color: "white" }}>Recommendations</a></li>
        <li><a href="#planner" style={{ color: "white" }}>Planner</a></li>
        <li><a href="#progress" style={{ color: "white" }}>Progress</a></li>
      </ul>
    </div>
  );
}

export default Sidebar;