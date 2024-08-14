"use client";
import { useState } from "react";
import CreatedList from "../CreateList/CreatedList";
import NewsInfo from "./NewsInfo";

export default function NewsMain({ closeModal }) {
  // Инициализация переменных состояния
  const [idCounter, setIdCounter] = useState(2);
  const [activeId, setActiveId] = useState(1);

  const emptyItem = {
    head: {
      heading: {
        uz: "dd",
        ru: "SADS",
        en: "",
      },
      text: {
        uz: "",
        ru: "",
        en: "",
      },
      image: [], // Пустой массив для изображений
      orderNum: 1,
    },
    newOption: [
      {
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
        image: [], // Пустой массив для изображений
        orderNum: 1,
      },
    ],
    id: 1, // Идентификатор элемента
  };

  const [createdList, setCreatedList] = useState([{ ...emptyItem }]);
  const [activeItem, setActiveItem] = useState(createdList[0]);

  console.log(createdList)

  const handleChangeActiveId = (id) => {
    const updatedItem = createdList.find((item) => item.id === id);
    setActiveId(id);
    setActiveItem(updatedItem);
  };

  const handleAddNews = () => {
    const newItem = { ...emptyItem, id: idCounter };
    setIdCounter((prevCounter) => prevCounter + 1);
    setCreatedList((prevList) => [...prevList, newItem]);
    setActiveItem(newItem);
    setActiveId(newItem.id);
  };

  const handleDeleteProduct = (id) => {
    const updatedList = createdList.filter((item) => item.id !== id);
    setCreatedList(updatedList);
    if (updatedList.length > 0) {
      const nextActiveItem = updatedList[0];
      setActiveId(nextActiveItem.id);
      setActiveItem(nextActiveItem);
    } else {
      setActiveId(null);
      setActiveItem(null);
    }
  };




  const languages = ["uz", "ru", "en"];
  const [activeLang, setActiveLang] = useState(languages[0]);

  return (
    <div className="fixed h-screen flex w-full bg-modalBg z-[9999] inset-0">
      <div className="h-full w-full relative max-w-[300px]">
        <CreatedList
          activeId={activeId}
          activeLang={activeLang}
          createdList={createdList}
          closeModal={closeModal}
          addNewItem={handleAddNews}
          setActiveId={handleChangeActiveId}
          deleteItem={handleDeleteProduct}
        />
      </div>
      <div className="w-full h-full bg-white p-8 overflow-y-scroll no-scrollbar">
        <NewsInfo
        setCreatedList={setCreatedList}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          languages={languages}
          activeLang={activeLang}
          setActiveLang={setActiveLang}
        />
      </div>
    </div>
  );
}
