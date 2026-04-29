function Overview() {
  return (
    <div id="overview" style={{ marginBottom: "80px", minHeight: "100vh" }}>
      <h2>Overview</h2>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        
        <div style={cardStyle}>
          <h3>Attendance</h3>
          <p>85%</p>
        </div>

        <div style={cardStyle}>
          <h3>Avg Marks</h3>
          <p>78</p>
        </div>

        <div style={cardStyle}>
          <h3>Study Hours</h3>
          <p>4 hrs/day</p>
        </div>

      </div>
    </div>
  );
}

const cardStyle = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  color: "white",
  width: "200px",
};

export default Overview;