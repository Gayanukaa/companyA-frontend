import React from 'react';
import { Link } from 'react-router-dom';

const Unauthorized = () => {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Access Denied!</h2>
      <p style={styles.message}>You don't have any access to this page.</p>
      <Link to="/" style={styles.button}>
        Back to Main Menu
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    color: '#333',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '1rem',
    color: '#0B94E4', // Red color
  },
  message: {
    fontSize: '1rem',
    textAlign: 'center',
    maxWidth: '400px',
  },
  button: {
    display: 'inline-block',
    padding: '10px 20px',
    backgroundColor: '#3498db',
    color: '#fff',
    borderRadius: '5px',
    textDecoration: 'none',
    fontSize: '1rem',
    marginTop: '20px',
  },
};

export default Unauthorized;