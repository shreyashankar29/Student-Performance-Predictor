import { useState, useEffect } from "react";

function Overview() {

  // ---------------- STATES ----------------

  const [attendance, setAttendance] = useState("");
  const [averageMarks, setAverageMarks] = useState("");
  const [studyHours, setStudyHours] = useState("");
  const [assignmentsCompleted, setAssignmentsCompleted] = useState("");
  const [sleepHours, setSleepHours] = useState("");
  const [stressLevel, setStressLevel] = useState("");
  const [deadlinesMissed, setDeadlinesMissed] = useState("");
  const [screenTime, setScreenTime] = useState("");

  const [riskLevel, setRiskLevel] = useState("");
  const [gpa, setGpa] = useState("");
  const [history, setHistory] = useState([]);

  // ---------------- FETCH HISTORY ----------------

  const fetchHistory = async () => {

    try {

      const res = await fetch("http://localhost:8000/history", {

        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },

      });

      const data = await res.json();

      setHistory(data.history || []);

    }

    catch (error) {

      console.log(error);

    }

  };

  // ---------------- LOAD HISTORY ----------------

  useEffect(() => {

    fetchHistory();

  }, []);

  // ---------------- PREDICT FUNCTION ----------------

  const handlePredict = async () => {

    try {

      const res = await fetch("http://localhost:8000/predict", {

        method: "POST",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },


        body: JSON.stringify({
          attendance: Number(attendance),
          average_marks: Number(averageMarks),
          study_hours: Number(studyHours),
          assignments_completed: Number(assignmentsCompleted),
          sleep_hours: Number(sleepHours),
          stress_level: Number(stressLevel),
          deadlines_missed: Number(deadlinesMissed),
          screen_time: Number(screenTime),
        }),

      });

      const data = await res.json();

      setRiskLevel(data.risk_level);
      setGpa(data.gpa);

      fetchHistory();

    }

    catch (error) {

      console.log(error);

    }

  };

  // ---------------- UI ----------------

  return (

    <div
      id="overview"
      style={{
        width: "100%",
        padding: "20px 30px",
        boxSizing: "border-box",
        color: "white",
      }}
    >

      {/* ---------- TITLE ---------- */}

      <h1
        style={{
          fontSize: "42px",
          marginBottom: "20px",
        }}
      >
        Overview
      </h1>

      {/* ================================================= */}
      {/* TOP SECTION */}
      {/* ================================================= */}

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "stretch",
        }}
      >

        {/* ================================================= */}
        {/* INPUT PANEL */}
        {/* ================================================= */}

        <div
          style={{
            flex: 2,
            background: "#1e293b",
            padding: "22px",
            borderRadius: "18px",
          }}
        >

          <h2
            style={{
              marginBottom: "22px",
              textAlign: "center",
              fontSize: "28px",
            }}
          >
            Enter Student Details
          </h2>

          {/* ---------- GRID ---------- */}

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "16px",
            }}
          >

            {/* Attendance */}

            <div>
              <label style={labelStyle}>Attendance (%)</label>

              <input
                type="number"
                placeholder="Enter attendance"
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Average Marks */}

            <div>
              <label style={labelStyle}>Average Marks</label>

              <input
                type="number"
                placeholder="Enter marks"
                value={averageMarks}
                onChange={(e) => setAverageMarks(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Study Hours */}

            <div>
              <label style={labelStyle}>Study Hours</label>

              <input
                type="number"
                placeholder="Hours per day"
                value={studyHours}
                onChange={(e) => setStudyHours(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Sleep Hours */}

            <div>
              <label style={labelStyle}>Sleep Hours</label>

              <input
                type="number"
                placeholder="Sleep duration"
                value={sleepHours}
                onChange={(e) => setSleepHours(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Assignments */}

            <div>
              <label style={labelStyle}>Assignments Completed</label>

              <input
                type="number"
                placeholder="Assignments completed"
                value={assignmentsCompleted}
                onChange={(e) => setAssignmentsCompleted(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Stress */}

            <div>
              <label style={labelStyle}>Stress Level</label>

              <input
                type="number"
                placeholder="Stress level"
                value={stressLevel}
                onChange={(e) => setStressLevel(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Deadlines */}

            <div>
              <label style={labelStyle}>Deadlines Missed</label>

              <input
                type="number"
                placeholder="Missed deadlines"
                value={deadlinesMissed}
                onChange={(e) => setDeadlinesMissed(e.target.value)}
                style={inputStyle}
              />
            </div>

            {/* Screen Time */}

            <div>
              <label style={labelStyle}>Screen Time</label>

              <input
                type="number"
                placeholder="Screen time in hours"
                value={screenTime}
                onChange={(e) => setScreenTime(e.target.value)}
                style={inputStyle}
              />
            </div>

          </div>

          {/* ---------- BUTTON ---------- */}

          <button
            onClick={handlePredict}
            style={buttonStyle}
          >
            Predict Performance
          </button>

        </div>

        {/* ================================================= */}
        {/* RIGHT PANEL */}
        {/* ================================================= */}

        <div
          style={{
            width: "340px",
            display: "flex",
            flexDirection: "column",
            gap: "20px",
          }}
        >

          {/* ---------- RESULT CARD ---------- */}

          <div
            style={{
              background: "#0f172a",
              padding: "22px",
              borderRadius: "18px",
              textAlign: "center",
              minHeight: "220px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >

            <h2
              style={{
                fontSize: "24px",
                marginBottom: "14px",
              }}
            >
              AI Prediction
            </h2>

            <p
              style={{
                fontSize: "28px",
                fontWeight: "bold",

                color:
                  riskLevel === "High"
                    ? "#ef4444"
                    : riskLevel === "Medium"
                    ? "#facc15"
                    : "#22c55e",
              }}
            >
              {riskLevel ? `${riskLevel} Risk` : "No Prediction Yet"}
            </p>

            <p
              style={{
                marginTop: "12px",
                fontSize: "22px",
                fontWeight: "600",
                color: "#38bdf8",
              }}
            >
              {gpa ? `Predicted GPA: ${gpa}` : ""}
            </p>

          </div>

          {/* ---------- QUICK SUMMARY ---------- */}

          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "18px",
            }}
          >

            <h2
              style={{
                marginBottom: "16px",
                fontSize: "22px",
              }}
            >
              Quick Summary
            </h2>

            <div style={summaryStyle}>
              <span>Attendance</span>
              <span>{attendance >= 75 ? "Good" : "Low"}</span>
            </div>

            <div style={summaryStyle}>
              <span>Study Hours</span>
              <span>{studyHours >= 4 ? "Consistent" : "Needs Focus"}</span>
            </div>

            <div style={summaryStyle}>
              <span>Sleep</span>
              <span>{sleepHours >= 6 ? "Healthy" : "Low"}</span>
            </div>

            <div style={summaryStyle}>
              <span>Stress</span>
              <span>{stressLevel >= 7 ? "High" : "Moderate"}</span>
            </div>

          </div>

          {/* ---------- RECENT PREDICTIONS ---------- */}

          <div
            style={{
              background: "#1e293b",
              padding: "20px",
              borderRadius: "18px",
            }}
          >

            <h2
              style={{
                marginBottom: "16px",
                fontSize: "22px",
              }}
            >
              Recent Predictions
            </h2>

            {history.length === 0 ? (

              <p style={{ color: "#94a3b8" }}>
                No predictions yet
              </p>

            ) : (

              history.map((item, index) => (

                <div
                  key={index}
                  style={{
                    background: "#0f172a",
                    padding: "14px",
                    borderRadius: "12px",
                    marginBottom: "12px",
                  }}
                >

                  <p
                    style={{
                      fontSize: "17px",
                      fontWeight: "bold",
                      marginBottom: "6px",

                      color:
                        item.risk_level === "High"
                          ? "#ef4444"
                          : item.risk_level === "Medium"
                          ? "#facc15"
                          : "#22c55e",
                    }}
                  >
                    {item.risk_level} Risk
                  </p>

                  <p
                    style={{
                      fontSize: "15px",
                      marginBottom: "6px",
                      color: "#38bdf8",
                    }}
                  >
                    GPA: {item.gpa}
                  </p>

                  <p
                    style={{
                      color: "#94a3b8",
                      fontSize: "13px",
                    }}
                  >
                    {new Date(item.date).toLocaleString()}
                  </p>

                </div>

              ))

            )}

          </div>

        </div>

      </div>

    </div>

  );
}

// ---------------- STYLES ----------------

const labelStyle = {
  display: "block",
  marginBottom: "6px",
  fontSize: "14px",
  fontWeight: "600",
};

const inputStyle = {
  width: "100%",
  padding: "12px",
  borderRadius: "10px",
  border: "none",
  background: "#334155",
  color: "white",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
};

const buttonStyle = {
  marginTop: "20px",
  width: "100%",
  padding: "14px",
  borderRadius: "12px",
  border: "none",
  background: "#2563eb",
  color: "white",
  fontSize: "17px",
  fontWeight: "bold",
  cursor: "pointer",
};

const summaryStyle = {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: "14px",
  fontSize: "15px",
};

export default Overview;