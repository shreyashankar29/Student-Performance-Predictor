function AdaptivePlanner() {
  return (
    <div id="planner" style={{ marginBottom: "80px", minHeight: "100vh" }}>
      <h2>Adaptive Planner</h2>

      <div style={boxStyle}>
        What if you study 2 more hours daily?
      </div>
    </div>
  );
}

const boxStyle = {
  background: "#1e293b",
  padding: "20px",
  borderRadius: "10px",
  color: "white",
  marginTop: "20px",
};

export default AdaptivePlanner;