import React, { useState, useEffect } from 'react';
import { Layout, Menu, Button, Dropdown, message, Row, Col, Card } from 'antd';
import { UserOutlined, PlusCircleOutlined, EditOutlined } from '@ant-design/icons';
import { Routes, Route, Link, useNavigate, Navigate } from 'react-router-dom';
import { Element, scroller } from 'react-scroll';
import { onAuthStateChanged, signOut } from "firebase/auth";
import Home from './Home';
import Login from './Login';
import Logout from './Logout';
import PropertyInputPage from './PropertyInputPage';
import PropertyList from './PropertyList';
import PropertyDetail from './PropertyDetail';
import Favorites from './Favorites';
import Contact from './Contact';
import SignUp from './SignUp';
import CityProperties from './CityProperties';
import FilteredProperties from './FilteredProperties';
import AboutUs from './AboutUs';
import Welcome from './Welcome';
import PropertyEdit from './PropertyEdit';

import { auth } from './firebase';

const { Header, Content, Footer } = Layout;

const HomePage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [currentProperty, setCurrentProperty] = useState(null);
  const [favorites, setFavorites] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCity, setSelectedCity] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch('https://turkiyeapi.dev/api/v1/provinces');
        const data = await response.json();
        setCities(data.data);
      } catch (error) {
        console.error('İller yüklenirken hata oluştu:', error);
      }
    };

    fetchCities();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (selectedCity) {
        try {
          const response = await fetch(`https://turkiyeapi.dev/api/v1/provinces/districts/${selectedCity}`);
          const data = await response.json();
          setDistricts(data.data);
        } catch (error) {
          console.error('İlçeler yüklenirken hata oluştu:', error);
        }
      }
    };

    fetchDistricts();
  }, [selectedCity]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
    return unsubscribe;
  }, [navigate]);

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setProperties(storedProperties);
    setFilteredProperties(storedProperties);
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('properties', JSON.stringify(properties));
  }, [properties]);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleNewProperty = (property) => {
    setProperties((prevProperties) => [...prevProperties, property]);
    setCurrentProperty(null);
  };

  const handleDeleteProperty = (id) => {
    setProperties((prevProperties) => prevProperties.filter(property => property.id !== id));
    setFilteredProperties((prevProperties) => prevProperties.filter(property => property.id !== id));
  };

  const handleEditProperty = (property) => {
    setCurrentProperty(property);
  };

  const handleUpdateProperty = (updatedProperty) => {
    setProperties((prevProperties) =>
      prevProperties.map(property => property.id === updatedProperty.id ? updatedProperty : property)
    );
    setFilteredProperties((prevProperties) =>
      prevProperties.map(property => property.id === updatedProperty.id ? updatedProperty : property)
    );
    setCurrentProperty(null);
  };

  const handleToggleFavorite = (property) => {
    if (favorites.some(fav => fav.id === property.id)) {
      setFavorites((prevFavorites) => prevFavorites.filter(fav => fav.id !== property.id));
    } else {
      setFavorites((prevFavorites) => [...prevFavorites, property]);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setIsLoggedIn(false);
      message.success('Başarıyla çıkış yapıldı.');
      navigate('/');
    } catch (error) {
      console.error("Çıkış yaparken hata oluştu:", error);
      message.error('Çıkış yaparken hata oluştu.');
    }
  };

  const scrollToSection = (section) => {
    navigate('/');
    scroller.scrollTo(section, {
      duration: 800,
      delay: 0,
      smooth: 'easeInOutQuart'
    });
  };

  const userMenuItems = [
    {
      key: '1',
      label: <Link to="/sign-up">Kayıt Ol</Link>,
    },
    {
      key: '2',
      label: <Link to="/login">Giriş Yap</Link>,
    },
    ...(isLoggedIn ? [
      {
        key: '3',
        label: <Button type="link" onClick={handleLogout}>Çıkış Yap</Button>,
      }
    ] : [])
  ];

  return (
    <Layout className="layout">
    <Header style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)', position: 'fixed', width: '100%', zIndex: 1 }}>
      <div className="logo" style={{ float: 'left', color: 'white', fontSize: '24px', fontFamily: 'Bromello' }}>
        <Link to="/" style={{ color: 'white' }}>QUERENCIA</Link>
      </div>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']} style={{ backgroundColor: 'transparent', display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }} items={[
          {
            key: '1',
            label: <Link to="/" style={{ color: 'white' }}>Ana Sayfa</Link>,
          },
          {
            key: '2',
            label: <Link to="/property-list" style={{ color: 'white' }}>Emlak Listesi</Link>,
          },
          {
            key: '3',
            label: <Link to="/favorites" style={{ color: 'white' }}>Favoriler</Link>,
          },
          {
            key: '4',
            label: <Button type="link" onClick={() => scrollToSection('about-us-section')} style={{ color: 'white' }}>Hakkımızda</Button>,
          },
          {
            key: '5',
            label: <Button type="link" onClick={() => scrollToSection('contact-section')} style={{ color: 'white' }}>İletişim</Button>,
          },
          {
            key: '8',
            label: <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
              <Button type="link" icon={<UserOutlined />} style={{ color: 'white' }} />
            </Dropdown>,
          },
        ]}>
        </Menu>
      </Header>
      <Content style={{ paddingTop: '64px', minHeight: '100vh' }}>
        {isLoggedIn && (
          <div style={{ position: 'fixed', right: '20px', top: '80px', zIndex: 1000, backgroundColor: 'white', padding: '10px', borderRadius: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button 
              type="primary" 
              icon={<PlusCircleOutlined />} 
              onClick={() => navigate('/property-input')}
              style={{ marginBottom: '10px' }}
            />
            <Button 
              type="default" 
              icon={<EditOutlined />} 
              onClick={() => navigate('/property-edit')}
            />
          </div>
        )}
        <Routes>
          <Route path="/" element={
            <>
              <Element name="home-section">
                <Home onFilter={setFilteredProperties} properties={properties} />
              </Element>
              <Element name="city-cards-section">
                <div style={{ padding: '40px' }}>
                <h2 style={{ marginBottom: '40px' }}>Popüler Şehirler</h2>
                  <Row gutter={[16, 16]} justify="center" marginBottom="30 px">
                    {[
                      { id: 34, name: 'İstanbul', image: 'https://www.armadacini.com/wp-content/uploads/2018/04/k%C4%B1z-kulesi-istanbul-sahne-resimleri-scaled.jpg' },
                      { id: 6, name: 'Ankara', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8jINd2fTJGGH2oqmKlW-enIx59A3TlwGvbg&s' },
                      { id: 35, name: 'İzmir', image: 'https://izmir.ktb.gov.tr/Resim/68383,konakjpg.png?0' },
                      { id: 7, name: 'Antalya', image: 'https://assets.enuygun.com/media/lib/570x400/uploads/image/antalya-34262.jpeg' },
                      { id: 16, name: 'Bursa', image: 'https://bursabasincom.teimg.com/bursabasin-com/uploads/2023/06/241313.jpg' }
                    ].map((city, index) => (
                      <Col span={4} key={index}>
                        <Link to={`/city-properties/${city.id}`}>
                          <Card
                            hoverable
                            
                            cover={<div style={{
                              width: '100%',
                              height: '200px',
                              backgroundImage: `url(${city.image})`,
                              backgroundSize: 'cover',
                              backgroundPosition: 'center',
                              position: 'relative',
                            
                              

                            }}>
                              <div style={{
                                position: 'absolute',
                                bottom: 0,
                                width: '100%',
                                textAlign: 'center',
                                color: 'white',
                                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                padding: '5px 0',
                             
                              }}>{city.name}</div>
                            </div>}
                          />
                        </Link>
                      </Col>
                    ))}
                  </Row>
                </div>
              </Element>
              <Element name="about-us-section">
                <AboutUs />
              </Element>
              <Element name="contact-section">
                <Contact />
              </Element>
            </>
          } />
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/logout" element={<Logout setIsLoggedIn={setIsLoggedIn} />} />
          {isLoggedIn ? (
            <>
              <Route path="/property-input" element={
                <PropertyInputPage 
                  onNewProperty={handleNewProperty}
                  onUpdateProperty={handleUpdateProperty}
                  currentProperty={currentProperty}
                  cities={cities}
                  districts={districts}
                  setSelectedCity={setSelectedCity}
                />
              } />
              <Route path="/property-edit" element={
                <PropertyEdit 
                  properties={properties} 
                  onDeleteProperty={handleDeleteProperty}
                  onEditProperty={handleEditProperty}
                  onUpdateProperty={handleUpdateProperty}
                  currentProperty={currentProperty}
                />
              } />
            </>
          ) : (
            <Route path="*" element={<Navigate to="/login" />} />
          )}
          <Route path="/property-list" element={
            <PropertyList 
              properties={properties} 
              onDeleteProperty={handleDeleteProperty}
              onEditProperty={handleEditProperty}
              onToggleFavorite={handleToggleFavorite}
              favorites={favorites}
              isLoggedIn={isLoggedIn}
            />
          } />
          <Route path="/property-detail/:id" element={<PropertyDetail properties={properties} cities={cities} />} />
          <Route path="/favorites" element={
            <Favorites 
              favorites={favorites} 
              onToggleFavorite={handleToggleFavorite} 
            />
          } />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/city-properties/:cityId" element={<CityProperties properties={properties} cities={cities} onToggleFavorite={handleToggleFavorite} />} />

          <Route path="/filtered-properties" element={<FilteredProperties filteredProperties={filteredProperties} onToggleFavorite={handleToggleFavorite} />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </Content>
      <Footer style={{ textAlign: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white' }}>
        Emlakçı Otomasyonu ©2024 Created by You
      </Footer>
    </Layout>
  );
};

export default HomePage;
