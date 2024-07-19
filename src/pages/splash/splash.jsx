import React from 'react';
import logo from '../../assets/images/logo.png';

const Splash = () => {
  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#0961F5',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden'
    },
    logo: {
      width: '150px',
      height: '150px',
    },
    textContainer: {
      marginTop: '20px',
      textAlign: 'center',
      color: 'white',
    }
   }

  return (
    <div style={styles.container}>
        <img src={logo} alt="Logo" style={styles.logo} />
    </div>
  );
};

export default Splash;
