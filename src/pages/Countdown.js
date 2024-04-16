import React, { useState, useEffect } from "react";
import "./Countdown.css";

const Countdown = () => {
  const [targetDate, setTargetDate] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [counting, setCounting] = useState(false);
  const [isOver, setIsOver] = useState(false);
  const [isMoreThan100Days, setIsMoreThan100Days] = useState(false);

  useEffect(() => {
    if (counting && countdown <= 0) {
      setIsOver(true);
      setCountdown(0); 
      stopCountdown();
    }
  }, [counting, countdown]);

  useEffect(() => {
    if (targetDate) {
      const targetTime = new Date(targetDate).getTime();
      const currentTime = new Date().getTime();
      const difference = targetTime - currentTime;
      setCountdown(difference);
      setIsMoreThan100Days(difference > 100 * 24 * 60 * 60 * 1000);
    }
  }, [targetDate]);

  const handleToggleCountdown = () => {
    if (!counting) {
      startCountdown();
    } else {
      stopCountdown();
    }
  };

  const startCountdown = () => {
    if (validateTargetDate(targetDate)) {
      const targetTime = new Date(targetDate).getTime();
      const currentTime = new Date().getTime();
      const difference = targetTime - currentTime;
      setCountdown(difference);
      const id = setInterval(() => {
        setCountdown((prevCountdown) => prevCountdown - 1000);
      }, 1000);
      setIntervalId(id);
      setCounting(true);
      setIsOver(false);
      setIsMoreThan100Days(difference > 100 * 24 * 60 * 60 * 1000);
    } else {
      alert("Please enter a valid future date and time.");
    }
  };

  const stopCountdown = () => {
    if (intervalId) clearInterval(intervalId);
    setCounting(false);
  };

  const validateTargetDate = (date) => {
    const currentDate = new Date();
    const inputDate = new Date(date);
    return inputDate > currentDate;
  };

  const formatTime = (milliseconds) => {
    const seconds = Math.floor((milliseconds / 1000) % 60);
    const minutes = Math.floor((milliseconds / 1000 / 60) % 60);
    const hours = Math.floor((milliseconds / (1000 * 60 * 60)) % 24);
    const days = Math.floor(milliseconds / (1000 * 60 * 60 * 24));

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  };
  
  return (
    <div className="countdown">
      <h1>Countdown Timer</h1>
      <div className="input-form">
        <input
          type="datetime-local"
          value={targetDate}
          onChange={(e) => setTargetDate(e.target.value)}
        />
        <br />
        <br />
        <button onClick={handleToggleCountdown}>
          {counting ? "Cancel" : "Start Timer"}
        </button>
      </div>
      <br />
      <div className="time">
        {isOver ? (
          <span>The countdown is over! What's next on your adventure?</span>
        ) : isMoreThan100Days ? (
          <span>Selected time is more than 100 days.</span>
        ) : (
          <span>{formatTime(countdown)}</span>
        )}
      </div>
    </div>
  );
};

export default Countdown;

