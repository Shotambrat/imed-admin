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

  const finalPrice =
    product.sale && product.discount > 0
      ? Math.round(product.originalPrice * (1 - product.discount / 100))
      : product.originalPrice;

  // Локализация текста "Новинка"
  const newText = {
    uz: "Yangi",
    ru: "Новинка",
    en: "New",
  };

  // Локализация текста "Техническая поддержка"
  const technicalSupportText = {
    uz: "Texnik qo'llab-quvvatlash",
    ru: "Техническая поддержка",
    en: "Technical Support",
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
              {newText[selectedLanguage]}
            </div>
          )}
        </div>
        <p className="text-neutral-500 leading-5">
          {product.shortDescription[selectedLanguage]}
        </p>
        <div className="text-3xl font-semibold text-red-500">
          {finalPrice.toLocaleString()} y.e.
          {product.sale && product.discount > 0 && (
            <span className="text-xl line-through text-gray-500 ml-4">
              {product.originalPrice.toLocaleString()} y.e.
            </span>
          )}
        </div>
        {product.sale && product.discount > 0 && (
          <div className="text-sm text-red-500">
            -{product.discount}%
          </div>
        )}
        <hr />
        <div className="w-full flex justify-between items-center">
          <div>
            <p>Гарантия от производителя</p>
            {product.technical && (
              <p>
                <a href="/maintenance" className="text-blue-500">
                  {technicalSupportText[selectedLanguage]}
                </a>
              </p>
            )}
          </div>
          <Image
            src="/path/to/logo.png" // Замени на правильный путь к логотипу
            width={100}
            height={50}
            alt="Brand Logo"
          />
        </div>
        <button
          className="py-4 px-[60px] text-sm font-semibold text-white bg-[#E94B50]"
          onClick={handleOpenEditModal}
        >
          Редактировать
        </button>
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