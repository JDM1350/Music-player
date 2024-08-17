import React, { useState } from 'react';
import './TrackList.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import logoImg from '../../assets/img.jpg';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
const TrackList = ({
  tracks,
  searchQuery,
  setSearchQuery,
  isLoading,
  currentTrack,
  handleTrackChange,
  trackDurations,
  formatTime,
}) => {
  const [activeTab, setActiveTab] = useState('For You');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Additional logic to filter tracks based on the active tab could go here
  };

  return (
    <>
   
    
    <div className="track-list">
      <div className="navb">

      <div className="tabs1">
        <button
          className={`tab-item1 ${activeTab === 'For You' ? 'active' : ''}`}
          onClick={() => handleTabChange('For You')}
        >
          For You
        </button>
        <button
          className={`tab-item1 ${activeTab === 'Top Tracks' ? 'active' : ''}`}
          onClick={() => handleTabChange('Top Tracks')}
        >
          Top Tracks
        </button>
      </div>
      <div className="search-bar">
        <FontAwesomeIcon icon={faSearch} className="search-icon" />
        <input
          type="text"
          placeholder="Search Song, Artist"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      </div>
      {isLoading ? (
        <div className="loading-animation">Loading tracks...</div>
      ) : (
        tracks.map((track) => (
          <div
            key={track.id}
            className={`track-item ${
              currentTrack?.id === track.id ? 'active' : ''
            }`}
            onClick={() => handleTrackChange(track)}
          >
            <img
              src={`https://cms.samespace.com/assets/${track.cover}`}
              alt={track.name}
            />
            <div className="track-info">
              <h3>{track.name}</h3>
              <p>{track.artist}</p>
            </div>
            <div className="track-duration">
              {formatTime(trackDurations[track.id] || 0)}
            </div>
          </div>
        ))
      )}
    </div>
    </>
  );
};

export default TrackList;
