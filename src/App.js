

import allImages from "./components/images";
import './App.css';
import React, { useState, useEffect } from "react";
import DisplayImages from "./components/display_images";

function App() {
  const [score, setScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [memoryKing, setMemoryKing] = useState(0);
  const [images, setImages] = useState(allImages);
  const [clickedImages, setclickedImages] = useState([])

  const incrementScore = () => {
    setScore(score + 1);
  };

  const resetScore = () => {
    setScore(0);
  };

  const updateBestScore = () => {
    if (score >= bestScore) {
      setBestScore(score);
    }
  };

  const resetClickedImages = () => {
    setclickedImages([]);
  };

  const incrementMemoryKing = () => {
    setMemoryKing(memoryKing + 1);
  };

  const isMemoryKing = () => {
    if (images.length == clickedImages.length) {
      return true;
    }
    return false;
  };

  const imageClicked = (e) => {
    const imageId = e.target.id;
    if (clickedImages.includes(imageId)) {
      updateBestScore();
      resetClickedImages();
      resetScore();
    } else {
      setclickedImages(clickedImages.concat(imageId));
      incrementScore();
    }
  };

  const shuffleArray = (array) => {
    let length = array.length;
    const newArray = [];

    while (length > 0) {
      let randNum = Math.floor((Math.random() * length));
      if (randNum == length) {
        randNum -= 1;
      }
      newArray.push(array[randNum]);
      array.splice(randNum, 1);
      length--;
    }
    return newArray;
  };

  const shuffleImages = () => {
    const holdArr = images.slice();
    const heldArrShuffled = shuffleArray(holdArr);
    setImages(heldArrShuffled);
  };

  useEffect(() => {
    shuffleImages();
  }, []);

  useEffect(() => {
    if (isMemoryKing()) {
      incrementMemoryKing();
      resetClickedImages();
      updateBestScore();
      resetScore();
    }

    document.querySelector('img').addEventListener("click", shuffleImages);

    return () => {
      document.querySelector('img').removeEventListener("click", shuffleImages);
    };
  });

  return (
    <div className="App">
      <div className="scores">
        <div id="score"> SCORE = {score} </div>
        <div id="best-score"> BEST SCORE = {bestScore} </div>
        <div id="mem-king"> MEMORY KING = {memoryKing} </div>
      </div>
      <div>
        <DisplayImages
          images={images}
          incrementScore={imageClicked}
        />
      </div>
    </div>
  );
}

export default App;
