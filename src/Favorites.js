import React, { useState } from 'react';
import { List, Card, Button, Input, Form, message, Row, Col, Carousel } from 'antd';
import { StarOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { sendEmail } from './emailService';

const Favorites = ({ favorites, onToggleFavorite }) => {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [selectedProperties, setSelectedProperties] = useState([]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleDrop = (property) => {
    setSelectedProperties([...selectedProperties, property]);
  };

  const sendFavoritesByEmail = async () => {
    setSending(true);

    const favoriteProperties = selectedProperties.map(fav => ({
      ilanbaslik: fav.ilanbaslik,
      ilanaciklama: fav.ilanaciklama,
      fiyat: fav.fiyat,
      il: fav.il,
      ilce: fav.ilce,
    }));

    try {
      await sendEmail(email, favoriteProperties);
    } catch (error) {
      console.error('E-posta gönderim hatası:', error);
    } finally {
      setSending(false);
      message.success('Favori evler başarıyla gönderildi.');
    }
  };

  return (
    <div style={{ padding: '50px' }}>
      <h2>Favoriler</h2>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <List
            grid={{ gutter: 16, column: 1 }}
            dataSource={favorites}
            renderItem={item => (
              <List.Item>
                <Card
                  title={item.ilanbaslik}
                  draggable
                  onDragStart={(e) => e.dataTransfer.setData('property', JSON.stringify(item))}
                  actions={[
                    <Button type="link" onClick={() => onToggleFavorite(item)} icon={<StarOutlined />} />,
                    <Link to={`/property-detail/${item.id}`}>Detay</Link>
                  ]}
                  cover={
                    <Carousel arrows infinite={false}>
                      {item.photos.map((photo, index) => (
                        <div key={index}>
                          <img src={photo.url} alt={item.ilanbaslik} style={{ height: '200px', objectFit: 'cover', width: '100%' }} />
                        </div>
                      ))}
                    </Carousel>
                  }
                >
                  <p>{item.ilanaciklama}</p>
                </Card>
              </List.Item>
            )}
          />
        </Col>
        <Col span={12}>
          <div
            style={{
              border: '1px dashed #ccc',
              padding: '20px',
              minHeight: '200px',
              textAlign: 'center'
            }}
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const property = JSON.parse(e.dataTransfer.getData('property'));
              handleDrop(property);
            }}
          >
            <h3>Mesaj Bölümü</h3>
            <List
              dataSource={selectedProperties}
              renderItem={item => (
                <List.Item>
                  <Card title={item.ilanbaslik}>
                    <p>{item.ilanaciklama}</p>
                  </Card>
                </List.Item>
              )}
            />
          </div>
          <Form layout="vertical" onFinish={sendFavoritesByEmail} style={{ marginTop: '20px' }}>
            <Form.Item
              label="Email Adresiniz"
              name="email"
              rules={[{ required: true, message: 'Lütfen geçerli bir email adresi giriniz.' }]}
            >
              <Input
                placeholder="Email Adresiniz"
                value={email}
                onChange={handleEmailChange}
                type="email"
              />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={sending}>
                Gönder
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Favorites;
