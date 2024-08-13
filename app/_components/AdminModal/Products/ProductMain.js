import { useState } from "react";
import CreatedList from "../CreateList/CreatedList";
import ProductInfo from "./ProductInfo";

export default function ProductMain({ closeModal }) {
  // Состояние для управления списком продуктов
  const [createdList, setCreatedList] = useState([
    {
      id: 1,
      name: { uz: "", ru: "", en: "" },
      new: false,
      sale: false,
      shortDescription: { uz: "", ru: "", en: "" },
      discount: 0,
      originalPrice: 0,
      conditions: { uz: "", ru: "", en: "" },
      technical: true,
      brand: { id: 1 },
      category: { id: 1 },
      catalog: { id: 1 },
      characteristics: [
        {
          title: { uz: "", ru: "", en: "" },
          value: { uz: "", ru: "", en: "" },
        },
      ],
      active: true,
      popular: false,
      gallery: [],
    },
  ]);
  // Состояние для управления активным продуктом
  const [activeProductId, setActiveProductId] = useState(createdList[0].id);

  // Функция для обновления активного продукта
  const handleProductChange = (id, updatedData) => {
    setCreatedList((prevList) =>
      prevList.map((product) => (product.id === id ? updatedData : product))
    );
  };

  return (
    <div className="fixed h-screen flex w-full bg-modalBg z-[9999] inset-0">
      <div className="h-full w-full relative max-w-[300px]">
        <CreatedList
          closeModal={closeModal}
          emptyItem={{
            id: Date.now(), // Уникальный id для нового элемента
            name: { uz: "", ru: "", en: "" },
            new: false,
            sale: false,
            shortDescription: { uz: "", ru: "", en: "" },
            discount: 0,
            originalPrice: 0,
            conditions: { uz: "", ru: "", en: "" },
            technical: true,
            brand: { id: 1 },
            category: { id: 1 },
            catalog: { id: 1 },
            active: true,
            popular: false,
            gallery: [],
          }}
          createdList={createdList}
          setActiveProductId={setActiveProductId} // Устанавливаем активный продукт
        />
      </div>
      <div className="w-full h-full bg-white p-8 overflow-y-scroll no-scrollbar">
        <ProductInfo
          product={createdList.find((p) => p.id === activeProductId)} // Передаем активный продукт в ProductInfo
          handleProductChange={handleProductChange} // Функция для сохранения изменений
        />
      </div>
    </div>
  );
}

// {
//     id: 0,
//     name: "",
//     new: false,
//     sale: false,
//     shortDescriptionUz: "",
//     shortDescriptionRu: "",
//     shortDescriptionEn: "",
//     description: [
//         {
//             titleUz: "",
//             titleRu: "",
//             titleEn: "",
//             valueUz: "",
//             valueRu: "",
//             valueEn: "",
//         }
//     ],
//     discount: 0,
//     originalPrice: 0,
//     conditionsUz: "", 
//     conditionsRu: "",
//     conditionsEn: "",
//     technical: true,
//     brand: {
//         id: 1
//     },
//     category: {
//         id: 1
//     },
//     catalog: {
//         id: 1
//     },
//     characteristics: [
//         {
//           titleUz: "",
//           titleRu: "",
//           titleEn: "",
//           valueUz: "",
//           valueRu: "",
//           valueEn: "",
//         }
//     ],
//     active: true,
//     popular: false,
//     gallery: []
// }




