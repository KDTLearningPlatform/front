import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Splash from './pages/Splash';
import Login from './pages/Login';
import Profilecompletion from './pages/Profilecompletion';
import Main from './pages/Main';
import MyCourses from './pages/MyCourses';
import CommunityPage from './pages/CommunityPage';
import WritePostPage from './pages/WritePostPage';
import OAuth2RedirectHandler from './pages/OAuth2RedirectHandler';
import Profile from './pages/Profile';
import CreateLecture from './pages/CreateLecture';
import LectureDetails from './pages/LectureDetails';
import EditLecture from './pages/EditLecture';
import PostPage from "./pages/PostPage";
import MyLectureDetails from './pages/MyLectureDetails';
import Video from './pages/Video';
import Ranking from './pages/Ranking';

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
          <Route path="/profilecompletion" element={<Profilecompletion />} />
          <Route path="/main" element={<Main />} />
          <Route path="/my-courses" element={<MyCourses />} />
          <Route path="/community" element={<CommunityPage />} />
          <Route path="/write-post" element={<WritePostPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/createLecture" element={<CreateLecture />} />
          <Route path="/editLecture/:lectureId" element={<EditLecture />} />
          <Route path="/lectureDetails/:lectureId" element={<LectureDetails />} />
          <Route path="/mylectureDetails/:lectureId" element={<MyLectureDetails />} />
          <Route path="/video/:videoId" element={<Video />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="*" element={<Navigate to="/" />} />
          <Route path="/post/:studyId" element={<PostPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
