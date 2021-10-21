import React, { useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const TIMER = 5;
  const [text, setText] = useState("");
  const [timeRemaining, setTimeRemaining] = useState(5);
  const [isGameOn, setIsGameOn] = useState(false);
  const [wordCount, setWordCount] = useState(0);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    const { value } = e.target;
    setText(value);
  };

  const focusOnTextarea = () => {
    textareaRef.current.disabled = false;
    textareaRef.current.focus();
  };

  const startGame = () => {
    setTimeRemaining(TIMER);
    setIsGameOn(true);
    setText("");
    focusOnTextarea();
  };

  const endGame = () => setIsGameOn(false);

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

  return (
    <div>
      <h1>How fast do you type?</h1>
      <textarea
        ref={textareaRef}
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
