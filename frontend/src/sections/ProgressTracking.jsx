function ProgressTracking() {
  return (
    <div id="progress" style={{ marginBottom: "80px", minHeight: "100vh" }}>
      <h2>Progress Tracking</h2>

      <div style={boxStyle}>
        📈 Progress graph will go here
      </div>
    </div>
  );
}

const boxStyle = {
  background: "#1e293b",
  padding: "40px",
  borderRadius: "10px",
  color: "white",
  marginTop: "20px",
};

export default ProgressTracking;