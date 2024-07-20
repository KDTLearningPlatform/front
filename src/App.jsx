import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
// import Splash from './pages/splash'; 
// import Login from './pages/login';
import ProfileCompletion from './pages/profilecompletion';
import MyCourses from './pages/MyCourses';

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
      <div>
      <div style={{ paddingBottom: '60px' }}> {/* TabBar의 높이만큼 패딩을 추가 */}
        {/* {showSplash && <Splash />} */}
        {/* {!showSplash && showLogin && <Login onLoginSuccess={handleLoginSuccess} />} */}
        {/* {!showSplash && !showLogin && showProfileCompletion && <ProfileCompletion onProfileCompletionSuccess={handleProfileCompletionSuccess} />} */}
        {/* {!showSplash && !showLogin && !showProfileCompletion && showMyCourses && <MyCourses />} */}
        {showMyCourses && <MyCourses />}
      </div>
      </div>
    </Router>
  );
};

export default App;
