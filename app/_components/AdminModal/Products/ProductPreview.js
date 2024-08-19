import { useState } from "react";
import Image from "next/image";
import VerticalCarousel from "./VerticalCarousel";
import ProductPreviewEditModal from "./ProductPreviewEditModal";

export default function ProductPreview({
  setCreatedList,
  activeItem,
  setActiveItem,
  languages,
  activeLang,
  setActiveLang,
}) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
  };

  const handleGalleryUpdate = (newGallery) => {
    setActiveItem((prevItem) => ({
      ...prevItem,
      gallery: newGallery,
    }));
  };

  const finalPrice =
    activeItem.sale && activeItem.discount > 0
      ? Math.round(activeItem.originalPrice * (1 - activeItem.discount / 100))
      : activeItem.originalPrice;

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6">
      <div className="flex-1 w-full">
        <VerticalCarousel
          images={activeItem.gallery}
          onGalleryUpdate={handleGalleryUpdate}
        />
      </div>
      <div className="w-full flex-1 flex flex-col gap-5">
        <div className="flex gap-4">
          <h1 className="text-3xl font-semibold">
            {activeItem.name[activeLang]}
          </h1>
          {activeItem.new && (
            <div className="py-2 px-5 font-bold rounded-full text-[#E31E24] bg-[#FCE8E9]">
              New
            </div>
          )}
        </div>
        <p className="text-neutral-500 leading-5">
          {activeItem.shortDescription[activeLang]}
        </p>
        <div className="text-3xl font-semibold text-red-500">
          {finalPrice.toLocaleString()} y.e.
          {activeItem.sale && activeItem.discount > 0 && (
            <span className="text-xl line-through text-gray-500 ml-4">
              {activeItem.originalPrice.toLocaleString()} y.e.
            </span>
          )}
        </div>
        {activeItem.sale && activeItem.discount > 0 && (
          <div className="text-sm text-red-500">-{activeItem.discount}%</div>
        )}
        <hr />
        <div className="w-full flex justify-between items-center">
          <div>
            <div>
              <p className="leading-5 whitespace-pre-line">
                {activeItem.condition[activeLang]}
              </p>
            </div>
            {activeItem.technical && (
              <p>
                <a href="/maintenance" className="text-blue-500">
                  Техническая поддержка
                </a>
              </p>
            )}
          </div>
          <Image
            src="/path/to/logo.png"
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
          setCreatedList={setCreatedList}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          languages={languages}
          activeLang={activeLang}
          setActiveLang={setActiveLang}
          onClose={handleCloseEditModal}
        />
      )}
    </div>
  );
}
