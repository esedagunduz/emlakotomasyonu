import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Upload, Select, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const { Option } = Select;

const PropertyInputPage = ({ onNewProperty, onUpdateProperty, currentProperty }) => {
  const [fileList, setFileList] = useState([]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedRooms, setSelectedRooms] = useState(null);

  const [form] = Form.useForm();

  useEffect(() => {
    if (currentProperty) {
      form.setFieldsValue({
        name: currentProperty.ilanbaslik,
        description: currentProperty.ilanaciklama,
        price: currentProperty.fiyat,
        district: currentProperty.ilce,
        category: currentProperty.kategori,
        type: currentProperty.tur,
        rooms: currentProperty.odaSayisi,
      });
      setSelectedCityId(currentProperty.il);
      setSelectedCategory(currentProperty.kategori);
      setSelectedType(currentProperty.tur);
      setSelectedRooms(currentProperty.odaSayisi);
      setFileList(currentProperty.photos || []);
    }
  }, [currentProperty, form]);

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

  const handleUpload = ({ fileList }) => {
    setFileList(fileList);
  };

  const handleCityChange = (value) => {
    setSelectedCityId(value);
    setDistricts([]); // İl değiştiğinde ilçeleri temizle
  };

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleTypeChange = (value) => {
    setSelectedType(value);
  };

  const handleRoomsChange = (value) => {
    setSelectedRooms(value);
  };

  const handleSubmit = (values) => {
    try {
      const propertyData = {
        id: currentProperty ? currentProperty.id : new Date().getTime(), // ID veriyoruz
        ilanbaslik: values.name,
        ilanaciklama: values.description,
        fiyat: values.price,
        il: selectedCityId,
        ilce: values.district,
        kategori: selectedCategory,
        tur: selectedType,
        odaSayisi: selectedRooms,
        photos: fileList.map(file => ({
          uid: file.uid,
          name: file.name,
          status: file.status,
          url: file.url || URL.createObjectURL(file.originFileObj),
        })),
      };

      let storedProperties = JSON.parse(localStorage.getItem('properties')) || [];
      if (currentProperty) {
        const index = storedProperties.findIndex(prop => prop.id === currentProperty.id);
        storedProperties[index] = propertyData;
        onUpdateProperty(propertyData);  // Güncellenmiş veriyi geç
      } else {
        storedProperties.push(propertyData);
        onNewProperty(propertyData);
      }
      localStorage.setItem('properties', JSON.stringify(storedProperties));

      message.success('Veri başarıyla kaydedildi');
      form.resetFields();
      setFileList([]);
    } catch (error) {
      console.error('Veri kaydedilirken hata oluştu:', error);
      message.error('Veri kaydedilirken bir hata oluştu');
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h1>Emlak Bilgilerini Girin</h1>
      <Form layout="vertical" onFinish={handleSubmit} form={form}>
        <Form.Item label="İlan Başlığı" name="name" rules={[{ required: true, message: 'Lütfen ilan başlığını girin.' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="İlan Açıklaması" name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Fiyat" name="price" rules={[{ required: true, message: 'Lütfen fiyatı girin.' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="İl" name="city">
          <Select style={{ width: '100%' }} placeholder="İl seçin" onChange={handleCityChange}>
            {cities.map(city => (
              <Option key={city.id} value={city.id}>
                {city.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="İlçe" name="district">
          <Select style={{ width: '100%' }} placeholder="İlçe seçin" loading={loadingDistricts} disabled={!selectedCityId}>
            {districts.map((district, index) => (
              <Option key={index} value={district.name}>
                {district.name}
              </Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="Kategori" name="category" rules={[{ required: true, message: 'Lütfen kategoriyi seçin.' }]}>
          <Select onChange={handleCategoryChange}>
            <Option value="daire">Daire</Option>
            <Option value="villa">Villa</Option>
            <Option value="yazlık">Yazlık</Option>
            <Option value="müstakil ev">Müstakil Ev</Option>
            <Option value="residence">Residence</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Tür" name="type" rules={[{ required: true, message: 'Lütfen türü seçin.' }]}>
          <Select onChange={handleTypeChange}>
            <Option value="kiralik">Kiralık</Option>
            <Option value="satilik">Satılık</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Oda Sayısı" name="rooms" rules={[{ required: true, message: 'Lütfen oda sayısını seçin.' }]}>
          <Select onChange={handleRoomsChange}>
            <Option value="Tümü">Tümü</Option>
            <Option value="Stüdyo (1+0)">Stüdyo (1+0)</Option>
            <Option value="1+1">1+1</Option>
            <Option value="1.5+1">1.5+1</Option>
            <Option value="2+0">2+0</Option>
            <Option value="2+1">2+1</Option>
            <Option value="2.5+1">2.5+1</Option>
            <Option value="2+2">2+2</Option>
            <Option value="3+0">3+0</Option>
            <Option value="3+1">3+1</Option>
            <Option value="3.5+1">3.5+1</Option>
            <Option value="3+2">3+2</Option>
            <Option value="3+3">3+3</Option>
            <Option value="4+0">4+0</Option>
            <Option value="4+1">4+1</Option>
            <Option value="4.5+1">4.5+1</Option>
            <Option value="4.5+2">4.5+2</Option>
            <Option value="4+2">4+2</Option>
            <Option value="4+3">4+3</Option>
            <Option value="4+4">4+4</Option>
            <Option value="5+1">5+1</Option>
            <Option value="5.5+1">5.5+1</Option>
            <Option value="5+2">5+2</Option>
            <Option value="5+3">5+3</Option>
            <Option value="5+4">5+4</Option>
            <Option value="6+1">6+1</Option>
            <Option value="6+2">6+2</Option>
            <Option value="6.5+1">6.5+1</Option>
            <Option value="6+3">6+3</Option>
            <Option value="6+4">6+4</Option>
            <Option value="7+1">7+1</Option>
            <Option value="7+2">7+2</Option>
            <Option value="7+3">7+3</Option>
            <Option value="8+1">8+1</Option>
            <Option value="8+2">8+2</Option>
            <Option value="8+3">8+3</Option>
            <Option value="8+4">8+4</Option>
            <Option value="9+1">9+1</Option>
            <Option value="9+2">9+2</Option>
            <Option value="9+3">9+3</Option>
            <Option value="9+4">9+4</Option>
            <Option value="9+5">9+5</Option>
            <Option value="9+6">9+6</Option>
            <Option value="10+1">10+1</Option>
            <Option value="10+2">10+2</Option>
            <Option value="10 Üzeri">10 Üzeri</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Fotoğraf Yükle">
          <Upload
            fileList={fileList}
            onChange={handleUpload}
            beforeUpload={() => false}
            listType="picture"
            multiple
          >
            <Button icon={<UploadOutlined />}>Fotoğraf Seç</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            {currentProperty ? 'Güncelle' : 'Kaydet'}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default PropertyInputPage;
