import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import ProfileCompletion from './pages/ProfileCompletion';
import Main from './pages/Main';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Splash from './pages/splash'; 
import Login from './pages/login';
import ProfileCompletion from './pages/profilecompletion';
import MyCourses from './pages/MyCourses';
import CommunityPage from './pages/CommunityPage';
import WritePostPage from './pages/WritePostPage';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';

import WritePostPage from './pages/WritePostPage'; 


const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);
  const [showSplash, setShowSplash] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [showMyCourses, setShowMyCourses] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setShowLogin(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
    return () => clearTimeout(timer); 
  }, []);

  const handleLoginSuccess = () => {
    setShowLogin(false);
    setShowProfileCompletion(true);
  };

  const handleProfileCompletionSuccess = () => {
    setShowProfileCompletion(false);
    setShowMyCourses(true);
  };

  return (
    <Router>
      <div style={{ paddingBottom: '60px' }}>
        <Routes>
          {showSplash ? (
            <Route path="/" element={<Splash />} />
          ) : (
            <Route path="/" element={<Navigate to="/login" />} />
          )}
          <Route path="/login" element={<Login />} />
          <Route path="/oauth2/redirect" element={<OAuth2RedirectHandler />} />
          <Route path="/profilecompletion" element={<ProfileCompletion />} />
          <Route path="/main" element={<Main />} />
          <Route path="/my-courses" element={<MyCourses />} />
          {showSplash && <Route path="/" element={<Splash />} />}
          {!showSplash && showLogin && <Route path="/" element={<Login onLoginSuccess={handleLoginSuccess} />} />}
          {!showSplash && !showLogin && showProfileCompletion && <Route path="/" element={<ProfileCompletion onProfileCompletionSuccess={handleProfileCompletionSuccess} />} />}
          {!showSplash && !showLogin && !showProfileCompletion && showMyCourses && <Route path="/" element={<MyCourses />} />}
          <Route path="/profile" element={<ProfileCompletion />} />
          <Route path="/courses" element={<MyCourses />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/write-post" element={<WritePostPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        
      </div>
    </Router>
  );
};

export default App;