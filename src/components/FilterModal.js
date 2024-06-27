import React, { useState, useEffect } from 'react';
import { Modal, Button, Checkbox, Input, Slider, Select, message } from 'antd';
import axios from 'axios';

const { Option } = Select;

const FilterModal = () => {
  const [visible, setVisible] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedCityId, setSelectedCityId] = useState(null);
  const [loadingDistricts, setLoadingDistricts] = useState(false);
  const [selectedItems, setSelectedItems] = useState([]);

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setVisible(false);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handlePriceChange = (value) => {
    setPriceRange(value);
  };

  const handleCityChange = (value) => {
    setSelectedCityId(value);
  };

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await axios.get(
          'https://v1.nocodeapi.com/ebr123/google_sheets/MBXXeYjRrYchwfWk?tabId=iller&filterValue=SEHİRLER'
        );
        setCities(response.data.data);
      } catch (error) {
        console.error('İller alınırken hata oluştu:', error);
        message.error('İller alınırken hata oluştu.');
      }
    };
    fetchCities();
  }, []);

  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedCityId) return;
      setLoadingDistricts(true);
      try {
        const response = await axios.get(
          `https://v1.nocodeapi.com/ebr123/google_sheets/MBXXeYjRrYchwfWk?tabId=ilceler&filterValue=il_id`
        );
        const filteredDistricts = response.data.data.filter(item => item.il_id === selectedCityId);
        setDistricts(filteredDistricts.map(item => item.ilceler));
      } catch (error) {
        console.error('İlçeler alınırken hata oluştu:', error);
        message.error('İlçeler alınırken hata oluştu.');
      } finally {
        setLoadingDistricts(false);
      }
    };
    fetchDistricts();
  }, [selectedCityId]);

  const roomOptions = [
    'Tümü', 'Stüdyo (1+0)', '1+1', '1.5+1', '2+0', '2+1', '2.5+1', '2+2', '3+0', '3+1', '3.5+1', 
    '3+2', '3+3', '4+0', '4+1', '4.5+1', '4.5+2', '4+2', '4+3', '4+4', '5+1', '5.5+1', '5+2', 
    '5+3', '5+4', '6+1', '6+2', '6.5+1', '6+3', '6+4', '7+1', '7+2', '7+3', '8+1', '8+2', '8+3', 
    '8+4', '9+1', '9+2', '9+3', '9+4', '9+5', '9+6', '10+1', '10+2', '10 Üzeri'
  ];

  return (
    <>
      <Button onClick={showModal}>Filtrele</Button>
      <Modal
        title="Filtreleme Seçenekleri"
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form layout="vertical">
          <Form.Item label="Kategori">
            <Select placeholder="Kategori seçin">
              <Option value="daire">Daire</Option>
              <Option value="villa">Villa</Option>
              <Option value="yazlık">Yazlık</Option>
              <Option value="müstakil ev">Müstakil Ev</Option>
              <Option value="residence">Residence</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Tür">
            <Select placeholder="Tür seçin">
              <Option value="kiralik">Kiralık</Option>
              <Option value="satilik">Satılık</Option>
            </Select>
          </Form.Item>
          <Form.Item label="Oda Sayısı">
            <Select placeholder="Oda sayısı seçin" style={{ width: '100%' }}>
              {roomOptions.map((option, index) => (
                <Option key={index} value={option}>{option}</Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Fiyat Aralığı">
            <Slider
              range
              min={0}
              max={500000}
              step={1000}
              defaultValue={[0, 500000]}
              onChange={handlePriceChange}
              value={priceRange}
            />
          </Form.Item>
          <Form.Item label="İl">
            <Select style={{ width: '100%' }} placeholder="İl seçin" onChange={handleCityChange}>
              {cities.map(city => (
                <Option key={city.id} value={city.id}>
                  {city.SEHİRLER}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="İlçe">
            <Select
              style={{ width: '100%' }}
              placeholder="İlçe seçin"
              loading={loadingDistricts}
              disabled={!selectedCityId}
            >
              {districts.map((district, index) => (
                <Option key={index} value={district}>
                  {district}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default FilterModal;
