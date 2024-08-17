import React, { useState, useEffect, useRef } from 'react';
import './MusicPlayer.css';
import { fetchMusicData } from './services/api';
import Navbar from './components/Navbar/Navbar';
import TrackList from './components/TrackList/TrackList';
import Player from './components/Player/Player';

const MusicPlayer = () => {
  const [tracks, setTracks] = useState([]);
  const [filteredTracks, setFilteredTracks] = useState([]);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('For You');
  const [isMuted, setIsMuted] = useState(false);
  const playerRef = useRef(null);
  const [trackDurations, setTrackDurations] = useState({});

  useEffect(() => {
    const getMusicData = async () => {
      const data = await fetchMusicData();
      setTracks(data);
      setFilteredTracks(data);
      await calculateTrackDurations(data);
      setCurrentTrack(data[0]);
      setIsLoading(false);
    };
    getMusicData();
  }, []);

  useEffect(() => {
    const searchTracks = () => {
      const lowercasedQuery = searchQuery.toLowerCase();
      const filtered = tracks.filter(
        (track) =>
          track.name.toLowerCase().includes(lowercasedQuery) ||
          track.artist.toLowerCase().includes(lowercasedQuery)
      );
      setFilteredTracks(filtered);
    };
    searchTracks();
  }, [searchQuery, tracks]);

  const calculateTrackDurations = async (tracks) => {
    const durations = {};
    for (const track of tracks) {
      const audio = new Audio(track.url);
      audio.addEventListener('loadedmetadata', () => {
        durations[track.id] = audio.duration;
        if (Object.keys(durations).length === tracks.length) {
          setTrackDurations(durations);
        }
      });
    }
  };

  const handleTrackChange = (track) => {
    setCurrentTrack(track);
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    const currentIndex = tracks.findIndex(
      (track) => track.id === currentTrack.id
    );
    const nextIndex = (currentIndex + 1) % tracks.length;
    setCurrentTrack(tracks[nextIndex]);
    setIsPlaying(true);
  };

  const handlePrevious = () => {
    const currentIndex = tracks.findIndex(
      (track) => track.id === currentTrack.id
    );
    const prevIndex = (currentIndex - 1 + tracks.length) % tracks.length;
    setCurrentTrack(tracks[prevIndex]);
    setIsPlaying(true);
  };

  const handleProgress = (progress) => {
    setCurrentTime(progress.playedSeconds);
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleSeek = (e) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    playerRef.current.seekTo(newTime);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    // Implement tab-specific logic here
  };

  // Helper function to format time in minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(
      2,
      '0'
    )}`;
  };

  return (
    <div className="music-player">
     <Navbar/>
      <div className="main-content">
        <TrackList
          tracks={filteredTracks}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          isLoading={isLoading}
          currentTrack={currentTrack}
          handleTrackChange={handleTrackChange}
          trackDurations={trackDurations}
          formatTime={formatTime}
        />
        <Player
          currentTrack={currentTrack}
          isPlaying={isPlaying}
          isMuted={isMuted}
          currentTime={currentTime}
          duration={duration}
          handlePlayPause={handlePlayPause}
          handleNext={handleNext}
          handlePrevious={handlePrevious}
          handleSeek={handleSeek}
          handleMute={handleMute}
          handleProgress={handleProgress}
          handleDuration={handleDuration}
          playerRef={playerRef}
          formatTime={formatTime}
        />
      </div>
    </div>
  );
};

export default MusicPlayer;
