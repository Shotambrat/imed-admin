"use client";
import { useState } from "react";
import CreatedList from "../CreateList/CreatedList";
import NewsInfo from "./NewsInfo";
import { DNA } from "react-loader-spinner";
import axios from "axios";

export default function NewsMain({ closeModal }) {
  const [idCounter, setIdCounter] = useState(2);
  const [activeId, setActiveId] = useState(1);
  const [loading, setLoading] = useState(false);

  const emptyItem = {
    head: {
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
    id: 1,
  };

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

  const handleSaveAllItems = async () => {
    setLoading(true);
    try {
      // Логин и получение токена
      const authFormData = new FormData();
      authFormData.append("username", "nasiniemsin");
      authFormData.append("password", "2x2=xx");

      const authResponse = await axios.post(
        "http://213.230.91.55:8130/v1/auth/login",
        authFormData
      );

      const token = authResponse.data.data.token;

      for (const item of createdList) {
        const formData = new FormData();

        const json = {
          head: {
            heading: item.head.heading,
            text: item.head.text,
          },
          newOptions: item.newOption.map((option) => ({
            heading: option.heading,
            text: option.text,
            orderNum: option.orderNum,
          })),
        };

        formData.append("json", JSON.stringify(json));

        // Добавление основного изображения
        if (item.head.image.length > 0 && item.head.image[0] instanceof File) {
          formData.append("main-photo", item.head.image[0]);
        }

        // Добавление изображений для опций
        item.newOption.forEach((option) => {
          if (option.image.length > 0 && option.image[0] instanceof File) {
            formData.append(`block-index-${option.orderNum}`, option.image[0]);
          }
        });

        let response = await axios.post(
          "http://213.230.91.55:8130/v1/new/create",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("Response", response);
      }
    } catch (error) {
      console.error("Ошибка при сохранении элементов:", error);
      alert("Произошла ошибка при сохранении.");
    } finally {
      setLoading(false);
    }
  };

  const languages = ["uz", "ru", "en"];
  const [activeLang, setActiveLang] = useState(languages[0]);

  return (
    <div className="fixed h-screen flex w-full bg-modalBg z-[999] inset-0">
      {loading && (
        <div className="fixed h-screen w-full inset-0 flex justify-center items-center bg-subModal z-[9999]">
          <DNA
            visible={true}
            height="120"
            width="120"
            ariaLabel="dna-loading"
            wrapperStyle={{}}
            wrapperClass="dna-wrapper"
          />
        </div>
      )}
      <div className="h-full w-full relative max-w-[300px]">
        <CreatedList
          activeId={activeId}
          activeLang={activeLang}
          createdList={createdList}
          closeModal={closeModal}
          addNewItem={handleAddNews}
          setActiveId={handleChangeActiveId}
          deleteItem={handleDeleteProduct}
          handleSave={handleSaveAllItems}
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