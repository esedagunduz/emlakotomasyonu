import React, { useState, useEffect } from 'react';
import { List, Card, Button, Carousel } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import propertiesData from './properties.json'; 

const PropertyList = ({ onDeleteProperty, onEditProperty, onToggleFavorite, isLoggedIn }) => {
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // JSON verilerini localStorage'a kaydediyorum evler birer kez gözükmesi için
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    const newProperties = propertiesData.filter(
      newProp => !storedProperties.some(storedProp => storedProp.id === newProp.id)
    );
    const updatedProperties = [...storedProperties, ...newProperties];
    localStorage.setItem('properties', JSON.stringify(updatedProperties));
    setProperties(updatedProperties);
  }, []);

  return (
    <div style={{ padding: '50px' }}>
      <h2>Emlak Listesi</h2>
      <List
        grid={{ gutter: 16, column: 3 }}
        dataSource={properties}
        renderItem={item => (
          <List.Item>
            <Card
              cover={
                <Carousel arrows infinite={false}>
                  {item.photos.map((photo, index) => (
                    <div key={index}>
                      <img src={photo.url} alt={item.ilanbaslik} style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
                    </div>
                  ))}
                </Carousel>
              }
              title={item.ilanbaslik}
              actions={[
                <Button type="link" onClick={() => onToggleFavorite(item)} icon={<StarOutlined />} />,
                <Link to={`/property-detail/${item.id}`}>Detay</Link>
              ]}
            >
              <p>{item.ilanaciklama}</p>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default PropertyList;

