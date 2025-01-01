import "./index.css";

function OldYear({ timeLeft }) {
  return (
    <div className="old-year-container">
      {timeLeft.days < 364 && (
        <div className="countdown">
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
