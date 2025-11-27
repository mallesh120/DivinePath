import React, { useState } from 'react';
import './ImageGallery.css';

const ImageGallery = ({ images, godName }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (index) => {
    setSelectedImage(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + images.length) % images.length);
  };

  if (!images || images.length === 0) {
    return null;
  }

  return (
    <div className="image-gallery">
      <h3 className="gallery-title">Photo Gallery</h3>
      <div className="gallery-grid">
        {images.map((image, index) => (
          <div
            key={index}
            className="gallery-item"
            onClick={() => openModal(index)}
          >
            <img src={image} alt={`${godName} depiction ${index + 1}`} />
            <div className="gallery-overlay">
              <span className="view-icon">🔍</span>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="gallery-modal" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeModal}>
              ×
            </button>
            <button className="modal-nav modal-prev" onClick={prevImage}>
              ‹
            </button>
            <img
              src={images[selectedImage]}
              alt={`${godName} depiction ${selectedImage + 1}`}
            />
            <button className="modal-nav modal-next" onClick={nextImage}>
              ›
            </button>
            <div className="modal-counter">
              {selectedImage + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
