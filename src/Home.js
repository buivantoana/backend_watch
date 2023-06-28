import React, { useEffect, useState } from 'react';
import Banner from './banner/banner';
import Container from './container/Container';
import Footer from './footer/Footer';
import Header from './header/Header';
import Loading from './loading/Loading';







function Home( {getdata}) {
const [loading, setLoading] = useState(true);
  useEffect(() => {
    // Giả định việc lấy dữ liệu từ server mất 2 giây để hoàn thành
    setTimeout(() => {
      setLoading(false);
    }, 3000);
  }, []);

  
  return (
    <div className="container">
      
      {loading ? <Loading check={ loading} /> :
        <div className='container-container-all' >
          <Header getdata={ getdata}  />
          <Banner />
          <Container />
          <Footer/>
     
        </div>
      }
  </div>
   
  )
}

export default Home;