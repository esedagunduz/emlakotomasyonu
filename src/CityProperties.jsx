import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, Button, Row, Col, Carousel } from 'antd';
import { StarOutlined } from '@ant-design/icons';

const CityProperties = ({ properties, cities, onToggleFavorite }) => {
  const { cityId } = useParams();
  const filteredProperties = properties.filter(property => 
    String(property.il) === cityId
  );

  // Şehir adını cityId ile eşleştirdim
  const city = cities.find(city => String(city.id) === cityId);

  return (
    <div style={{ padding: '50px' }}>
      <h2>{city ? city.name : 'Şehir'} Şehrindeki Emlaklar</h2>
      <Row gutter={16}>
        {filteredProperties.map(property => (
          <Col span={8} key={property.id}>
            <Card
              cover={
                <Carousel arrows infinite={false}>
                  {property.photos.map((photo, index) => (
                    <div key={index}>
                      <img src={photo.url} alt={property.ilanbaslik} style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
                    </div>
                  ))}
                </Carousel>
              }
              title={property.ilanbaslik}
              actions={[
                <Button type="link" onClick={() => onToggleFavorite(property)} icon={<StarOutlined />} />,
                <Link to={`/property-detail/${property.id}`}>Detay</Link>
              ]}
            >
              <p>{property.ilanaciklama}</p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default CityProperties;
