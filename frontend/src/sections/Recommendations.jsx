function Recommendations() {
  return (
    <div id="recommendations" style={{ marginBottom: "80px", minHeight: "100vh" }}>
      <h2>Recommendations</h2>

      <div style={boxStyle}>
        Improve attendance to 90% for better prediction
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

export default Recommendations;