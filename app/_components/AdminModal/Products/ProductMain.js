"use client";
import { useState } from "react";
import CreatedList from "./CreatedList";
import ProductInfo from "./ProductInfo";
import { DNA } from "react-loader-spinner";
import axios from "axios";
import { Description } from "@headlessui/react";

export default function ProductMain({ closeModal }) {
  const [idCounter, setIdCounter] = useState(2);
  const [activeId, setActiveId] = useState(1);
  const [loading, setLoading] = useState(false);

  const emptyItem = {
    id: 1,
    name: "",
    new: false,
    sale: false,
    shortDescription: { uz: "", ru: "", en: "" },
    descriptions: [
      {
        title: {
          uz: "",
          ru: "",
          en: "",
        },
        value: {
          uz: "",
          ru: "",
          en: "",
        },
      },
    ],
    discount: 0,
    originalPrice: 0,
    condition: { uz: "", ru: "", en: "" },
    technical: true,
    brand: { id: 1 },
    category: { id: 1 },
    catalog: { id: 1 },
    clients: [{ id: 1 }],
    characteristics: [
      {
        title: {
          uz: "",
          ru: "",
          en: "",
        },
        value: {
          uz: "",
          ru: "",
          en: "",
        },
      },
    ],
    maintenance: {
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
    },
    active: true,
    popular: false,
    gallery: [],
    videos: [
      {
        url: "",
        title: "",
      },
    ],
    reviewsList: [],
  };

  const [reviews, setReviews] = useState({
    id: new Date(),
    nameDoctor: {
      uz: "",
      ru: "",
      en: "",
    },
    position: {
      uz: "",
      ru: "",
      en: "",
    },
    options: [
      {
        title: {
          uz: "",
          ru: "",
          en: "",
        },
        value: {
          uz: "",
          ru: "",
          en: "",
        },
      },
    ],
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

  const handleSaveAllItems = async () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 3000);
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
        <ProductInfo
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
