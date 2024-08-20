"use client";
import React from 'react';
import Image from 'next/image';

export default function Gallery({
  activeItem,
  handleFieldChange,
}) {
  const handleAddImage = (e) => {
    const files = Array.from(e.target.files);
    const newGallery = [...activeItem.gallery, ...files];
    handleFieldChange('gallery', newGallery);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Галерея</label>
      <input type="file" multiple onChange={handleAddImage} className="mb-4" />

      <div className="grid grid-cols-3 gap-2">
        {activeItem.gallery.map((image, index) => (
          <div key={index} className="relative">
            <Image
              src={image instanceof Blob || image instanceof File ? URL.createObjectURL(image) : image}
              alt="Client Image"
              width={100}
              height={100}
              className="w-full h-auto object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}