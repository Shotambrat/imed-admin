"use client"


import { useState } from "react"

export default function ProductMain() {
    
    //for Product
    const [count, setCount] = useState(2);
    const [product, setProduct] = useState(
        {
            id: 0,
            name: "Product 1",
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
            popular: false
        }
    )
    const [gallery, setGallery] = useState([])
    
    //createdList
    const [createdList, setCreatedList] = useState([{
      ...product, id: 1
    }]);

    const createNewProduct = () => {
      setCount(count + 1);
      const newProduct = {...product, id:count};
      setCreatedList(prev => {
        return [...prev, newProduct];
      })
    }


    console.log(gallery)


  return (
    <div className="fixed h-screen w-full ">
        <div className="h-full w-full relative max-w-[500px]">
            
        </div>
    </div>
  )
}