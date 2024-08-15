"use client";
import { useState } from "react";
import CreatedList from "./CreatedList";
import EventInfo from "./EventInfo";
import { DNA } from "react-loader-spinner";
import axios from "axios";

export default function EventMain({ closeModal }) {
  const [idCounter, setIdCounter] = useState(2);
  const [activeId, setActiveId] = useState(1);
  const [loading, setLoading] = useState(false);

  const emptyItem = {
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
  };

  const [createdList, setCreatedList] = useState([{ ...emptyItem }]);
  const [activeItem, setActiveItem] = useState(createdList[0]);

  const handleChangeActiveId = (id) => {
    const updatedItem = createdList.find((item) => item.id === id);
    setActiveId(id);
    setActiveItem(updatedItem);
  };

  const handleAddEvent = () => {
    const newItem = { ...emptyItem, id: idCounter };
    setIdCounter((prevCounter) => prevCounter + 1);
    setCreatedList((prevList) => [...prevList, newItem]);
    setActiveItem(newItem);
    setActiveId(newItem.id);
  };

  const handleDeleteEvent = (id) => {
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
      // Получаем токен
      const authFormData = new FormData();
      authFormData.append("username", 'nasiniemsin');
      authFormData.append("password", '2x2=xx');

      const authResponse = await axios.post(
        "http://213.230.91.55:8130/v1/auth/login",
        authFormData
      );

      const token = authResponse.data.data.token;

      for (const item of createdList) {
        const formData = new FormData();

        const json = {
          name: item.name,
          abouts: item.abouts,
          organizer: item.organizer,
          country: item.country,
          dateFrom: item.dateFrom,
          dateTo: item.dateTo,
          timeFrom: item.timeFrom,
          timeTo: item.timeTo,
          address: item.address,
          participation: item.participation,
          phoneNum: item.phoneNum,
          email: item.email,
        };

        formData.append("json", JSON.stringify(json));

        // Добавление фото как Blob или File
        if (item.photo.length > 0 && item.photo[0] instanceof File) {
          formData.append("photo", item.photo[0]);
        }

        let response = await axios.post(
          "http://213.230.91.55:8130/v1/event/create",
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
      console.error("Ошибка при сохранении мероприятий:", error);
      alert("Что заполнено не правильно, повторите позже заново.");
    } finally {
      setLoading(false);
      closeModal(false)
    }
  };

  const languages = ["uz", "ru", "en"];
  const [activeLang, setActiveLang] = useState(languages[0]);

  return (
    <div className="fixed h-screen flex w-full bg-modalBg z-[9999] inset-0">
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
          addNewItem={handleAddEvent}
          setActiveId={handleChangeActiveId}
          deleteItem={handleDeleteEvent}
          handleSave={handleSaveAllItems}
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
