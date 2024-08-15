"use client";
import { useState } from "react";
import CreatedList from "./CreatedList";
import EventInfo from "./EventInfo";

export default function EventMain({ closeModal }) {
  const [idCounter, setIdCounter] = useState(2);
  const [activeId, setActiveId] = useState(1);

  const [emptyItem, setEmptyItem] = useState({
    id: 1,
    name: {
      uz: "Товарчи организатори O'zbek tilida",
      ru: "Организатор товаров на русском",
      en: "Product organizer in English",
    },
    abouts: [
      {
        title: {
          uz: "Tadbir haqida sarlavha O'zbek tilida",
          ru: "Заголовок о мероприятии на русском",
          en: "Event about title in English",
        },
        text: {
          uz: "Tadbir haqida matn O'zbek tilida",
          ru: "Текст о мероприятии на русском",
          en: "Event about text in English",
        },
      },
    ],
    organizer: {
      uz: "",
      ru: "",
      en: "",
    },
    country: {
      uz: "",
      ru: "",
      en: "",
    },
    dateFrom: {
      uz: "",
      ru: "",
      en: "",
    },
    dateTo: {
      uz: "",
      ru: "",
      en: "",
    },
    timeFrom: "",
    timeTo: "",
    address: {
      uz: "",
      ru: "",
      en: "",
    },
    participation: {
      uz: "",
      ru: "",
      en: "",
    },
    phoneNum: "",
    email: "",
    photo: [],
  });

  const [createdList, setCreatedList] = useState([{ ...emptyItem }]);
  const [activeItem, setActiveItem] = useState(createdList[0]);

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
        <EventInfo
          setCreatedList={setCreatedList}
          activeId={activeId}
          activeItem={activeItem}
          createdList={createdList}
          activeLang={activeLang}
          setActiveLang={setActiveLang}
          languages={languages}
        />
      </div>
    </div>
  );
}
