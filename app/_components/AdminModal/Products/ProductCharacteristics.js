"use client";
import { useState } from "react";
import Image from "next/image";
import mindray from "@/public/images/aboutUs/partners/image58.png";
import arrowred from "@/public/svg/arrow-right-red.svg";
import EditModal from "./EditModal"; // Импортируем компонент модального окна

export default function ProductCharacteristics({ 
  setCreatedList, 
  activeItem, 
  setActiveItem, 
  languages, 
  activeLang, 
  setActiveLang 
}) {
  const data = [
    {
      category: 'description',
      title: 'Описание',
      desc: true,
      data: activeItem.description.value[activeLang],
    },
    {
      category: 'characteristics',
      title: 'Характеристики',
      desc: false,
      data: activeItem.characteristics,
    },
    {
      category: 'client',
      title: 'Клиенты',
      desc: false,
      data: activeItem.clients,
    },
  ];

  const [active, setActive] = useState(data[0].category);
  const [filtered, setFiltered] = useState(data[0]);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleFilter = (catname) => {
    setActive(catname);
    const filteredArr = data.find((item) => item.category === catname);
    setFiltered(filteredArr);
  };

  const handleEditClick = () => {
    setIsEditModalOpen(true);
  };

  const handleSaveChanges = (updatedData) => {
    const updatedItem = { ...activeItem };

    if (filtered.category === 'description') {
      updatedItem.description.value[activeLang] = updatedData;
    } else if (filtered.category === 'characteristics') {
      updatedItem.characteristics = updatedData;
    } else if (filtered.category === 'client') {
      updatedItem.clients = updatedData;
    }

    setActiveItem(updatedItem);
    setCreatedList((prevList) =>
      prevList.map((item) => (item.id === activeItem.id ? updatedItem : item))
    );
    setIsEditModalOpen(false);
  };

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex flex-col relative">
        <div className="w-full overflow-x-scroll flex gap-8 lg:gap-12 scrollbar-hide touch-auto">
          {data.map((item, index) => {
            return (
              <button
                onClick={() => handleFilter(item.category)}
                key={index}
                className={`z-10 w-auto text-lg transition-text font-medium ${active == item.category
                  ? "text-[#E31E24] border-b-2 border-b-[#E31E24]"
                  : "text-neutral-400"
                  }`}
              >
                <h3 className="my-2 whitespace-nowrap">{item.title}</h3>
              </button>
            );
          })}
        </div>
        <hr className="w-full border-t-2 absolute bottom-0 border-slate-300" />
      </div>
      <div>
        {filtered.desc ? (
          <div>
            <p className="text-lg leading-5">{filtered.data}</p>
            <button 
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded" 
              onClick={handleEditClick}>
              Редактировать Описание
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-6 w-full">
            {filtered.category === 'characteristics' ? (
              filtered.data.map((item, i) => (
                <div key={i} className="w-full flex gap-3">
                  <p className="w-full text-neutral-400 max-w-[100px] md:max-w-[150px] mdx:max-w-[200px] lg:max-w-[400px]">
                    {item.title[activeLang]}
                  </p>
                  <div className="flex w-full flex-col">
                    {item.value[activeLang].map((subitem, j) => (
                      <p key={j}>{subitem}</p>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filtered.data.map((client, index) => (
                  <div key={index} className="border  p-4 ">
                    <div className="flex flex-col items-center mdx:flex-row">
                      <Image src={client.logo} alt={client.name} className="w-full max-w-[320px] h-auto mb-2 p-5 object-contain lg:max-w-[340px]" />
                      <div className="mt-2">
                        <h3 className="font-bold text-lg mdx:text-2xl mdx:mb-2">{client.name}</h3>
                        <p className="text-[#808080] mdx:mb-4">{client.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button 
              className="mt-4 py-2 px-4 bg-blue-500 text-white rounded" 
              onClick={handleEditClick}>
              Редактировать {filtered.category === 'characteristics' ? 'Характеристики' : 'Клиентов'}
            </button>
          </div>
        )}
      </div>
      {isEditModalOpen && (
        <EditModal 
          filtered={filtered} 
          activeLang={activeLang} 
          onSave={handleSaveChanges} 
          onClose={() => setIsEditModalOpen(false)} 
        />
      )}
    </div>
  );
}
