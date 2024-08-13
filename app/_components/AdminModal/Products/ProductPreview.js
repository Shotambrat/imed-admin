import { useState } from "react";
import Image from "next/image";
import VerticalCarousel from "./ProductCarousel";
import ProductPreviewEditModal from "./ProductPreviewEditModal"; // Импорт новой модалки

export default function ProductPreview({
  product,
  selectedLanguage,
  handleProductChange,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleSaveChanges = (updatedData) => {
    handleProductChange(product.id, updatedData);
    handleCloseEditModal();
  };

  return (
    <div className="w-full flex flex-col lg:flex-row">
      <div className="flex-1 w-full">
        <VerticalCarousel images={product.gallery} />
      </div>
      <div className="w-full flex-1 flex flex-col gap-5">
        <div className="flex gap-4">
          <h1 className="text-3xl font-semibold">
            {product.name[selectedLanguage]}
          </h1>
          {product.new && (
            <div className="py-2 px-5 font-bold rounded-full text-[#E31E24] bg-[#FCE8E9]">
              Новинка
            </div>
          )}
        </div>
        <p className="text-neutral-500 leading-5">
          {product.shortDescription[selectedLanguage]}
        </p>
        <hr />
        <div className="flex gap-4">
          <button
            className="py-4 px-[60px] text-sm font-semibold text-white bg-[#E94B50]"
            onClick={handleOpenEditModal}
          >
            Редактировать
          </button>
        </div>
      </div>
      {isEditModalOpen && (
        <ProductPreviewEditModal
          product={product}
          selectedLanguage={selectedLanguage}
          onSave={handleSaveChanges}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
}
