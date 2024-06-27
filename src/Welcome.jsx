import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'antd';
import { PlusOutlined, EditOutlined } from '@ant-design/icons';

const Welcome = () => {
  const navigate = useNavigate();

  const handleAddProperty = () => {
    navigate('/property-input');
  };

  const handleEditProperty = () => {
    navigate('/property-edit');
  };

  return (
    <div style={styles.welcomeContainer}>
      <h1 style={styles.welcomeTitle}>HOŞGELDİN!</h1>
      <Button type="primary" icon={<PlusOutlined />} onClick={handleAddProperty} style={styles.welcomeButton}>
        Ev Ekle
      </Button>
      <Button type="default" icon={<EditOutlined />} onClick={handleEditProperty} style={styles.welcomeButton}>
        Ev Düzenle
      </Button>
    </div>
  );
};

const styles = {
  '@import': 'url("https://fonts.googleapis.com/css2?family=Bromello&display=swap")',
  welcomeContainer: {
    backgroundImage: 'url("https://i.pinimg.com/736x/8f/c8/e7/8fc8e7a1856b188288f255d92148c9e9.jpg")',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    color: 'white',
    padding: '50px',
  },
  welcomeTitle: {
    fontFamily: 'Bromello, cursive',
    fontSize: '72px',
    marginBottom: '50px',
  },
  welcomeButton: {
    fontSize: '20px',
    padding: '15px 30px',
    marginTop: '20px',
    marginRight: '10px',
  },
};

export default Welcome;
