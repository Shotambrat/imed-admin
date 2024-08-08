"use client"


import { useState } from "react"

export default function ProductMain() {
    const [product, setProduct] = useState(
        {
            id: 1,
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
                    
                }
            ]
        }
    )

    const [Gallery, setGallery] = useState([])


  return (
    <div className="fixed h-screen w-full ">
        <div className="h-full w-full relative max-w-[500px]">
            
        </div>
    </div>
  )
}



{
    "name": "abc",
    "tagUz": [
      "uz 1","uz 2"
    ],
    "tagRu": [
      "ru 1","ru 2"
    ],
    "tagEn": [
      "en 1","en 2"
    ],
    "shortDescriptionUz": "sfewa",
    "shortDescriptionRu": "wrfqa",
    "shortDescriptionEn": "wjibfq",
    "descriptions": [
      {
        "titleUz": "skjcdb",
        "titleRu": "awref",
        "titleEn": "wqrg",
        "valueUz": "ergyeq",
        "valueRu": "aw4gy",
        "valueEn": "w45y"
      }
    ],
    "discount": null,
    "originalPrice": null,
    "conditionsUz": "qwefqq",
    "conditionsRu": "3t5q",
    "conditionsEn": "ergta",
    "brand": {
      "id": 1
    },
    "catalog": {
      "id": 1
    },
    "category": {
      "id": 1
    },
    "characteristics": [
      {
        "titleUz": "ddifj",
        "titleRu": "egwa",
        "titleEn": "stga",
        "valueUz": "32tq",
        "valueRu": "gfbrsw",
        "valueEn": "owefno"
      }
    ],
    "reviews": [
      {
        "nameDoctorUz": "sdjbc",
        "nameDoctorRu": "aojnsc",
        "nameDoctorEn": "sldkcn",
        "positionUz": "woidjo",
        "positionRu": "dqowndo",
        "positionEn": "doswin",
        "options": [
          {
            "titleUz": "aspodpoqjqpo",
            "titleRu": "aspodpoqjqpo",
            "titleEn": "aspodpoqjqpo",
            "valueUz": "aspodpoqjqpo",
            "valueRu": "aspodpoqjqpo",
            "valueEn": "aspodpoqjqpo"
          }
        ]
      }
    ],
    "active": true,
    "popular": true
  }