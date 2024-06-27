import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Layout, Card, Carousel } from 'antd';

const { Content } = Layout;

const PropertyDetail = ({ properties, cities }) => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);

  useEffect(() => {
    const storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
    const propertyDetail = storedProperties.find(p => p.id === parseInt(id));
    setProperty(propertyDetail);
  }, [id]);

  const getCityNameById = (cityId) => {
    const city = cities.find(c => c.id === cityId);
    return city ? city.name : "Bilinmiyor";
  };

  if (!property) {
    return <div>Property not found</div>;
  }

  return (
    <Layout className="layout">
      <Content style={{ padding: '50px', minHeight: '80vh' }}>
        <Card
          hoverable
          cover={
            <Carousel arrows infinite={false}>
              {property.photos.map((photo, index) => (
                <div key={index}>
                  <img src={photo.url} alt={property.ilanbaslik} style={{ height: '300px', objectFit: 'cover', width: '100%' }} />
                </div>
              ))}
            </Carousel>
          }
        >
          <Card.Meta title={property.ilanbaslik} description={`${property.fiyat} ${property.aciklama}`} />
          <p><strong>İlan Başlığı:</strong> {property.ilanbaslik}</p>
          <p><strong>Açıklama:</strong> {property.ilanaciklama}</p>
          <p><strong>Fiyat:</strong> {property.fiyat}</p>
          <p><strong>İl:</strong> {getCityNameById(property.il)}</p>
          <p><strong>İlçe:</strong> {property.ilce}</p>
          <p><strong>Kategori:</strong> {property.kategori}</p>
          <p><strong>Tür:</strong> {property.tur}</p>
          <p><strong>Oda Sayısı:</strong> {property.odaSayisi}</p>
        </Card>
      </Content>
    </Layout>
  );
};

export default PropertyDetail;
