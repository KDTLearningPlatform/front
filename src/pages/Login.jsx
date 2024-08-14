import React from 'react';
import googleLogo from '../assets/images/google.png';
import naverLogo from '../assets/images/naver.png';
import axiosInstance from '../api/axiosInstance';

const Login = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#FFFFFF',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '50px',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white',
      borderRadius: '5px',
      padding: '10px 20px',
      width: '220px',
      textAlign: 'left',
      cursor: 'pointer',
    },
    logo: {
      width: '50px',
      height: '50px',
      marginRight: '10px',
    },
    text: {
      fontSize: '16px',
    },
  };

  const handleLogin = async (provider) => {
    try {
      const response = await axiosInstance.post('/auth/chooseSocialLogin', null, {
        params: { provider },
      });
      if (response.data && response.data.redirectUrl) {
        window.location.href = `http://localhost:8080${response.data.redirectUrl}`;
      } else {
        console.error('No redirect URL found in the response');
      }
    } catch (error) {
      console.error('Error during login process:', error);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>로그인</div>
      <div style={styles.button} onClick={() => handleLogin('google')}>
        <img src={googleLogo} alt="Google" style={styles.logo} />
        <span style={styles.text}>구글로 계속하기</span>
      </div>
      <div style={styles.button} onClick={() => handleLogin('naver')}>
        <img src={naverLogo} alt="Naver" style={styles.logo} />
        <span style={styles.text}>네이버로 계속하기</span>
      </div>
    </div>
  );
};

export default Login;