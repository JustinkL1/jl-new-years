import "./index.css";

function OldYear({ timeLeft }) {
  return (
    <div className="old-year-container">
      {timeLeft.days >= 0 && (
        <div className="countdown">
          {timeLeft.months} {timeLeft.months === 1 ? "Month" : "Months"},{" "}
          {timeLeft.days} {timeLeft.days === 1 ? "Day" : "Days"} <br />
          {timeLeft.hours.toString().padStart(2, "0")}:
          {timeLeft.minutes.toString().padStart(2, "0")}:
          {timeLeft.seconds.toString().padStart(2, "0")}
        </div>
      )}
      <div className="old-year-text">2024</div>
    </div>
  );
}

export default OldYear;
