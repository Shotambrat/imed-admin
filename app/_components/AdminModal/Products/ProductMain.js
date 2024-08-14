"use client"
import { useState } from "react";
import CreatedList from "../CreateList/CreatedList";
import ProductInfo from "./ProductInfo";

export default function ProductMain({ closeModal }) {

  // const emptyItem = {
  //   id: Date.now(),
  //   name: { uz: "", ru: "", en: "" },
  //   new: false,
  //   sale: false,
  //   shortDescription: { uz: "", ru: "", en: "" },
  //   discount: 0,
  //   originalPrice: 0,
  //   conditions: { uz: "", ru: "", en: "" },
  //   technical: true,
  //   brand: { id: 1 },
  //   category: { id: 1 },
  //   catalog: { id: 1 },
  //   active: true,
  //   popular: false,
  //   gallery: [],
  // };

  // const [createdList, setCreatedList] = useState([emptyItem]);

  // const [activeProductId, setActiveProductId] = useState(emptyItem.id);

  // const handleProductChange = (id, updatedData) => {
  //   setCreatedList((prevList) =>
  //     prevList.map((product) => (product.id === id ? updatedData : product))
  //   );
  // };

  // const handleAddProduct = () => {
  //   const newProduct = { ...emptyItem, id: Date.now() };
  //   setCreatedList((prevList) => [...prevList, newProduct]);
  //   setActiveProductId(newProduct.id);
  // };

  // const handleDeleteProduct = (id) => {
  //   const updatedList = createdList.filter((product) => product.id !== id);
  //   setCreatedList(updatedList);
  //   if (id === activeProductId) {
  //     setActiveProductId(updatedList[0]?.id || null);
  //   }
  // };

  return (
    <div className="fixed h-screen flex w-full bg-modalBg z-[9999] inset-0">
      {/* <div className="h-full w-full relative max-w-[300px]">
        <CreatedList
          items={createdList}
          emptyItem={emptyItem} // Передаем пустой элемент в CreatedList
          activeId={activeProductId}
          setActiveId={setActiveProductId}
          onAdd={handleAddProduct}
          onDelete={handleDeleteProduct}
          closeModal={closeModal}
        />
      </div>
      <div className="w-full h-full bg-white p-8 overflow-y-scroll no-scrollbar">
        <ProductInfo
          product={createdList.find((p) => p.id === activeProductId)}
          handleProductChange={handleProductChange} 
        />
      </div> */}
    </div>
  );
}