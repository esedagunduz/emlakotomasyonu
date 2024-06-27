import React, { useState, useEffect } from 'react';
import { List, Card, Button, Carousel } from 'antd';
import { useNavigate } from 'react-router-dom';

const PropertyEdit = ({ onDeleteProperty, onEditProperty }) => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    setProperties(storedProperties);
  }, []);

  const handleEditClick = (property) => {
    onEditProperty(property);
    navigate('/property-input'); // Güncelleme için property-input sayfasına yönlendir
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2>Emlak Düzenle</h2>
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
                <Button type="link" onClick={() => handleEditClick(item)}>Güncelle</Button>,
                <Button type="link" danger onClick={() => onDeleteProperty(item.id)}>Sil</Button>,
                <Button type="link" onClick={() => navigate(`/property-detail/${item.id}`)}>Detay</Button>
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

export default PropertyEdit;
