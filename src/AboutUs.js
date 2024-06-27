import React from 'react';

const AboutUs = () => {
  return (
    <div style={{ 
      padding: '50px', 
      background: `url('https://wallpapers.com/images/featured/new-york-aesthetic-hdj6cfehppy286jt.jpg') center center / cover no-repeat`, 
      color: 'white', 
      textAlign: 'center',
      backgroundSize: 'cover',
      position: 'relative',
      overflow: 'hidden',
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
      backgroundBlendMode: 'darken',
    }}>
      <div style={{ background: 'rgba(0, 0, 0, 0.5)', padding: '50px', borderRadius: '10px' }}>
        <h1>"QUERENCIA"</h1>
        <h2>Kendini bulabildiğin, rahat olduğun, en güvende hissettiğin yer</h2>
        <p>QUERENCIA, İspanyolca'da insanın kendini en güvende, güçlü ve rahat hissettiği, kendi olabildiği, yuvası gibi gördüğü yer anlamına gelir. Biz de bu anlayışla, müşterilerimize hayallerindeki yuvaları bulmaları için hizmet veriyoruz. Emlak sektöründeki tecrübemiz ve profesyonel ekibimizle, ev arayışınızı keyifli ve stressiz bir deneyime dönüştürmeyi amaçlıyoruz.</p>
        <h3>Vizyonumuz</h3>
        <p>QUERENCIA olarak, emlak sektöründe güvenilir ve yenilikçi bir marka olmayı hedefliyoruz. Modern teknolojileri ve pazarlama stratejilerini kullanarak, müşterilerimize en iyi hizmeti sunuyoruz. Her zaman daha iyisini yapmak için çalışıyoruz.</p>
        <h3>Misyonumuz</h3>
        <p>Misyonumuz, müşterilerimizin kendilerini en güvende ve rahat hissedecekleri yuvaları bulmalarına yardımcı olmaktır. Dürüst, şeffaf ve müşteri odaklı hizmet anlayışımızla, emlak sektöründe fark yaratmayı amaçlıyoruz.</p>
        <p>QUERENCIA ailesine katılın ve hayallerinizdeki evi bulmanın keyfini yaşayın. Sizin için buradayız!</p>
      </div>
    </div>
  );
};

export default AboutUs;
