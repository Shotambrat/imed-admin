"use client";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function AboutEvent({
  setCreatedList,
  activeId,
  createdList,
  activeLang,
  setActiveLang,
  activeItem,
  languages,
}) {
  const [editModal, setEditModal] = useState(false);
  const [optionsArr, setOptionsArr] = useState([]);

  useEffect(() => {
    const activeItem = createdList.find((item) => item.id === activeId);
    if (activeItem) {
      setOptionsArr(activeItem.abouts || []);
    }
  }, [createdList, activeId, activeLang]);

  const handleSaveOption = (index, updatedOption) => {
    const updatedOptionsArr = [...optionsArr];
    updatedOptionsArr[index] = updatedOption;

    const updatedItem = {
      ...activeItem,
      abouts: updatedOptionsArr,
    };

    setOptionsArr(updatedOptionsArr);
    setCreatedList((prevList) =>
      prevList.map((item) =>
        item.id === activeItem.id ? updatedItem : item
      )
    );
  };

  const handleAddOption = () => {
    const newOption = {
      title: {
        uz: "",
        ru: "",
        en: "",
      },
      text: {
        uz: "",
        ru: "",
        en: "",
      },
    };

    const updatedOptionsArr = [...optionsArr, newOption];

    const updatedItem = {
      ...activeItem,
      abouts: updatedOptionsArr,
    };

    setOptionsArr(updatedOptionsArr);
    setCreatedList((prevList) =>
      prevList.map((item) =>
        item.id === activeItem.id ? updatedItem : item
      )
    );
  };

  const handleDeleteOption = (index) => {
    const updatedOptionsArr = optionsArr.filter((_, i) => i !== index);

    const updatedItem = {
      ...activeItem,
      abouts: updatedOptionsArr,
    };

    setOptionsArr(updatedOptionsArr);
    setCreatedList((prevList) =>
      prevList.map((item) =>
        item.id === activeItem.id ? updatedItem : item
      )
    );
  };

  const handleSaveAndCloseModal = () => {
    setEditModal(false);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-1 px-2">
      {editModal && (
        <div className="fixed inset-0 h-screen w-full bg-modalBg flex justify-center items-center z-[999]">
          <div className="w-full max-w-[500px] relative flex flex-col gap-8 px-4 bg-white py-8 h-[90%] overflow-y-scroll no-scrollbar">
            <button
              onClick={() => setEditModal(false)}
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
            <div className=" flex flex-col gap-4">
              {optionsArr.map((option, index) => (
                <div key={index}>
                  <div className="flex w-full justify-between">
                    <h2 className="text-xl font-semibold text-[24px]">
                      Заголовок
                    </h2>
                    <button
                      className="text-xl font-semibold text-[24px] text-redMain underline"
                      onClick={() => handleDeleteOption(index)}
                    >
                      Удалить
                    </button>
                  </div>
                  <input
                    type="text"
                    value={option.title[activeLang]}
                    onChange={(e) => {
                      const updatedOption = {
                        ...option,
                        title: {
                          ...option.title,
                          [activeLang]: e.target.value,
                        },
                      };
                      handleSaveOption(index, updatedOption);
                    }}
                    className="border border-gray-300 rounded-md w-full p-4 mt-4"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-[24px]">Текст</h2>
                    <textarea
                      value={option.text[activeLang]}
                      onChange={(e) => {
                        const updatedOption = {
                          ...option,
                          text: {
                            ...option.text,
                            [activeLang]: e.target.value,
                          },
                        };
                        handleSaveOption(index, updatedOption);
                      }}
                      className="border border-gray-300 rounded-md w-full p-4 mt-4"
                      rows="4"
                    />
                  </div>
                  <hr />
                </div>
              ))}
            </div>
            <button
              className="flex text-redMain gap-4 text-xl"
              onClick={handleAddOption}
            >
              +<p>Добавить блок</p>
            </button>
            <div>
              <button
                className="px-12 py-3 bg-redMain text-white"
                onClick={handleSaveAndCloseModal}
              >
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="xl:flex xl:flex-row-reverse overflow-visible relative">
        <div className="bg-[#F4F7FE] p-6 w-full sticky top-0 self-start xl:w-1/4 xl:ml-5 xl:flex xl:flex-col xl:justify-between">
          <div>
            <p className="flex flex-col font-semibold border-b-[1px] mb-4 pb-2 mdx:text-[22px] xl:text-[24px]">
              <strong className="text-[#BABABA] font-normal mdx:text-[20px]">
                Дата
              </strong>{" "}
              {activeItem.dateFrom[activeLang]} - {activeItem.dateTo[activeLang]}
            </p>
            <p className="flex flex-col font-semibold border-b-[1px] mb-4 pb-2 mdx:text-[22px] xl:text-[24px]">
              <strong className="text-[#BABABA] font-normal mdx:text-[20px]">
                Время
              </strong>{" "}
              {activeItem.timeFrom} - {activeItem.timeTo}
            </p>
            <p className="flex flex-col font-semibold border-b-[1px] mb-4 pb-2 mdx:text-[22px] xl:text-[24px]">
              <strong className="text-[#BABABA] font-normal mdx:text-[20px]">
                Адрес
              </strong>{" "}
              {activeItem.address[activeLang]}
            </p>
          </div>
        </div>
        <div className="mb-[100px] mdx:mb-[150px] xl:mb-[180px] xl:w-3/4">
          {optionsArr.map((option, index) => (
            <div key={index} className="mb-8">
              <h3 className={`text-[20px] ${index == 0 ? 'mdx:text-[38px]' : 'mdx:text-[27px]'} font-semibold mb-[16px] text-[#252324]`}>
                {option.title[activeLang]}
              </h3>
              <p className="text-[15px] mdx:text-[18px] mdl:text-[20px] whitespace-pre-line">
                {option.text[activeLang]}
              </p>
            </div>
          ))}
          <button
            onClick={() => setEditModal(true)}
            className="mt-4 w-full mdx:max-w-[296px] bg-[#E94B50] hover:bg-[#EE787C] py-3 px-4 text-white"
          >
            Редактировать
          </button>
        </div>
      </div>
    </div>
  );
}