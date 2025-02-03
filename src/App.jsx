import { useState } from "react";
import { Audio_Bg } from "./assets/audioPath/audioPath.js";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [playPause, setplayPause] = useState(<i class="fa-solid fa-play"></i>);
  const [p, setp] = useState("pause");
  const [bgIndex, setbgIndex] = useState(0);

  const playPreviousBtn = () => {
    setp("play");
    setCount((previousSongIndex) => {
      if (previousSongIndex == 0) {
        return Audio_Bg["Audio"].length - 1;
      } else {
        return previousSongIndex - 1;
      }
    });
    setplayPause(<i class="fa-solid fa-pause"></i>);
  };

  const playNextBtn = () => {
    setp("play");
    setCount((previousSongIndex) => {
      if (previousSongIndex == Audio_Bg["Audio"].length - 1) {
        return 0;
      } else {
        return previousSongIndex + 1;
      }
    });
    setplayPause(<i class="fa-solid fa-pause"></i>);
  };

  const handleChangeBg = () => {
    setbgIndex((previousBgIndex) => {
      if (previousBgIndex === Audio_Bg["Bg"].length - 1) {
        return 0;
      } else {
        return previousBgIndex + 1;
      }
    });
  };

  const handleIcon_playPause = () => {
    const audioTag = document.querySelector("audio");
    if (audioTag.classList.contains("pause")) {
      audioTag.classList.add("play");
      audioTag.classList.remove("pause");
      audioTag.play();
      setplayPause(<i class="fa-solid fa-pause"></i>);
      setp("play");
    } else if (audioTag.classList.contains("play")) {
      audioTag.classList.add("pause");
      audioTag.classList.remove("play");
      audioTag.pause();
      setplayPause(<i class="fa-solid fa-play"></i>);
      setp("pause");
    }
  };

  const handleLikeBtn = () => {
    console.log(document.querySelector(".like-btn").classList);
    document.querySelector(".like-btn").classList.toggle("liked");
    console.log(Audio[count].liked_status);
    Audio[count].liked_status = "liked";
    console.log(Audio[count].liked_status);
  };

  const handleMouseEnter = (event) => {
    event.target.style.color = Audio_Bg.Bg[bgIndex].hoverColor;
  };
  const handleMouseLeave = (event) => {
    event.target.style.color = "black";
  };

  return (
    <div
    id="container"
    >
      <div className="change-bg-btn" onClick={handleChangeBg}>
        <i class="fa-solid fa-moon"></i>
      </div>

      <img
        src={Audio_Bg.Audio[count].poster_url}
        alt={Audio_Bg.Audio[count].song_name}
        id="song-poster"
      />
      
      <div className="songName-likeBtn">
        <marquee>
          {Audio_Bg.Audio[count]["song_name"]}
        </marquee>
        <div className="like-btn" onClick={handleLikeBtn}></div>
      </div>

      <audio
        className={p}
        style={{ width: "130%" }}
        controls
        src={Audio_Bg.Audio[count]["song_url"]}
        autoPlay
      ></audio>

      <div
        style={{ display: "flex", justifyContent: "space-evenly", gap: "5rem" }}
      >
        <div
          className="previousbtn btn"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={playPreviousBtn}
        >
          <i class="fa-solid fa-backward-step"></i>
        </div>

        <div
          className="playpause-btn btn"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={handleIcon_playPause}
        >
          {playPause}
        </div>

        <div
          className="nextbtn btn"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onClick={playNextBtn}
        >
          <i class="fa-solid fa-forward-step"></i>
        </div>
      </div>

      <div
        style={{
          background: `url('${Audio_Bg.Bg[bgIndex].imageBg}') no-repeat 0px 0px/cover`,
        }}
        className="blurBigPoster"
      ></div>
    </div>
  );
}

export default App;
