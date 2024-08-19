import { useState, useEffect } from "react";
import Image from "next/image";
import mindray from "@/public/images/aboutUs/partners/image58.png";
import arrowred from "@/public/svg/arrow-right-red.svg";
import Modal from "./AttachedFiles";

export default function ProductCharacteristics({
  setCreatedList,
  activeItem,
  setActiveItem,
  languages,
  activeLang,
  setActiveLang,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState([]);
  const [editType, setEditType] = useState(null);

  const files = [
    {
      id: 7,
      name: "7-Zoncare%2",
      size: "6.30 Mb",
      downloadLink:
        "http://213.230.91.55:8130/v1/product/file/7-Zoncare%20Catalog%20--2024.pdf",
    },
    {
      id: 8,
      name: "8-Quotation%2",
      size: "0.27 Mb",
      downloadLink:
        "http://213.230.91.55:8130/v1/product/file/8-Quotation%20for%20Browiner%20X-ray.pdf",
    },
    {
      id: 9,
      name: "9-Perla%20Denta",
      size: "0.18 Mb",
      downloadLink:
        "http://213.230.91.55:8130/v1/product/file/9-Perla%20Dental%20Unit%20Product%20List.pdf",
    },
  ];

  const [modal, setModal] = useState(false);

  const openModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const data = [
    {
      category: "description",
      title: "Описание",
      desc: true,
      data: activeItem.descriptions
        .map(
          (block) =>
            `${block.title[activeLang] || ""}: ${block.value[activeLang] || ""}`
        )
        .join("\n"),
    },
    {
      category: "characteristics",
      title: "Характеристики",
      desc: false,
      data: activeItem.characteristics,
    },
    {
      category: "client",
      title: "Клиент",
      desc: false,
      data: activeItem.clients,
    },
  ];

  const [active, setActive] = useState(data[0].category);
  const [filtered, setFiltered] = useState(data[0]);

  const handleOpenModal = (content = [], type) => {
    const initializedContent = Array.isArray(content)
      ? content.map((block) => ({
          title: { uz: "", ru: "", en: "", ...block.title },
          value: { uz: "", ru: "", en: "", ...block.value },
        }))
      : [
          {
            title: { uz: "", ru: "", en: "" },
            value: { uz: "", ru: "", en: "" },
          },
        ];

    setModalContent(initializedContent);
    setEditType(type);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalContent([]);
    setEditType(null);
  };

  const handleChange = (e, index, field) => {
    const { name, value } = e.target;
    const updatedContent = [...modalContent];
    updatedContent[index][field][name] = value;
    setModalContent(updatedContent);
  };

  const handleAddBlock = () => {
    setModalContent((prevContent) => [
      ...prevContent,
      { title: { uz: "", ru: "", en: "" }, value: { uz: "", ru: "", en: "" } },
    ]);
  };

  const handleRemoveBlock = (index) => {
    const updatedContent = modalContent.filter((_, i) => i !== index);
    setModalContent(updatedContent);
  };

  const handleSave = () => {
    const updatedItem = { ...activeItem };
    if (editType === "description") {
      updatedItem.descriptions = modalContent;
    } else if (editType === "characteristics") {
      updatedItem.characteristics = modalContent;
    } else if (editType === "clients") {
      updatedItem.clients = modalContent;
    }

    // Update the active item state immediately
    setActiveItem(updatedItem);

    // Ensure this update only applies to the current product
    setCreatedList((prevList) =>
      prevList.map((item) => (item.id === activeItem.id ? updatedItem : item))
    );

    handleCloseModal();
  };

  useEffect(() => {
    // Update the filtered data when modal content is saved
    const updatedData = [
      {
        category: "description",
        title: "Описание",
        desc: true,
        data: activeItem.descriptions
          .map(
            (block) =>
              `${block.title[activeLang] || ""}: ${
                block.value[activeLang] || ""
              }`
          )
          .join("\n"),
      },
      {
        category: "characteristics",
        title: "Характеристики",
        desc: false,
        data: activeItem.characteristics,
      },
      {
        category: "client",
        title: "Клиент",
        desc: false,
        data: activeItem.clients,
      },
    ];

    setFiltered(updatedData.find((item) => item.category === active));
  }, [activeItem, activeLang, active]);

  return (
    <div className="w-full flex flex-col gap-5">
      <div className="w-full flex flex-col relative">
        <div className="w-full overflow-x-scroll flex gap-8 lg:gap-12 scrollbar-hide touch-auto">
          {data.slice(0, 3).map((item, index) => (
            <button
              onClick={() => {
                setActive(item.category);
                setFiltered(item);
              }}
              key={index}
              className={`z-10 w-auto text-lg transition-text font-medium ${
                active === item.category
                  ? "text-[#E31E24] border-b-2 border-b-[#E31E24]"
                  : "text-neutral-400"
              }`}
            >
              <h3 className="my-2 whitespace-nowrap">{item.title}</h3>
            </button>
          ))}
        </div>
        <hr className="w-full border-t-2 absolute bottom-0 border-slate-300" />
      </div>
      <div>
        {filtered.desc ? (
          <p className="text-lg leading-5 whitespace-pre-line">
            {filtered.data}
          </p>
        ) : (
          <div className="flex flex-col gap-6 w-full">
            {filtered.category === "characteristics" &&
              filtered.data.map((item, i) => (
                <div key={i} className="w-full flex gap-3">
                  <p className="w-full text-neutral-400 max-w-[100px] md:max-w-[150px] mdx:max-w-[200px] lg:max-w-[400px]">
                    {item.title[activeLang] || ""}
                  </p>
                  <div className="flex w-full flex-col">
                    {item.value[activeLang].split("\n").map((line, j) => (
                      <p key={j}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}

            {filtered.category === "client" && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {filtered.data.map((client, index) => (
                  <div key={index} className="border p-4">
                    <div className="flex flex-col items-center mdx:flex-row">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        className="w-full max-w-[320px] h-auto mb-2 p-5 object-contain lg:max-w-[340px]"
                      />
                      <div className="mt-2">
                        <h3 className="font-bold text-lg mdx:text-2xl mdx:mb-2">
                          {client.name}
                        </h3>
                        <p className="text-[#808080] mdx:mb-4">
                          {client.description}
                        </p>
                        <button className="text-[#E31E24] mt-2 flex items-center">
                          Подробнее{" "}
                          <Image
                            src={arrowred}
                            width={100}
                            height={100}
                            alt="Arrow Icon"
                            className="w-5 h-5"
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-start gap-4 mt-2">
        <button
          className="bg-[#FCE8E9] text-[#E31E24] py-4 px-[30px] font-bold hover:text-[#EE787C]"
          onClick={() =>
            handleOpenModal(activeItem.descriptions, "description")
          }
        >
          Редактировать Описание
        </button>
        <button
          className="bg-[#FCE8E9] text-[#E31E24] py-4 px-[30px] font-bold hover:text-[#EE787C]"
          onClick={() =>
            handleOpenModal(activeItem.characteristics, "characteristics")
          }
        >
          Редактировать Характеристики
        </button>
        <button
          className="bg-[#FCE8E9] text-[#E31E24] py-4 px-[30px] font-bold hover:text-[#EE787C]"
          onClick={() => handleOpenModal(activeItem.clients, "clients")}
        >
          Редактировать Клиенты
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg h-auto">
            <div className="flex justify-end mb-4">
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveLang(lang)}
                  className={`px-4 py-2 text-sm font-semibold ${
                    activeLang === lang
                      ? "bg-redMain text-white"
                      : "bg-white text-black"
                  } border rounded`}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <h2 className="text-2xl mb-4">
              {editType === "description"
                ? "Описание товара"
                : editType === "characteristics"
                ? "Характеристики товара"
                : "Клиент"}
            </h2>
            {Array.isArray(modalContent) &&
              modalContent.map((block, index) => (
                <div key={index} className="mb-6 border-b pb-4">
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Заголовок ({activeLang})
                    </label>
                    <input
                      type="text"
                      name={activeLang}
                      value={block.title[activeLang] || ""}
                      onChange={(e) => handleChange(e, index, "title")}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">
                      Описание ({activeLang})
                    </label>
                    <textarea
                      name={activeLang}
                      value={block.value[activeLang] || ""}
                      onChange={(e) => handleChange(e, index, "value")}
                      className="w-full p-2 border border-gray-300 rounded"
                    />
                  </div>
                  <button
                    onClick={() => handleRemoveBlock(index)}
                    className="py-2 px-4 bg-red-500 text-white rounded"
                  >
                    Удалить блок
                  </button>
                </div>
              ))}
            <button
              onClick={handleAddBlock}
              className="py-2 px-4 bg-blue-500 text-white rounded mb-4"
            >
              Добавить блок
            </button>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleSave}
                className="py-2 px-4 bg-blue-500 text-white rounded"
              >
                Сохранить
              </button>
              <button
                onClick={handleCloseModal}
                className="py-2 px-4 bg-gray-300 text-black rounded"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-start mt-2">
        <button
          className="bg-[#FCE8E9] text-[#E31E24] py-4 px-[30px] font-bold hover:text-[#EE787C]"
          onClick={openModal}
        >
          Прикрепить файлы
        </button>
      </div>
      {modal && (
        <Modal
          setCreatedList={setCreatedList}
          activeItem={activeItem}
          setActiveItem={setActiveItem}
          closeModal={closeModal}
        />
      )}
    </div>
  );
}
