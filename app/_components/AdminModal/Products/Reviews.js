"use client";
import { useState } from "react";
import Image from "next/image";
import mindrayDC60 from "@/public/images/Face.png";

export default function Reviews({
  setCreatedList,
  activeItem,
  setActiveItem,
  languages,
  activeLang,
  setActiveLang,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState({
    nameDoctor: { uz: "", ru: "", en: "" },
    position: { uz: "", ru: "", en: "" },
    options: [
      {
        title: { uz: "", ru: "", en: "" },
        value: { uz: "", ru: "", en: "" },
      },
    ],
    avatarImage: "",
  });

  const [editType, setEditType] = useState(null);

  const handleOpenModal = (content = {}, type) => {
    setModalContent(
      content && content.nameDoctor
        ? content
        : {
            nameDoctor: { uz: "", ru: "", en: "" },
            position: { uz: "", ru: "", en: "" },
            options: [
              {
                title: { uz: "", ru: "", en: "" },
                value: { uz: "", ru: "", en: "" },
              },
            ],
            avatarImage: "",
          }
    );
    setEditType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent({
      nameDoctor: { uz: "", ru: "", en: "" },
      position: { uz: "", ru: "", en: "" },
      options: [
        {
          title: { uz: "", ru: "", en: "" },
          value: { uz: "", ru: "", en: "" },
        },
      ],
      avatarImage: "",
    });
    setEditType(null);
  };

  const handleChange = (e, index, field, subField) => {
    const { name, value } = e.target;
    const updatedContent = { ...modalContent };
    if (subField) {
      updatedContent[field][index][subField][name] = value;
    } else {
      updatedContent[field][name] = value;
    }
    setModalContent(updatedContent);
  };

  const handleAddBlock = () => {
    setModalContent((prevContent) => ({
      ...prevContent,
      options: [
        ...prevContent.options,
        { title: { uz: "", ru: "", en: "" }, value: { uz: "", ru: "", en: "" } },
      ],
    }));
  };

  const handleRemoveBlock = (index) => {
    const updatedContent = {
      ...modalContent,
      options: modalContent.options.filter((_, i) => i !== index),
    };
    setModalContent(updatedContent);
  };

  const handleSave = () => {
    const updatedItem = { ...activeItem };
    updatedItem.reviewsList = [
      ...updatedItem.reviewsList,
      { ...modalContent, id: new Date().getTime() },
    ];
    setActiveItem(updatedItem);
    setCreatedList((prevList) =>
      prevList.map((item) => (item.id === activeItem.id ? updatedItem : item))
    );
    handleCloseModal();
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setModalContent((prevContent) => ({
          ...prevContent,
          avatarImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const [showAll, setShowAll] = useState(false);
  const visibleReviews = showAll
    ? activeItem.reviewsList
    : activeItem.reviewsList.slice(0, 1);

  const handleEditReview = (index) => {
    const reviewToEdit = activeItem.reviewsList[index];
    setModalContent(reviewToEdit);
    setEditType("review");
    setIsModalOpen(true);
  };

  const handleDeleteReview = (index) => {
    const updatedReviews = activeItem.reviewsList.filter(
      (_, i) => i !== index
    );
    const updatedItem = { ...activeItem, reviewsList: updatedReviews };
    setActiveItem(updatedItem);
    setCreatedList((prevList) =>
      prevList.map((item) => (item.id === activeItem.id ? updatedItem : item))
    );
  };

  return (
    <div className="w-full">
      <h2 className="uppercase text-[25px] font-semibold mdx:text-[25px] mb-4">
        Рецензии от врачей
      </h2>
      {visibleReviews.map((review, index) => (
        <div key={index} className="bg-white p-6 mb-6 shadow-lg rounded-lg w-full">
          <div className="flex items-center mb-4">
            <Image
              src={review.avatarImage || mindrayDC60}
              alt="Doctor"
              width={60}
              height={60}
              className="rounded-full mr-4"
            />
            <div>
              <h2 className="text-xl font-bold">
                {review.nameDoctor[activeLang]}
              </h2>
              <h3 className="text-md text-gray-400">
                {review.position[activeLang]}
              </h3>
            </div>
          </div>
          {review.options.map((option, i) => (
            <div key={i} className="mb-4">
              <h4 className="text-lg font-semibold mb-2">
                {option.title[activeLang]}
              </h4>
              <p className="whitespace-pre-line">{option.value[activeLang]}</p>
            </div>
          ))}
          <div className="flex justify-start mt-4">
            <button
              onClick={() => handleEditReview(index)}
              className="py-2 px-4 border-redMain border text-redMain rounded mr-2"
            >
              Редактировать
            </button>
            <button
              onClick={() => handleDeleteReview(index)}
              className="py-2 px-4 bg-red-500 text-white rounded"
            >
              Удалить
            </button>
          </div>
        </div>
      ))}
      <div className="flex justify-center">
        <button
          onClick={() => setShowAll(!showAll)}
          className="bg-[#E94B50] text-white py-3 px-[35px] mdx:px-[50px]"
        >
          {showAll ? "Скрыть" : "Показать все"}
        </button>
      </div>
      <div className="flex justify-center mt-4">
        <button
          onClick={() => handleOpenModal(null, "review")}
          className="bg-[#E94B50] text-white py-3 px-[35px] mdx:px-[50px]"
        >
          Написать рецензию
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg overflow-y-scroll h-[90%]">
            <div className="flex justify-end mb-4">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-4 py-2 text-sm font-semibold ${
                    activeLang === lang
                      ? "bg-redMain text-white"
                      : "bg-white text-black"
                  } border rounded`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <h2 className="text-2xl mb-4">Редактировать рецензию</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                ФИО врача ({activeLang})
              </label>
              <input
                type="text"
                name={activeLang}
                value={modalContent.nameDoctor[activeLang] || ""}
                onChange={(e) => handleChange(e, null, "nameDoctor")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Должность врача ({activeLang})
              </label>
              <input
                type="text"
                name={activeLang}
                value={modalContent.position[activeLang] || ""}
                onChange={(e) => handleChange(e, null, "position")}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Фото врача
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-2 border border-gray-300 rounded"
              />
              {modalContent.avatarImage && (
                <div className="mt-4">
                  <Image
                    src={modalContent.avatarImage}
                    alt="Avatar Preview"
                    width={100}
                    height={100}
                    className="rounded-full"
                  />
                </div>
              )}
            </div>

            {modalContent.options.map((option, index) => (
              <div key={index} className="mb-6 border-b pb-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Заголовок ({activeLang})
                  </label>
                  <input
                    type="text"
                    name={activeLang}
                    value={option.title[activeLang] || ""}
                    onChange={(e) =>
                      handleChange(e, index, "options", "title")
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">
                    Текст ({activeLang})
                  </label>
                  <textarea
                    name={activeLang}
                    value={option.value[activeLang] || ""}
                    onChange={(e) =>
                      handleChange(e, index, "options", "value")
                    }
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <button
                  onClick={() => handleRemoveBlock(index)}
                  className="py-2 px-4 bg-red-500 text-white rounded"
                >
                  Удалить блок
                </button>
              </div>
            ))}
            <button
              onClick={handleAddBlock}
              className="py-2 px-4 bg-blue-500 text-white rounded mb-4"
            >
              Добавить блок
            </button>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-blue-500 text-white rounded"
              >
                Сохранить
              </button>
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-gray-300 text-black rounded"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
