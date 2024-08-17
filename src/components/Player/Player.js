import React, { useState, useEffect } from 'react';
import './Player.css';
import ReactPlayer from 'react-player';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlay,
  faPause,
  faStepForward,
  faStepBackward,
  faVolumeUp,
  faVolumeMute,
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';

const Player = ({
  currentTrack,
  isPlaying,
  isMuted,
  currentTime,
  duration,
  handlePlayPause,
  handleNext,
  handlePrevious,
  handleSeek,
  handleMute,
  handleProgress,
  handleDuration,
  playerRef,
  formatTime,
}) => {
  const [bgImage, setBgImage] = useState('https://example.com/initial-image.jpg');

  // Effect to change background image when currentTrack changes
  useEffect(() => {
    if (currentTrack && currentTrack.cover) {
      setBgImage(`https://cms.samespace.com/assets/${currentTrack.cover}`);
    }
  }, [currentTrack]);

  return (
    <div className="player-container">
      {currentTrack && (
        <>
          <div className="current-track-info" style={{ backgroundImage: `url(${bgImage})` }}>
            <div>
              <h2 className="track-title">{currentTrack.name}</h2>
              <h3 className="track-artist">{currentTrack.artist}</h3>
            </div>
            <div className="imgassest">
              <img
                src={`https://cms.samespace.com/assets/${currentTrack.cover}`}
                alt={currentTrack.name}
                className="current-track-cover"
              />
            </div>

            <ReactPlayer
              ref={playerRef}
              url={currentTrack.url}
              playing={isPlaying}
              controls={false}
              width="0"
              height="0"
              onProgress={handleProgress}
              onDuration={handleDuration}
              muted={isMuted}
            />

            <div className="timeline">
              <span>{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration}
                value={currentTime}
                onChange={handleSeek}
              />
              <span>{formatTime(duration)}</span>
            </div>

            <div className="controls">
              <div className="more">
                <button>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
              </div>
              <div className="play">
                <button onClick={handlePrevious}>
                  <FontAwesomeIcon icon={faStepBackward} />
                </button>
                <button onClick={handlePlayPause}>
                  <FontAwesomeIcon icon={isPlaying ? faPause : faPlay} />
                </button>
                <button onClick={handleNext}>
                  <FontAwesomeIcon icon={faStepForward} />
                </button>
              </div>
              <div className="volume-control">
                <button onClick={handleMute}>
                  <FontAwesomeIcon icon={isMuted ? faVolumeMute : faVolumeUp} />
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
