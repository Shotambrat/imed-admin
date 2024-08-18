import React from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

const VerticalCarousel = ({ images, onGalleryUpdate }) => {
  const galleryItems = images.map((src) => ({
    original: src,
    thumbnail: src,
  }));

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImage = URL.createObjectURL(file);
      onGalleryUpdate([...images, newImage]);
    }
  };

  return (
    <div className="w-full">
      <ImageGallery
        items={galleryItems}
        showThumbnails={true}
        showFullscreenButton={true}
        showPlayButton={false}
        showNav={false}
      />
      <div className="mt-4 flex justify-center">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="cursor-pointer px-4 py-2 bg-blue-500 text-white rounded"
        >
          Загрузить изображение
        </label>
      </div>
    </div>
  );
};

export default VerticalCarousel;