import React, { useState, useEffect } from 'react';
import Splash from './pages/splash/splash'; 
import Home from './pages/home/home';
import Login from './pages/login/login';

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 3000); // 3초 후에 스플래시 화면이 사라짐

    return () => clearTimeout(timer); // 컴포넌트가 언마운트될 때 타이머를 정리함
  }, []);

  return (
    <div>
      {showSplash ? <Splash /> : <Login />}
    </div>
  );
};

export default App;
