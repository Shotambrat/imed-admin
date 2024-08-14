import React, { useState, useEffect } from "react";
import Image from "next/image";

export default function NewsInfo({
  activeItem,
  setActiveItem,
  languages,
  activeLang,
  setActiveLang,
  setCreatedList,
}) {
  const [headModal, setHeadModal] = useState(false);
  const [optionModal, setOptionModal] = useState(false);
  const [localHeading, setLocalHeading] = useState({ ...activeItem.head.heading });
  const [localText, setLocalText] = useState({ ...activeItem.head.text });
  const [localImages, setLocalImages] = useState([...activeItem.head.image]);

  const [localOptions, setLocalOptions] = useState([...activeItem.newOption]);

  useEffect(() => {
    // Обновляем локальное состояние при выборе нового активного элемента
    setLocalHeading({ ...activeItem.head.heading });
    setLocalText({ ...activeItem.head.text });
    setLocalImages([...activeItem.head.image]);
    setLocalOptions([...activeItem.newOption]);
  }, [activeItem]);

  const handleSave = () => {
    setActiveItem((prevItem) => {
      const updatedItem = {
        ...prevItem,
        head: {
          ...prevItem.head,
          heading: localHeading,
          text: localText,
          image: localImages,
        },
        newOption: localOptions,
      };

      setCreatedList((prevList) =>
        prevList.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );

      return updatedItem;
    });

    setHeadModal(false);
    setOptionModal(false);
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => URL.createObjectURL(file));
    setLocalImages([...localImages, ...images]);
  };

  const handleDeleteImage = (index) => {
    const updatedImages = localImages.filter((_, i) => i !== index);
    setLocalImages(updatedImages);
  };

  const handleOptionChange = (index, field, value) => {
    const updatedOptions = localOptions.map((option, i) =>
      i === index
        ? {
            ...option,
            [field]: {
              ...option[field],
              [activeLang]: value,
            },
          }
        : option
    );
    setLocalOptions(updatedOptions);
  };

  const handleOptionImageChange = (index, e) => {
    const files = Array.from(e.target.files);
    const images = files.map((file) => URL.createObjectURL(file));
    const updatedOptions = localOptions.map((option, i) =>
      i === index ? { ...option, image: [...option.image, ...images] } : option
    );
    setLocalOptions(updatedOptions);
  };

  const handleDeleteOptionImage = (optionIndex, imageIndex) => {
    const updatedOptions = localOptions.map((option, i) =>
      i === optionIndex
        ? {
            ...option,
            image: option.image.filter((_, imgIndex) => imgIndex !== imageIndex),
          }
        : option
    );
    setLocalOptions(updatedOptions);
  };

  const handleAddOption = () => {
    const newOption = {
      heading: {
        uz: "",
        ru: "",
        en: "",
      },
      text: {
        uz: "",
        ru: "",
        en: "",
      },
      image: [],
      orderNum: localOptions.length + 1,
    };
    setLocalOptions([...localOptions, newOption]);
  };

  return (
    <div className="w-full flex flex-col gap-12">
      {headModal && (
        <div className="fixed bg-modalBg inset-0 flex justify-center items-center">
          <div className="max-w-[800px] w-full relative bg-white rounded-lg shadow-lg p-6">
            <button
              onClick={() => setHeadModal(false)}
              className="top-4 right-4 absolute text-2xl font-bold"
            >
              X
            </button>
            <div className="bg-snowy py-4 px-4 text-2xl font-semibold">
              Редактировать блок
            </div>
            <div className="flex gap-4 mb-4">
              {languages.map((lang, index) => (
                <button
                  key={index}
                  className={`font-medium border px-4 pt-1 pb-2 rounded-lg text-xl border-red-300 ${
                    lang === activeLang ? "bg-redMain text-white" : ""
                  }`}
                  onClick={() => setActiveLang(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="w-full py-4">
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Заголовок</label>
                <input
                  type="text"
                  value={localHeading[activeLang]}
                  onChange={(e) =>
                    setLocalHeading({
                      ...localHeading,
                      [activeLang]: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Текст</label>
                <textarea
                  value={localText[activeLang]}
                  onChange={(e) =>
                    setLocalText({
                      ...localText,
                      [activeLang]: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium mb-2">Фото (необязательно)</label>
                <div className="flex gap-2">
                  {localImages.map((image, index) => (
                    <div key={index} className="relative">
                      <Image src={image} alt={`Фото ${index}`} width={80} height={80} />
                      <button
                        onClick={() => handleDeleteImage(index)}
                        className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                      >
                        X
                      </button>
                    </div>
                  ))}
                  <label className="cursor-pointer flex items-center justify-center w-20 h-20 border border-dashed border-gray-300 rounded">
                    <span className="text-xl">+</span>
                    <input
                      type="file"
                      className="hidden"
                      multiple
                      onChange={handleImageChange}
                    />
                  </label>
                </div>
              </div>
              <div className="flex justify-end gap-4 mt-6">
                <button
                  onClick={() => setHeadModal(false)}
                  className="py-2 px-4 bg-gray-300 text-black rounded"
                >
                  Отмена
                </button>
                <button
                  onClick={handleSave}
                  className="py-2 px-4 bg-blue-500 text-white rounded"
                >
                  Сохранить
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {optionModal && (
        <div className="fixed bg-modalBg inset-0 flex justify-center items-center">
          <div className="max-w-[800px] w-full h-[90%] overflow-y-scroll no-scrollbar relative bg-white rounded-lg shadow-lg p-6">
            <button
              onClick={() => setOptionModal(false)}
              className="top-4 right-4 absolute text-2xl font-bold"
            >
              X
            </button>
            <div className="bg-snowy py-4 px-4 text-2xl font-semibold">
              Редактировать блок опций
            </div>
            <div className="flex gap-4 mb-4">
              {languages.map((lang, index) => (
                <button
                  key={index}
                  className={`font-medium border px-4 pt-1 pb-2 rounded-lg text-xl border-red-300 ${
                    lang === activeLang ? "bg-redMain text-white" : ""
                  }`}
                  onClick={() => setActiveLang(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            {localOptions.map((option, index) => (
              <div key={index} className="w-full py-4">
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Заголовок опции</label>
                  <input
                    type="text"
                    value={option.heading[activeLang]}
                    onChange={(e) => handleOptionChange(index, "heading", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Текст опции</label>
                  <textarea
                    value={option.text[activeLang]}
                    onChange={(e) => handleOptionChange(index, "text", e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium mb-2">Фото опции (необязательно)</label>
                  <div className="flex gap-2">
                    {option.image.map((image, imgIndex) => (
                      <div key={imgIndex} className="relative">
                        <Image src={image} alt={`Фото опции ${imgIndex}`} width={80} height={80} />
                        <button
                          onClick={() => handleDeleteOptionImage(index, imgIndex)}
                          className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                        >
                          X
                        </button>
                      </div>
                    ))}
                    <label className="cursor-pointer flex items-center justify-center w-20 h-20 border border-dashed border-gray-300 rounded">
                      <span className="text-xl">+</span>
                      <input
                        type="file"
                        className="hidden"
                        multiple
                        onChange={(e) => handleOptionImageChange(index, e)}
                      />
                    </label>
                  </div>
                </div>
              </div>
            ))}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={() => setOptionModal(false)}
                className="py-2 px-4 bg-gray-300 text-black rounded"
              >
                Отмена
              </button>
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-blue-500 text-white rounded"
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-4">
        {languages.map((lang, index) => (
          <button
            key={index}
            className={`font-medium border px-4 pt-1 pb-2 rounded-lg text-xl border-red-300 ${
              lang === activeLang ? "bg-redMain text-white" : ""
            }`}
            onClick={() => setActiveLang(lang)}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="max-w-[800px] w-full mx-auto flex flex-col gap-8">
        <div className="w-full flex flex-col gap-2 items-start">
          <h1>{localHeading[activeLang]}</h1>
          <p>{localText[activeLang]}</p>
          <div className="w-full flex gap-2">
            {localImages.map((image, index) => (
              <Image key={index} src={image} alt={`Фото ${index}`} width={80} height={80} />
            ))}
          </div>
          <button
            onClick={() => setHeadModal(true)}
            className="px-12 py-3 text-white bg-rose-500 rounded"
          >
            Редактировать
          </button>
        </div>

        {localOptions.map((option, index) => (
          <div key={index} className="w-full flex flex-col gap-2 items-start">
            <h2>{option.heading[activeLang]}</h2>
            <p>{option.text[activeLang]}</p>
            <div className="w-full flex gap-2">
              {option.image.map((image, imgIndex) => (
                <Image key={imgIndex} src={image} alt={`Фото опции ${imgIndex}`} width={80} height={80} />
              ))}
            </div>
            <button
              onClick={() => setOptionModal(true)}
              className="px-12 py-3 text-white bg-rose-500 rounded"
            >
              Редактировать опцию
            </button>
          </div>
        ))}

        <button
          onClick={handleAddOption}
          className="px-12 py-3 text-white bg-blue-500 rounded mt-4"
        >
          Добавить опцию
        </button>
      </div>
    </div>
  );
}