import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './Welcome';
import PropertyInputPage from './PropertyInputPage';
import PropertyEdit from './PropertyEdit';
import Login from './Login';
import Logout from './Logout';
import PropertyList from './PropertyList';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Kullanıcının giriş yapıp yapmadığını takip eder
  const [properties, setProperties] = useState([]); // Emlak listesini takip eder

  // Yeni bir emlak eklemek için fonksiyon
  const addProperty = (property) => {
    setProperties([...properties, property]);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
        {isLoggedIn ? (
          // Kullanıcı giriş yaptıysa bu rotalar kullanılabilir
          <>
            <Route path="/property-input" element={<PropertyInputPage addProperty={addProperty} />} />
            <Route path="/property-list" element={<PropertyList properties={properties} />} />
            <Route path="/property-edit/:id" element={<PropertyEdit properties={properties} setProperties={setProperties} />} />
            <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
          </>
        ) : (
          // Kullanıcı giriş yapmadıysa login sayfasına yönlendirilir
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
};

export default App;
