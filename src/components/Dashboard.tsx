import React, { useState, useEffect } from "react";
import TimerImg from "../assets/images/timer.png";
import SpeedImg from "../assets/images/speed.png";
import EnergyImg from "../assets/images/energy.png";
import { useTitle, navigate } from "hookrouter";
import { postData } from "../services/cycle.service";
import { Icycling } from "../interface/cycle.interface";
import { v4 as uuidv4 } from "uuid";
import dateFormat from "dateformat";

function Cycling() {
  useTitle("Dashboard");

  const [startbtn, startChange] = useState(true);
  const [stopbtn, stopChange] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [hours, setHours] = useState(0);
  const [distance, setDistance] = useState(0);
  const [avgSpeed, setAvgSpeed] = useState(0);
  const [maxSpeed, setMaxSpeed] = useState(0);
  const [calories, setCalories] = useState(0);
  const [speed, setSpeed] = useState([0]);

  const handleStartClick = () => {
    startChange(false);
    stopChange(true);
  };

  const handlePauseClick = () => {
    startChange(true);
    stopChange(true);
  };

  const handleStopClick = async () => {
    try {
      const data: Icycling = {
        id: uuidv4(),
        Time: `${hours}: ${minutes}: ${seconds}`,
        Distance: distance,
        AvgSpeed: avgSpeed,
        Calories: calories,
        ActivityType: "Cycling",
        Date: dateFormat(new Date(), "dd/mm/yyyy HH:MM"),
        Title: "App Cycling",
        MaxSpeed: 34,
        ElevGain: 81,
        ElevLoss: 81,
        BestLapTime: "09:22.9",
        NumberofLaps: 12,
        MaxTemp: 0
      };

      const response = await postData(data);
      if (response) {
        navigate("/history");
      }
    } catch (err) {
      console.log("Error while posting data ");
    }
  };

  useEffect(() => {
    let interval: any = null;

    if (!startbtn) {
      interval = setInterval(() => {
        if (seconds === 59) {
          setSeconds(0);
          setMinutes(minutes + 1);
        }
        if (minutes === 59) {
          setHours(hours + 1);
        }
        setSeconds(seconds => seconds + 1);

        const coveredDistance =
          parseFloat(distance.toFixed(2)) +
          parseFloat((Math.random() * (0.05 - 0.01) + 0.01).toFixed(2));
        setDistance(coveredDistance);

        const avgSpd = (distance / 60) * 100;
        // Calories formula
        const ageFactor = 30 * 0.2017;
        const weightFactor = 0.09036 * 70;
        const heartFactor = 115 * 0.6309;
        const mainFactor = ageFactor - weightFactor + heartFactor - 55.0969;
        const burnedCalories = mainFactor * (seconds / (4.184 * 60));
        setCalories(burnedCalories);

        let spd = speed;
        spd.push(avgSpd);
        setSpeed(spd);
        if (speed.length > 10) {
          speed.shift();
        }
        const totalSpeed: number = speed.reduce(
          (accu, currentValue) => accu + currentValue,
          0
        );
        setAvgSpeed(totalSpeed / speed.length);
        setMaxSpeed(Math.max(...speed));
      }, 1000);
    } else if (startbtn && seconds !== 0) {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [startbtn, seconds, minutes, hours, distance, avgSpeed, maxSpeed, speed]);

  return (
    <div className="container mx-auto px-2">
      <div className="max-w-sm mx-auto flex p-3 mt-3 bg-white rounded-lg shadow-xl">
        <div className="flex-shrink-0 w-2/12">
          <img src={TimerImg} alt="Timer" className="h-12" />
        </div>
        <div className="ml-6 pt-1 w-10/12">
          <p className="text-base uppercase text-gray-600">Time</p>
          <h4 className="text-4xl text-gray-900">
            {hours < 10 ? `0${hours}` : hours}:
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </h4>
        </div>
      </div>
      <div className="max-w-sm mx-auto flex p-3 mt-3  bg-white rounded-lg shadow-xl">
        <div className="flex-shrink-0 w-2/12">
          <img src={SpeedImg} alt="Speed" className="h-12 w-12" />
        </div>
        <div className="ml-6 pt-1  w-10/12">
          <p className="text-base uppercase text-gray-600">
            Avg Speed <span className="text-sm">(MPH)</span>
          </p>
          <h4 className="text-2xl text-gray-900">{avgSpeed.toFixed(2)}</h4>
        </div>
      </div>
      <div className="max-w-sm mx-auto flex p-3 mt-3 bg-white rounded-lg shadow-xl">
        <div className="flex-shrink-0 w-2/12">
          <img src={EnergyImg} alt="Energy" className="h-12 w-12" />
        </div>
        <div className="ml-6 pt-1 w-10/12">
          <p className="text-base uppercase text-gray-600">
            Calories <span className="text-sm">(per h)</span>
          </p>
          <h4 className="text-2xl text-gray-900">{calories.toFixed(2)}</h4>
        </div>
      </div>
      <div className="max-w-sm mx-auto flex p-3 mt-3 bg-white rounded-lg shadow-xl">
        <div className="flex-shrink-0 w-2/12">
          <img src={SpeedImg} alt="Energy" className="h-12 w-12" />
        </div>
        <div className="ml-6 pt-1 w-10/12">
          <p className="text-base uppercase text-gray-600">
            Max Speed <span className="text-sm">(MPH)</span>
          </p>
          <h4 className="text-2xl text-gray-900">{maxSpeed.toFixed(2)} </h4>
        </div>
      </div>
      <div className="max-w-sm mx-auto flex p-3 mt-3 bg-white rounded-lg shadow-xl">
        <div className="flex-shrink-0 w-2/12">
          <img src={EnergyImg} alt="Energy" className="h-12 w-12" />
        </div>
        <div className="ml-6 pt-1 w-10/12">
          <p className="text-base uppercase text-gray-600">Distance</p>
          <h4 className="text-2xl text-gray-900">
            {distance.toFixed(2)} miles
          </h4>
        </div>
      </div>
      <div className="flex justify-center mt-8 align-center">
        {startbtn ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handleStartClick}
          >
            Start
          </button>
        ) : (
          ""
        )}
        {!startbtn ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={handlePauseClick}
          >
            Pause
          </button>
        ) : (
          ""
        )}
        {stopbtn ? (
          <button
            className="bg-blue-500 hover:bg-blue-600 ml-5 text-white font-bold py-2 px-4 rounded"
            onClick={handleStopClick}
          >
            Stop & Save
          </button>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}

export default Cycling;
