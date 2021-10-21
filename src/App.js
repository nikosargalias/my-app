import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const TIMER = 5;
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [isGameOn, setIsGameOn] = useState(false);
  const [wordCount, setWordCount] = useState(0);

  const handleChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  useEffect(() => {
    const words = text.split(/\ /).filter((word) => word.length > 0);
    setWordCount(words.length);
  }, [text]);

  useEffect(() => {
    if (isGameOn) {
      if (timeRemaining > 0) {
        setTimeout(() => {
          setTimeRemaining((time) => time - 1);
        }, 1000);
      } else {
        endGame();
      }
    }
  }, [timeRemaining, isGameOn]);

  const focusOnTextarea = () => {
    const textarea = document.querySelector(".js-game-textarea");
    textarea.focus();
  };

  const startGame = () => {
    setTimeRemaining(TIMER);
    setIsGameOn(true);
    setText("");
  };

  useEffect(() => {
    if (isGameOn) {
      focusOnTextarea();
    }
  }, [isGameOn]);

  const endGame = () => setIsGameOn(false);

  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea
        tabindex="0"
        className="js-game-textarea"
        onChange={handleChange}
        value={text}
        disabled={!isGameOn}
      ></textarea>
      <h4>Time remaining: {timeRemaining}</h4>
      <button onClick={startGame} disabled={isGameOn}>
        Start
      </button>
      <h1>Word count: {wordCount}</h1>
    </div>
  );
}

export default App;
