import React from 'react';
import { Button } from 'antd';
import { useNavigate } from 'react-router-dom';

const Logout = ({ setIsLoggedIn }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate('/'); // Çıkış yaptıktan sonra yönlendirme yapılıyor
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto' }}>
      <h1>Çıkış Yap</h1>
      <Button type="primary" onClick={handleLogout}>
        Çıkış Yap
      </Button>
    </div>
  );
};

export default Logout;
