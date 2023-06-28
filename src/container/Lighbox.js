import React, { useState } from 'react';
import "./lighbox.css";
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images'

import image1 from "../image/ligh1.jpg"
import image2 from "../image/ligh2.jpg"
import image3 from "../image/ligh3.jpg"
import image4 from "../image/ligh4.jpg"
import image5 from "../image/ligh5.jpg";


const images = [
  {
    src: image1,
    width: 200,
    height: 300
  },
  {
    src: image2,
    width: 200,
    height: 300
  },
  {
    src: image3,
    width: 200,
    height: 300
    }
  ,
  {
    src: image4,
    width: 200,
    height: 300
    }
  ,
  {
    src:image5,
    width: 200,
    height: 300
  }
];
function Lighbox() {
   
    const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = (event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  };

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
    };
    
    if (!images || images.length === 0) {
    return <div>Không có ảnh để hiển thị.</div>;
    }
    
    const lighbox = (id) => {
        if (id === 0) {
            setCurrentImage(id);
            setViewerIsOpen(true);
        }
        if (id === 1) {
            setCurrentImage(id);
            setViewerIsOpen(true);
        }
        if (id === 2) {
            setCurrentImage(id);
            setViewerIsOpen(true);
        }
        if (id === 3) {
            setCurrentImage(id);
            setViewerIsOpen(true);
        }
        if (id === 4) {
            setCurrentImage(id);
            setViewerIsOpen(true);
         }
     }

    return (
       
        <div className='lightbox'>
            <div className="zoomlighbox">
                <div onClick={()=>lighbox(0)} className="zoomlighbox-item"><i className="fa-solid fa-magnifying-glass-plus"></i></div>
                <div onClick={()=>lighbox(1)} className="zoomlighbox-item"><i className="fa-solid fa-magnifying-glass-plus"></i></div>
                <div onClick={()=>lighbox(2)} className="zoomlighbox-item"><i className="fa-solid fa-magnifying-glass-plus"></i></div>
                <div onClick={()=>lighbox(3)} className="zoomlighbox-item"><i className="fa-solid fa-magnifying-glass-plus"></i></div>
                <div onClick={()=>lighbox(4)} className="zoomlighbox-item"><i className="fa-solid fa-magnifying-glass-plus"></i></div>
            </div>
      <Gallery photos={images}   onClick={openLightbox} />
      <ModalGateway>
              {viewerIsOpen ? (
                
                      
                  
          <Modal onClose={closeLightbox}>
            <Carousel currentIndex={currentImage} views={images} />
                      </Modal>
                     
        ) : null}
      </ModalGateway>
                </div>
               
  );
}

export default Lighbox;