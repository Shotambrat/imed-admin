"use client";

import { useState } from "react";
import Image from "next/image";
import defaultImage from "@/public/admin/default-image.svg";
import close from "@/public/svg/close.svg";
import backIcon from "@/public/admin/arrow-red-left.svg";

export default function CreatedList({ closeModal, emptyItem }) {
  const [count, setCount] = useState(2);
  const [createdList, setCreatedList] = useState([
    {
      ...emptyItem,
      id: 1,
    },
  ]);
  const [activeItem, setActiveItem] = useState(
    (createdList[0] && createdList[0].id) || 1
  );

  const createNewItem = () => {
    setCount(count + 1);
    const newItem = { ...emptyItem, id: count };
    setCreatedList((prev) => [...prev, newItem]);
    setActiveItem(count);
  };

  const deleteItem = (id) => {
    setCreatedList((prev) => prev.filter((item) => item.id !== id));
    if (id === activeItem) {
      setActiveItem(prev[0]?.id || null);
    }
  };

  const handleItemChange = (id, updatedData) => {
    setCreatedList((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...updatedData } : item))
    );
  };

  return (
    <div className="h-full w-full absolute inset-0 bg-snowy flex flex-col gap-8 justify-between pt-4">
      <div className="flex flex-col gap-6 w-full px-3 items-start">
        <button
          onClick={() => closeModal(false)}
          className="items-center flex justify-start gap-2 hover:gap-4 transition-all duration-200 text-redMain text-xl font-semibold"
        >
          <Image
            src={backIcon}
            width={100}
            height={100}
            alt="Back Icon"
            className="h-4 w-4"
          />
          <p>Back</p>
        </button>
        <div className="flex flex-col gap-2 overflow-y-scroll no-scrollbar w-full">
          {createdList.map((item) => (
            <button
              key={item.id}
              className={`${
                item.id == activeItem
                  ? "bg-red-100 border border-redMain"
                  : "bg-white"
              } p-2 relative flex justify-start w-full gap-2 h-24`}
              onClick={() => setActiveItem(item.id)}
            >
              <button
                onClick={() => deleteItem(item.id)}
                className="absolute w-5 h-5 top-1 right-1"
              >
                <Image
                  src={close}
                  width={100}
                  height={100}
                  alt="Close Icon"
                  className="w-full h-full"
                />
              </button>
              <div className="bg-white w-32 h-full flex items-center justify-center">
                <Image
                  src={
                    item.gallery.length === 0
                      ? defaultImage
                      : item.gallery[0]
                  }
                  width={100}
                  height={100}
                  alt={`Created List Preview Image ${item.id}`}
                  className="h-full w-full"
                />
              </div>
              <div className="h-full w-full overflow-x-hidden flex flex-col justify-center items-start">
                <h2 className="overflow-x-hidden whitespace-nowrap w-full font-semibold text-start">
                  {item.name || "Новый товар"}
                </h2>
                <p className="text-redMain text-start">Редактировать</p>
              </div>
            </button>
          ))}
        </div>
      </div>
      <div className="w-full bg-white p-3 flex gap-4">
        <button
          onClick={createNewItem}
          className="px-4 py-2 flex gap-2 text-redMain text-sm items-center font-semibold border border-redMain"
        >
          Добавить товар
        </button>
        <button className="px-4 py-2 flex gap-2 text-white bg-redMain text-sm items-center font-semibold">
          Сохранить
        </button>
      </div>
    </div>
  );
}