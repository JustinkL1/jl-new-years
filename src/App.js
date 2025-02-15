import { useState, useEffect } from "react";
import NewYear from "./components/NewYear";
import OldYear from "./components/OldYear";
import "./App.css";

function App() {
  const [isNewYear, setIsNewYear] = useState(false);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const now = new Date();
    const nextYear = new Date(now.getFullYear() + 1, 0, 1, 0, 0, 0);

    const diff = nextYear - now;

    const daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    return { days: daysLeft, nextYear: nextYear.getFullYear(), hours, minutes, seconds };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.days > 364) {
        clearInterval(timer);
        setTimeLeft(calculateTimeLeft());
       
      }
      if(newTimeLeft.days === 364){
        setIsNewYear(true);
        return;
      }

      if (
        (newTimeLeft.days === 0 &&
          newTimeLeft.hours === 0 &&
          newTimeLeft.minutes === 0 &&
          newTimeLeft.seconds === 0) ||
        newTimeLeft.days < 0
      ) {
        clearInterval(timer);
        setIsNewYear(true);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="app-container">
      {isNewYear ? <NewYear timeLeft={timeLeft} /> : <OldYear timeLeft={timeLeft} />}
    </div>
  );
}

export default App;
