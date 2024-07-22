import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import ProfileCompletion from './pages/ProfileCompletion';
import Main from './pages/Main';
import MyCourses from './pages/MyCourses';
import CommunityPage from './pages/CommunityPage';
import WritePostPage from './pages/WritePostPage';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

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
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/write-post" element={<WritePostPage />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
