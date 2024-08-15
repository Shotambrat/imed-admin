"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import newsPhoto from "@/public/images/events/eventsSignUp.png";

export default function EventSignUp({
  setCreatedList,
  activeId,
  createdList,
  activeLang,
  setActiveLang,
  activeItem,
  languages,
}) {
  const [editAdmin, setEditAdmin] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(newsPhoto);
  const [currentText, setCurrentText] = useState("");

  useEffect(() => {
    const activeItem = createdList.find((item) => item.id === activeId);
    if (activeItem) {
      setPhotoPreview(
        activeItem.photo[0]
          ? URL.createObjectURL(activeItem.photo[0])
          : newsPhoto
      );
      setCurrentText(activeItem.name[activeLang] || "");
    }
  }, [createdList, activeId, activeLang]);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const updatedList = createdList.map((item) => {
        if (item.id === activeId) {
          return {
            ...item,
            photo: [file],
          };
        }
        return item;
      });
      setCreatedList(updatedList);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handleTextChange = (e) => {
    const updatedList = createdList.map((item) => {
      if (item.id === activeId) {
        return {
          ...item,
          name: {
            ...item.name,
            [activeLang]: e.target.value,
          },
        };
      }
      return item;
    });
    setCreatedList(updatedList);
    setCurrentText(e.target.value);
  };

  const handleSave = async () => {
    const itemToSave = createdList.find((item) => item.id === activeId);

    if (itemToSave.photo[0]) {
      const formData = new FormData();
      formData.append("file", itemToSave.photo[0]);

      try {
        const response = await fetch("/api/upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          console.log("File uploaded successfully");
        } else {
          console.error("Failed to upload file");
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }

    console.log("Item saved:", itemToSave);
    setEditAdmin(false);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-1 px-2 mb-[100px] mdl:mb-[150px] xl:mb-[200px] ">
      {editAdmin && (
        <div className="fixed inset-0 h-screen w-full bg-modalBg flex justify-center items-center">
          <div className="w-full max-w-[500px] relative flex flex-col gap-8 px-4 bg-white py-8">
            <button
              onClick={() => setEditAdmin(false)}
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
              <h2 className="text-xl font-semibold text-[24px]">
                Редактировать Head
              </h2>
              <input
                type="text"
                value={currentText}
                onChange={handleTextChange}
                className="border border-gray-300 rounded-md w-full p-4 mt-4"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Фото опции (необязательно)
              </label>
              <div className="flex gap-2">
                {createdList.find((item) => item.id === activeId)?.photo[0] && (
                  <div className="relative">
                    <Image
                      src={photoPreview}
                      alt="Фото опции"
                      width={80}
                      height={80}
                    />
                    <button
                      onClick={() => {
                        const updatedList = createdList.map((item) => {
                          if (item.id === activeId) {
                            return {
                              ...item,
                              photo: [],
                            };
                          }
                          return item;
                        });
                        setCreatedList(updatedList);
                        setPhotoPreview(newsPhoto);
                      }}
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
                    onChange={handlePhotoChange}
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
      <div className="xl:flex xl:flex-row xl:gap-9 items-center">
        <div>
          <h2 className="uppercase text-[30px] font-semibold mdx:text-[38px] mdl:text-[44px] 2xl:text-[48px] mt-[52px]">
            {currentText || "Title"}
          </h2>
          <div className="flex flex-row justify-between mt-[20px] mdx:justify-normal mdx:gap-2 xl:gap-4">
            <button
              onClick={() => setEditAdmin(true)}
              className="w-[49%] bg-[#E94B50] hover:bg-[#EE787C] py-[15px] text-white font-semibold mdx:max-w-[220px]"
            >
              Редактировать
            </button>
          </div>
        </div>
        <div className="w-full mt-[40px]">
          <Image
            src={photoPreview}
            width={1000}
            height={1000}
            alt={"title"}
            objectFit="cover"
            className="object-cover w-full h-full "
          />
        </div>
      </div>
    </div>
  );
}
