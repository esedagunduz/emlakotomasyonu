import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Select, Row, Col } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const Home = ({ onFilter, properties }) => {
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get('https://turkiyeapi.dev/api/v1/provinces');
        setCities(response.data.data);
      } catch (error) {
        console.error('İller alınırken hata oluştu:', error);
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedCityId) return;
      setLoadingDistricts(true);
      try {
        const response = await axios.get('https://turkiyeapi.dev/api/v1/districts');
        const filteredDistricts = response.data.data.filter(district => district.provinceId === selectedCityId);
        setDistricts(filteredDistricts);
      } catch (error) {
        console.error('İlçeler alınırken hata oluştu:', error);
      } finally {
        setLoadingDistricts(false);
      }
    };
    fetchDistricts();
  }, [selectedCityId]);
    

  const handleFilter = (values) => {
    const filtered = properties.filter(property => {
      return (
        (!values.name || property.ilanbaslik.includes(values.name)) &&
        (!values.minPrice || property.fiyat >= values.minPrice) &&
        (!values.maxPrice || property.fiyat <= values.maxPrice) &&
        (!values.city || property.il === values.city) &&
        (!values.district || property.ilce === values.district) &&
        (!values.category || values.category.includes(property.kategori)) &&
        (!values.type || values.type.includes(property.tur)) &&
        (!values.rooms || values.rooms.includes(property.odaSayisi))
      );
    });
    onFilter(filtered);
    navigate('/filtered-properties'); 
  };

  const categoryOptions = [
    { label: 'Daire', value: 'daire' },
    { label: 'Villa', value: 'villa' },
    { label: 'Yazlık', value: 'yazlık' },
    { label: 'Müstakil Ev', value: 'müstakil ev' },
    { label: 'Residence', value: 'residence' }
  ];

  const typeOptions = [
    { label: 'Kiralık', value: 'kiralik' },
    { label: 'Satılık', value: 'satilik' }
  ];

  const roomOptions = [
    { label: 'Tümü', value: 'Tümü' },
    { label: 'Stüdyo (1+0)', value: 'Stüdyo (1+0)' },
    { label: '1+1', value: '1+1' },
    { label: '1.5+1', value: '1.5+1' },
    { label: '2+0', value: '2+0' },
    { label: '2+1', value: '2+1' },
    { label: '2.5+1', value: '2.5+1' },
    { label: '2+2', value: '2+2' },
    { label: '3+0', value: '3+0' },
    { label: '3+1', value: '3+1' },
    { label: '3.5+1', value: '3.5+1' },
    { label: '3+2', value: '3+2' },
    { label: '3+3', value: '3+3' },
    { label: '4+0', value: '4+0' },
    { label: '4+1', value: '4+1' },
    { label: '4.5+1', value: '4.5+1' },
    { label: '4.5+2', value: '4.5+2' },
    { label: '4+2', value: '4+2' },
    { label: '4+3', value: '4+3' },
    { label: '4+4', value: '4+4' },
    { label: '5+1', value: '5+1' },
    { label: '5.5+1', value: '5.5+1' },
    { label: '5+2', value: '5+2' },
    { label: '5+3', value: '5+3' },
    { label: '5+4', value: '5+4' },
    { label: '6+1', value: '6+1' },
    { label: '6+2', value: '6+2' },
    { label: '6.5+1', value: '6.5+1' },
    { label: '6+3', value: '6+3' },
    { label: '6+4', value: '6+4' },
    { label: '7+1', value: '7+1' },
    { label: '7+2', value: '7+2' },
    { label: '7+3', value: '7+3' },
    { label: '8+1', value: '8+1' },
    { label: '8+2', value: '8+2' },
    { label: '8+3', value: '8+3' },
    { label: '8+4', value: '8+4' },
    { label: '9+1', value: '9+1' },
    { label: '9+2', value: '9+2' },
    { label: '9+3', value: '9+3' },
    { label: '9+4', value: '9+4' },
    { label: '9+5', value: '9+5' },
    { label: '9+6', value: '9+6' },
    { label: '10+1', value: '10+1' },
    { label: '10+2', value: '10+2' },
    { label: '10 Üzeri', value: '10 Üzeri' }
  ];

  return (
    <div style={{ 
      backgroundImage: 'url(https://izcelikyapi.com/wp-content/uploads/2022/05/iki-katli-celik-ev-modelleri.webp)', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center', 
      height: '100vh', 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center',
      color: 'white',
      position: 'relative'
    }}>
      <div style={{ textAlign: 'center', width: '80%' }}>
        <h1 style={{ fontSize: '48px', fontWeight: 'bold' }}>HAYALİNDEKİ EVİ BUL</h1>
        <Form layout="vertical" onFinish={handleFilter} style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px' }}>
          <Form.Item name="name">
            <Input placeholder="İlan Başlığı" />
          </Form.Item>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item name="minPrice">
                <Input placeholder="Min Fiyat" type="number" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="maxPrice">
                <Input placeholder="Max Fiyat" type="number" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="city">
                <Select placeholder="İl seçin" onChange={setSelectedCityId} style={{ width: '100%' }}>
                  {cities.map(city => (
                    <Option key={city.id} value={city.id}>
                      {city.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="district">
                <Select placeholder="İlçe seçin" loading={loadingDistricts} disabled={!selectedCityId} style={{ width: '100%' }}>
                  {districts.map(district => (
                    <Option key={district.id} value={district.name}>
                      {district.name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={[16, 16]}>
            <Col span={6}>
              <Form.Item name="category">
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Kategori seçin"
                  options={categoryOptions}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="type">
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Tür seçin"
                  options={typeOptions}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item name="rooms">
                <Select
                  mode="multiple"
                  style={{ width: '100%' }}
                  placeholder="Oda Sayısı"
                  options={roomOptions}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>Ara</Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default Home;
