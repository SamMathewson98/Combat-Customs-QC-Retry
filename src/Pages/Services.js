import React from 'react';
import Navi from '../Components/Navi';
import ServicesComponent from '../Components/ServicesComponent'
import Footer from '../Components/Footer';
import '../Components/OverallStyleSheet.css';

function Services() {
  return (
    <div className='body'>
      <div>
        <Navi style={{ zIndex: 1 }}/>
      </div>
      {/* Top section: ServicesComponent */}
      <div style={{ marginBottom: '20px' }}>
        <ServicesComponent />
      </div>
      <Footer />
    </div>
  );
}

export default Services;