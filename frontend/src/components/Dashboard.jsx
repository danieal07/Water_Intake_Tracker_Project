import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import Waterbottle from "../../src/assets/water_bottle.png";

const Dashboard = () => {
  const [time, setTime] = useState("");
  const [temperature, setTemperature] = useState(null);
  const [weatherCondition, setWeatherCondition] = useState("");
  const [remainingWater, setRemainingWater] = useState(5000);
  const [intakeData, setIntakeData] = useState([]);
  const [hydrationFact, setHydrationFact] = useState("");
  const [dailyintake, setdailyintake] = useState(0);
  const [totalintake, settotalintake] = useState(12000);


  // Hydration Facts
  const hydrationFacts = [
    "Drinking water boosts metabolism by 30% for up to 1 hour.",
    "Your brain is 75% water. Stay hydrated to stay focused!",
    "Dehydration can cause headaches and fatigue.",
    "Cold water absorbs into the body faster than warm water.",
    "Drinking enough water helps maintain healthy skin.",
    "Water aids in digestion and helps remove toxins.",
  ];
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let ampm = hours >= 12 ? "PM" : "AM";
      hours = hours % 12 || 12;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      setTime(`${hours}:${minutes} ${ampm}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
      try {
        const response = await fetch(url);
        const data = await response.json();
        setTemperature(Math.round(data.current_weather.temperature));
        setWeatherCondition(data.current_weather.weathercode); 
      } catch (error) {
        console.error("Error fetching weather:", error);
      }
    });
  }, []);



  // Water Intake
  const addWater = (amount) => {
    setIntakeData([...intakeData, { time: time, amount }]);
    setRemainingWater((prev) => Math.max(prev - amount, 0));
  };

  // Chart Data
  const chartData = {
    labels: intakeData.map((entry) => entry.time),
    datasets: [
      {
        label: "Water Intake (ml)",
        data: intakeData.map((entry) => entry.amount),
        borderColor: "#007bff",
        backgroundColor: "rgba(0, 123, 255, 0.5)",
        fill: true,
      },
    ],
  };

  return (
    <div className="dashboard-container">
     
      <div className="header">
        <h2>WATER INTAKE TRAKER </h2>
        <div className="header-right">
          <span>{time}</span>
          <span>{temperature !== null ? `${temperature}°C - ${weatherCondition}` : "Fetching weather..."}</span>
        </div>
      </div>


      <div className="dashboard-content">
        {/* Left Sidebar */}
        <div className="left-sidebar">
          <h3>Remaining Intake</h3>
          <div className="remaining-intake-box" style={{ "--progress": (remainingWater / 2500) * 100 }}>
            <span>{remainingWater} ml</span>
          </div>
        </div>

        {/* Left Section */}
        <div className="left-section">
          <div className="stats">
            <div className="stat-box green">
              <p>Daily Intake</p>
              <h3>{dailyintake} ml</h3>
            </div>
            <div className="stat-box blue">
              <p>Average Intake</p>
              <h3>3000 ml</h3>
            </div>
            <div className="stat-box orange">
              <p>Total Intake</p>
              <h3>{totalintake} ml</h3>
            </div>
          </div>

          {/* Chart */}
          <div className="chart-container">
            <h3>Intake Graph</h3>
            <Line data={chartData} />
          </div>

          {/* Water Intake Buttons */}
          <div className="water-intake">
            <h3>Log Your Intake</h3>
            <div className="water-buttons">
              <button onClick={() => {addWater(250); setdailyintake(dailyintake+250); settotalintake(totalintake+dailyintake)}}>+250ml</button>
              <button onClick={() => {addWater(500); setdailyintake(dailyintake+500);settotalintake(totalintake+dailyintake)}}>+500ml</button>
              <button onClick={() => {addWater(1000); setdailyintake(dailyintake+1000);settotalintake(totalintake+dailyintake)}}>+1000ml</button>
            </div>
          </div>

          {/* Hydration Tips */}
          <div className="hydration-tips">
            <h3>Hydration Tips</h3>
            <p className="tip">{hydrationFact}</p>
          </div>
        </div>

        {/* Right Section */}
        <div className="right-section">
          <div className="bottle-container">
            <img className="bottle-image" src={Waterbottle} alt="Water Bottle" />
            <p className="hydrated">Stay Hydrated and Beat the Heat!</p>
          </div>

          <div className="log-counter">
            <h3>Drink Log</h3>
            {intakeData.map((entry, index) => (
              <div key={index} className="log-entry">
                {entry.amount} ml - {entry.time}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;