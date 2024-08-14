"use client";
import { useState } from "react";
import CreatedList from "../CreateList/CreatedList";
import NewsInfo from "./NewsInfo";

export default function NewsMain({ closeModal }) {
  //Items for CreateList
  const [idCounter, setIdCounter] = useState(2);
  const [activeId, setActiveId] = useState(1);
  const handleChangeActiveId = (id) => {
    setActiveId(id);
    let updatedItem = createdList.filter((item) => {
      item.id == id;
    });
    setActiveItem(updatedItem);
  };

  const emptyItem = {
    head: {
      heading: {
        uz: "dd",
        ru: "dsss",
        en: "",
      },
      text: {
        uz: "",
        ru: "",
        en: "",
      },
      image: [],
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
        image: [],
        orderNum: 1,
      },
    ],
  };

  const [createdList, setCreatedList] = useState([{ ...emptyItem, id: 1 }]);

  const handleAddNews = () => {
    setIdCounter((prevCounter) => prevCounter + 1);
    setCreatedList((prevList) => [
      ...prevList,
      { ...emptyItem, id: idCounter },
    ]);
  };

  const handleDeleteProduct = () => {
    setCreatedList((prevList) => prevList.filter((item) => item.id !== activeId));
    if (activeId === createdList.length) {
      setActiveId(prevList.length - 1);
    } else {
      setActiveId(activeId);
    }
    let updatedItem = createdList.filter((item) => {
      item.id == activeId;
    });
    setActiveItem(updatedItem);
  }

  //Item For NewsInfo
  const [activeItem, setActiveItem] = useState(createdList[0]);

  // Language setting

  const languages = ["uz", "ru", "en"];
  const [activeLang, setActiveLang] = useState(languages[0]);

  const handleLanguageChange = (lang) => {
    setActiveLang(lang);
  };

  return (
    <div className="fixed h-screen flex w-full bg-modalBg z-[9999] inset-0">
      <div className="h-full w-full relative max-w-[300px]">
        <CreatedList
          activeId={activeId}
          activeLang={activeLang}
          createdList={createdList}
          closeModal={closeModal}
          images={createdList.map(item => item.head.image[0])}
          title={createdList.map(item => item.head.heading)}
          addNewItem={handleAddNews}
          setActiveId={setActiveId}
          deleteItem={handleDeleteProduct}
        />
      </div>
      <div className="w-full h-full bg-white p-8 overflow-y-scroll no-scrollbar">
        <NewsInfo />
      </div>
    </div>
  );
}
