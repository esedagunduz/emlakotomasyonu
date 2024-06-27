import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const Login = ({ setIsLoggedIn }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    const { email, password } = values;
    setLoading(true);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      message.success('Giriş başarılı!');
      setIsLoggedIn(true);
      navigate('/welcome'); // Giriş başarılı olursa Welcome sayfasına yönlendirme yapılıyor
    } catch (error) {
      message.error(`Giriş başarısız: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '50px' }}>
      <h2>Giriş Yap</h2>
      <Form form={form} layout="vertical" onFinish={handleLogin}>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Lütfen email girin!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Şifre" name="password" rules={[{ required: true, message: 'Lütfen şifre girin!' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Giriş Yap
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
