// src/SignUp.jsx
import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from './firebase';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignUp = async (values) => {
    const { email, password } = values;
    setLoading(true);

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      message.success('Kayıt başarılı!');
      form.resetFields();
      navigate('/login'); // Kayıt başarılı olursa giriş ekranına yönlendiriyo
    } catch (error) {
      let errorMessage = 'Kayıt başarısız!';
      if (error.code === 'auth/email-already-in-use') {
        errorMessage = 'Bu email zaten kullanılıyor.';
      } else if (error.code === 'auth/invalid-email') {
        errorMessage = 'Geçersiz email adresi.';
      } else if (error.code === 'auth/weak-password') {
        errorMessage = 'Şifre çok zayıf.';
      }
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '50px' }}>
      <h2>Kayıt Ol</h2>
      <Form form={form} layout="vertical" onFinish={handleSignUp}>
        <Form.Item label="Email" name="email" rules={[{ required: true, message: 'Lütfen email girin!' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Şifre" name="password" rules={[{ required: true, message: 'Lütfen şifre girin!' }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Kayıt Ol
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;
