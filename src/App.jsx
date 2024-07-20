import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import Splash from './pages/splash'; 
// import Login from './pages/login';
import ProfileCompletion from './pages/profilecompletion';
import MyCourses from './pages/MyCourses';
import CommunityPage from './pages/CommunityPage';
import WritePostPage from './pages/WritePostPage'; 
import TabBar from './components/TabBar/TabBar'; 
const App = () => {
  // const [showSplash, setShowSplash] = useState(true);
  // const [showLogin, setShowLogin] = useState(false);
  // const [showProfileCompletion, setShowProfileCompletion] = useState(false);
  const [showMyCourses, setShowMyCourses] = useState(true);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setShowSplash(false);
  //     setShowLogin(true);
  //   }, 3000); // 3초 후에 스플래시 화면이 사라짐

  //   return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 정리함
  // }, []);

  // const handleLoginSuccess = () => {
  //   setShowLogin(false);
  //   setShowProfileCompletion(true);
  // };

  // const handleProfileCompletionSuccess = () => {
  //   setShowProfileCompletion(false);
  //   setShowMyCourses(true);
  // };

  return (
    <Router>
      <div style={{ paddingBottom: '60px' }}> 
        <Routes>
          {/* {showSplash && <Splash />} */}
          {/* {!showSplash && showLogin && <Login onLoginSuccess={handleLoginSuccess} />} */}
          {/* {!showSplash && !showLogin && showProfileCompletion && <ProfileCompletion onProfileCompletionSuccess={handleProfileCompletionSuccess} />} */}
          {/* {!showSplash && !showLogin && !showProfileCompletion && showMyCourses && <MyCourses />} */}
          {showMyCourses && <Route path="/" element={<MyCourses />} />}
          <Route path="/profile" element={<ProfileCompletion />} />
          <Route path="/courses" element={<MyCourses />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/write-post" element={<WritePostPage />} /> 
        </Routes>
        <TabBar />
      </div>
    </Router>
  );
};

export default App;
