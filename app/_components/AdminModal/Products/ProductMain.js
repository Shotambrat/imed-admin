"use client"


import { useState } from "react"
import CreatedList from "../CreateList/CreatedList";
import ProductInfo from "./ProductInfo";

export default function ProductMain({closeModal}) {
    
    //for Product
    const [product, setProduct] = useState(
        {
            id: 0,
            name: "",
            new: false,
            sale: false,
            shortDescriptionUz: "",
            shortDescriptionRu: "",
            shortDescriptionEn: "",
            description: [
                {
                    titleUz: "",
                    titleRu: "",
                    titleEn: "",
                    valueUz: "",
                    valueRu: "",
                    valueEn: "",
                }
            ],
            discount: 0,
            originalPrice: 0,
            conditionsUz: "",
            conditionsRu: "",
            conditionsEn: "",
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
                  titleUz: "",
                  titleRu: "",
                  titleEn: "",
                  valueUz: "",
                  valueRu: "",
                  valueEn: "",
                }
            ],
            active: true,
            popular: false,
            gallery: []
        }
    )
    
    //createdList



  return (
    <div className="fixed h-screen flex  w-full bg-modalBg z-[9999] inset-0">
        <div className="h-full w-full relative max-w-[300px] ">
            <CreatedList closeModal={closeModal} emptyItem={product} />
        </div>
        <div className="w-full h-full bg-white p-8 overflow-y-scroll no-scrollbar">
          <ProductInfo product={product} />
        </div>
    </div>
  )
}