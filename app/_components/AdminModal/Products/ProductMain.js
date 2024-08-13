"use client";

import { useState } from "react";
import CreatedList from "../CreateList/CreatedList";
import ProductInfo from "./ProductInfo";
import ProductEditModal from "./EditModal"; // Импортируем новый компонент

export default function ProductMain({ closeModal }) {
  const [product, setProduct] = useState({
    id: 0,
    name: "",
    new: false,
    sale: false,
    shortDescription: {
      uz: "",
      ru: "",
      en: "",
    },
    description: [
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
        }
      }
    ],
    discount: 0,
    originalPrice: 0,
    conditions: {
      uz: "",
      ru: "",
      en: "",
    },
    technical: true,
    brand: {
      id: 1
    },
    category: {
      id: 1
    },
    catalog: {
      id: 1
    },
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
        }
      }
    ],
    active: true,
    popular: false,
    gallery: []
  });

  const [showEditModal, setShowEditModal] = useState(false);
  const [editType, setEditType] = useState(null); // Для определения, какой модал открыт

  const handleEditClick = (type) => {
    setEditType(type);
    setShowEditModal(true);
  };

  return (
    <div className="fixed h-screen flex w-full bg-modalBg z-[9999] inset-0">
      <div className="h-full w-full relative max-w-[300px]">
        <CreatedList closeModal={closeModal} emptyItem={product} />
      </div>
      <div className="w-full h-full bg-white p-8 overflow-y-scroll no-scrollbar">
        <ProductInfo product={product} onEditClick={handleEditClick} />
        {showEditModal && (
          <ProductEditModal
            type={editType}
            product={product}
            onClose={() => setShowEditModal(false)}
            onSave={(updatedProduct) => setProduct(updatedProduct)}
          />
        )}
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




