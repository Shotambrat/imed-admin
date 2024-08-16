"use client";
import { useState } from "react";
import CreatedList from "./CreatedList";
import { DNA } from "react-loader-spinner";
import axios from "axios";
import PartnersInfo from "./PartnersInfo";

export default function NewsMain({ closeModal }) {
  const [idCounter, setIdCounter] = useState(2);
  const [activeId, setActiveId] = useState(1);
  const [loading, setLoading] = useState(false);

  const emptyItem = {
    name: '',
    note: {
        uz: '',
        ru: '',
        en: '',
      },
    about: {
        uz: '',
        ru: '',
        en: '',
      },
    website: "",
    image: [],
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
        const authFormData = new FormData();
        authFormData.append("username", 'nasiniemsin');
        authFormData.append("password", '2x2=xx');

        let authRes = await axios.post("http://213.230.91.55:8130/v1/auth/login", 
            authFormData
        )

        const token = authRes.data.data.token

        for (const item of createdList) {
            const formData = new FormData();

            const json = {
                name: item.name,
                note: {
                    uz: item.note.uz,
                    ru: item.note.ru,
                    en: item.note.en,
                },
                about: {
                    uz: item.about.uz,
                    ru: item.about.ru,
                    en: item.about.en,
                },
                website: item.website,
            }

            formData.append("json", JSON.stringify(json));
    
            formData.append("photo", item.image[0]);
    
            let response = await axios.post(
                "http://213.230.91.55:8130/v1/partner/create",
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${token}`,
                  },
                }
              );

              console.log("RES", response.data.message)
        }
    } catch (err) {
        console.log(err);
        alert('Что-то было заполнено не полностью')
    } finally {
        setTimeout(() => {
            setLoading(false);
          }, 3000);
      
    }
    }

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
        <PartnersInfo
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