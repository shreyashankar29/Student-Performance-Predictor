function Insights() {
  return (
    <div id="insights" style={{ marginBottom: "80px", minHeight: "100vh" }}>
      <h2>Insights</h2>

      <div style={boxStyle}>
        📊 Chart will go here
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

export default Insights;