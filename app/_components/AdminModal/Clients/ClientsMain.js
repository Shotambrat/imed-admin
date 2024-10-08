"use client";
import { useState, useEffect } from "react";
import CreatedList from "./CreatedList";
import ClientsInfo from "./ClientsInfo";
import { DNA } from "react-loader-spinner";
import axios from "axios";

export default function ClientsMain({ closeModal }) {
  const [idCounter, setIdCounter] = useState(2);
  const [activeId, setActiveId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);
  const [createdList, setCreatedList] = useState([]);
  const [activeItem, setActiveItem] = useState(null);
  const languages = ["uz", "ru", "en"];
  const [activeLang, setActiveLang] = useState(languages[0]);

  useEffect(() => {
    fetchLocations();
    initializeEmptyClient();
  }, []);

  useEffect(() => {
    if (createdList.length > 0 && !activeId) {
      const firstItem = createdList[0];
      setActiveItem(firstItem);
      setActiveId(firstItem.id);
    }
  }, [createdList]);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        "http://213.230.91.55:8130/v1/location",
        {
          headers: {
            "Accept-Language": activeLang,
          },
        }
      );
      setLocations(response.data.data);
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoading(false);
    }
  };

  const initializeEmptyClient = () => {
    const emptyClient = {
      id: idCounter,
      name: "",
      description: {
        uz: "",
        ru: "",
        en: "",
      },
      location: null,
      logo: null,
      gallery: [],
    };
    setCreatedList([emptyClient]);
    setActiveItem(emptyClient);
    setIdCounter((prevCounter) => prevCounter + 1);
  };

  const handleChangeActiveId = (id) => {
    const updatedItem = createdList.find((item) => item.id === id);
    setActiveId(id);
    setActiveItem(updatedItem);
  };

  const handleAddClient = () => {
    const newItem = {
      id: idCounter,
      name: "",
      description: {
        uz: "",
        ru: "",
        en: "",
      },
      location: null,
      logo: null,
      gallery: [],
    };
    setCreatedList((prevList) => [...prevList, newItem]);
    setActiveItem(newItem);
    setActiveId(newItem.id);
    setIdCounter((prevCounter) => prevCounter + 1);
  };

  const handleDeleteClient = (id) => {
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

  const updateCreatedList = (updatedItem) => {
    const updatedList = createdList.map((item) =>
      item.id === updatedItem.id ? updatedItem : item
    );
    setCreatedList(updatedList);
  };

  const handleSaveAllClients = async () => {
    const authFormData = new FormData();
    authFormData.append("username", "nasiniemsin");
    authFormData.append("password", "2x2=xx");
    const authResponse = await axios.post(
      "http://213.230.91.55:8130/v1/auth/login",
      authFormData
    );

    const token = authResponse.data.data.token;

    if (!createdList.length) return;
    setLoading(true);
    try {
      for (let client of createdList) {
        const formData = new FormData();
        formData.append(
          "json",
          JSON.stringify({
            name: client.name,
            description: client.description,
            location: { id: client.location?.id || 12 },
          })
        );

        if (client.logo) {
          formData.append("logo", client.logo);
        }

        client.gallery.forEach((file) => {
          formData.append("gallery", file);
        });

        await axios.post("http://213.230.91.55:8130/v1/client", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        });
      }
      console.log("All clients saved successfully");
    } catch (error) {
      alert("Что-то заполнено не до конца, проверьте список добавленных клиентов");
    } finally {
      setLoading(false);
      closeModal(false)
    }
  };

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
          createdList={createdList}
          closeModal={closeModal}
          addNewItem={handleAddClient}
          setActiveId={handleChangeActiveId}
          deleteItem={handleDeleteClient}
          handleSave={handleSaveAllClients}
        />
      </div>
      <div className="w-full h-full bg-white p-8 overflow-y-scroll no-scrollbar">
        {activeItem ? (
          <ClientsInfo
            activeItem={activeItem}
            setActiveItem={setActiveItem}
            updateCreatedList={updateCreatedList}
            languages={languages}
            activeLang={activeLang}
            setActiveLang={setActiveLang}
            locations={locations}
            fetchLocations={fetchLocations}
          />
        ) : (
          <div className="flex justify-center items-center h-full">
            <p>Выберите или добавьте клиента для редактирования.</p>
          </div>
        )}
      </div>
    </div>
  );
}
