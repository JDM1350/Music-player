import React from 'react';
import './Navbar.css';
import logoImg from '../../assets/img2.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpotify } from '@fortawesome/free-brands-svg-icons';
import {
  
  faEllipsisH
} from '@fortawesome/free-solid-svg-icons';
const Navbar = ({ activeTab, handleTabChange }) => {
  return (
    <>
      <div className="sidebar">
        <div className="logo">
        <FontAwesomeIcon icon={faSpotify} size="2x" />
          <span>Spotify</span>
        </div>
        <div className="logo">
          <img src={logoImg} alt="Spotify Logo" />
          
        </div>
        
      </div>
      <div className="navbar">
        <div className="logo">
        <FontAwesomeIcon icon={faSpotify} size="2x" />
          <span>Spotify</span>
        </div>
        <div className="controls">
        <button>
                  <FontAwesomeIcon icon={faEllipsisH} />
                </button>
        </div>
       
      </div>
    </>
  );
};

export default Navbar;
