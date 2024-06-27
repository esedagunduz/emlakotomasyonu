import React, { useState } from 'react';
import { Form, Input, Button, Row, Col, message } from 'antd';

const Contact = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = (values) => {
    setLoading(true);
    
    setTimeout(() => {
      setLoading(false);
      message.success('Mesajınız başarıyla gönderildi!');
      form.resetFields();
    }, 2000);//fonks 2 saniye sonra geri çağırıldı timeout
  };

  return (
    <div style={{ padding: '40px', background: 'white', textAlign: 'center' }}>
      <h2 style={{ marginBottom: '40px' }}>İletişim</h2>
      <Row gutter={16} justify="center">
        <Col span={8}>
          <div style={{ textAlign: 'left' }}>
            <p><strong>Adresimiz:</strong> Cengiz Topel Caddesi, No: 18/A
              Etiler, Beşiktaş
              İstanbul, Türkiye</p>
            <p><strong>Çalışma Saatlerimiz:</strong> Pazartesi-Cuma: 09:00 - 23:00 </p>
            <p><strong>Email:</strong> Querencia@gmail.com</p>
            <p><strong>Telefon Numaramız:</strong> +905321234567</p>
          </div>
        </Col>
        <Col span={12}>
          <Form layout="vertical" form={form} onFinish={handleSubmit}>
            <Form.Item
              label="Adınız ve Soyadınız"
              name="name"
              rules={[{ required: true, message: 'Lütfen adınızı ve soyadınızı giriniz.' }]}
            >
              <Input placeholder="Adınız ve Soyadınız" />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: 'email', message: 'Lütfen geçerli bir email adresi giriniz.' }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              label="Mesaj"
              name="message"
              rules={[{ required: true, message: 'Lütfen mesajınızı giriniz.' }]}
            >
              <Input.TextArea rows={4} placeholder="Mesaj" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>Gönder</Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Contact;
