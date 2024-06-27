
export const sendEmail = async (email, favoriteProperties) => {
    try {
      const response = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, favoriteProperties })
      });
  
      if (!response.ok) {
        console.error('Response status:', response.status);
        console.error('Response text:', await response.text());
        throw new Error('E-posta gönderiminde bir hata oluştu.');
      }
  
      return response.json();
    } catch (error) {
      console.error('E-posta gönderim hatası:', error);
      throw error;
    }
  };
  