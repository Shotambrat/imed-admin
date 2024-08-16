"use client";
import { useState, useEffect } from "react";
import globus from "@/public/images/aboutUs/partners/globus.svg";
import Image from "next/image";

export default function PartnersInfo({
  setCreatedList,
  activeItem,
  setActiveItem,
  languages,
  activeLang,
  setActiveLang,
}) {
  const [modalOpen, setModalOpen] = useState(false);
  const [localName, setLocalName] = useState(activeItem.name || "");
  const [localNote, setLocalNote] = useState({ ...activeItem.note });
  const [localAbout, setLocalAbout] = useState({ ...activeItem.about });
  const [localWebsite, setLocalWebsite] = useState(activeItem.website || "");
  const [localImage, setLocalImage] = useState([...activeItem.image]);

  useEffect(() => {
    setLocalName(activeItem.name || "");
    setLocalNote({ ...activeItem.note });
    setLocalAbout({ ...activeItem.about });
    setLocalWebsite(activeItem.website || "");
    setLocalImage([...activeItem.image]);
  }, [activeItem]);

  const handleSave = () => {
    setActiveItem((prevItem) => {
      const updatedItem = {
        ...prevItem,
        name: localName,
        note: localNote,
        about: localAbout,
        website: localWebsite,
        image: localImage,
      };

      setCreatedList((prevList) =>
        prevList.map((item) =>
          item.id === updatedItem.id ? updatedItem : item
        )
      );

      return updatedItem;
    });

    setModalOpen(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLocalImage([file]);
    }
  };

  const handleDeleteImage = () => {
    setLocalImage([]);
  };

  const formattedWebsite = localWebsite.replace(/^https?:\/\/([^\/]+).*/, '$1');

  return (
    <div className="w-full flex flex-col gap-12">
      <div className="flex gap-4">
        {languages.map((lang, index) => (
          <button
            key={index}
            className={`font-medium border px-4 py-2 rounded-lg text-xl border-red-300 ${
              lang === activeLang ? "bg-redMain text-white" : ""
            }`}
            onClick={() => setActiveLang(lang)}
          >
            {lang.toUpperCase()}
          </button>
        ))}
      </div>
      <div className="mx-full px-4">
        <div className="border-b pb-[25px]">
          <h1 className="text-[25px] mdx:text-[30px] mdl:text-[35px] xl:text-[50px] font-semibold mb-2">
            {localName}
          </h1>

          <h2 className="text-[12px] max-w-[820px] mdx:text-[16px] text-[#808080] font-semibold mb-4">
            {localNote[activeLang]}
          </h2>
          <p className=" whitespace-pre-line mt-[20px] xl:mt-[40px] text-[15px] mdx:text-[18px] mdl:text-[18px]">
            {localAbout[activeLang]}
          </p>
        </div>
        <div className="flex flex-row justify-between items-center h-auto mt-[20px]">
          <a href={localWebsite} className="bg-[#FCE8E9] py-[15px] px-[20px] mdx:py-[20px] xl:px-[20px] h-full rounded-md flex items-center text-[14px] mdx:text-[16px] mdl:text-[18px] xl:text-[20px] text-[#E31E24]">
            <Image
              src={globus}
              alt="Icon"
              width={24}
              height={24}
              className="mr-2"
            />
            {formattedWebsite}
          </a>
          <div className="w-auto h-auto relative max-w-[110px] mdx:max-w-[224px]">
            {localImage.length > 0 && (
              <Image
                src={
                  typeof localImage[0] === "string"
                    ? localImage[0]
                    : URL.createObjectURL(localImage[0])
                }
                alt={localName}
                width={224} // Задайте необходимую ширину
                height={224} // Задайте необходимую высоту
                objectFit="contain"
              />
            )}
          </div>
        </div>
        <button
          onClick={() => setModalOpen(true)}
          className="px-12 py-3 text-white bg-red-500 mt-8"
        >
          Редактировать
        </button>
      </div>

      {modalOpen && (
        <div className="fixed inset-0 h-screen w-full bg-modalBg flex justify-center items-center">
          <div className="w-full max-w-[500px] relative flex flex-col gap-8 px-4 bg-white py-8">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-2xl font-bold"
            >
              X
            </button>
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
            <div>
              <label className="block text-sm font-medium mb-2">Название</label>
              <input
                type="text"
                value={localName}
                onChange={(e) => setLocalName(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Заметка</label>
              <textarea
                value={localNote[activeLang]}
                onChange={(e) =>
                  setLocalNote({ ...localNote, [activeLang]: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">О партнёре</label>
              <textarea
                value={localAbout[activeLang]}
                onChange={(e) =>
                  setLocalAbout({ ...localAbout, [activeLang]: e.target.value })
                }
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Вебсайт</label>
              <input
                type="text"
                value={localWebsite}
                onChange={(e) => setLocalWebsite(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Фото</label>
              <div className="flex gap-2">
                {localImage.length > 0 && (
                  <div className="relative">
                    <Image
                      src={
                        typeof localImage[0] === "string"
                          ? localImage[0]
                          : URL.createObjectURL(localImage[0])
                      }
                      alt="Фото партнёра"
                      width={80}
                      height={80}
                    />
                    <button
                      onClick={handleDeleteImage}
                      className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1"
                    >
                      X
                    </button>
                  </div>
                )}
                <label className="cursor-pointer flex items-center justify-center w-20 h-20 border border-dashed border-gray-300 rounded">
                  <span className="text-xl">+</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>
            <div>
              <button
                className="px-12 py-3 bg-redMain text-white"
                onClick={handleSave}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}