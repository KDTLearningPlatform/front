import React from 'react';
import googleLogo from '../assets/images/google.png';
import naverLogo from '../assets/images/naver.png';

const Login = () => {
  const styles = {
    container: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#F5F5F5',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '20px',
    },
    button: {
      display: 'flex',
      alignItems: 'center',
      backgroundColor: 'white',
      border: '1px solid #ddd',
      borderRadius: '5px',
      padding: '10px 20px',
      marginBottom: '10px',
      width: '250px',
      textAlign: 'left',
      cursor: 'pointer',
    },
    logo: {
      width: '40px',
      height: '40px',
      marginRight: '10px',
    },
    text: {
      fontSize: '16px',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.title}>로그인</div>
      <div style={styles.button}>
        <img src={googleLogo} alt="Google" style={styles.logo} />
        <span style={styles.text}>구글로 계속하기</span>
      </div>
      <div style={styles.button}>
        <img src={naverLogo} alt="Naver" style={styles.logo} />
        <span style={styles.text}>네이버로 계속하기</span>
      </div>
    </div>
  );
};

export default Login;
