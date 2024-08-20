import { useState, useEffect } from "react";
import Image from "next/image";
import arrowred from "@/public/svg/arrow-right-red.svg";
import Modal from "./AttachedFiles";
import axios from "axios";

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
  const [clients, setClients] = useState([]);
  const [selectedClients, setSelectedClients] = useState([]);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    const fetchClients = async () => {
      try {
        const response = await axios.get("https://imed.uz/api/v1/client/all");
        setClients(response.data.data);
      } catch (error) {
        console.error("Error fetching clients:", error);
      }
    };
    fetchClients();
  }, []);

  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  const data = [
    {
      category: "description",
      title: "Описание",
      desc: true,
      data: activeItem.descriptions,
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
    if (type === "clients") {
      setSelectedClients(activeItem.clients.map((client) => client.id));
    } else {
      const initializedContent = content.map((block) => ({
        title: { uz: "", ru: "", en: "", ...block.title },
        value: { uz: "", ru: "", en: "", ...block.value },
      }));
      setModalContent(initializedContent);
    }
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
      updatedItem.clients = clients.filter((client) =>
        selectedClients.includes(client.id)
      );
    }

    setActiveItem(updatedItem);
    setCreatedList((prevList) =>
      prevList.map((item) => (item.id === activeItem.id ? updatedItem : item))
    );
    handleCloseModal();
  };

  const handleCheckboxChange = (clientId) => {
    setSelectedClients((prevSelected) =>
      prevSelected.includes(clientId)
        ? prevSelected.filter((id) => id !== clientId)
        : [...prevSelected, clientId]
    );
  };

  useEffect(() => {
    const updatedData = [
      {
        category: "description",
        title: "Описание",
        desc: true,
        data: activeItem.descriptions,
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
          <div className="flex flex-col gap-4">
            {filtered.data.map((block, index) => (
              <div key={index} className="flex flex-col gap-2">
                <h3 className="font-bold text-lg">{block.title[activeLang]}</h3>
                <p className="text-neutral-500">{block.value[activeLang]}</p>
              </div>
            ))}
          </div>
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
                  <div key={index} className="border p-4 ">
                    <div className="flex-col items-center mdx:flex-row flex gap-6">
                      <Image
                        src={client.logo?.url}
                        alt={client.name}
                        width={50}
                        height={50}
                        className="ml-4"
                      />
                      <div className="mt-2 flex gap-4 flex-col">
                        <h3 className="font-bold text-lg mdx:text-2xl mdx:mb-2">
                          {client.name}
                        </h3>
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
          onClick={() => handleOpenModal(null, "clients")}
        >
          Редактировать Клиенты
        </button>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg w-full max-w-lg h-[90%] overflow-y-scroll">
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
            {editType === "clients" ? (
              <div>
                {clients.map((client) => (
                  <div key={client.id} className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      checked={selectedClients.includes(client.id)}
                      onChange={() => handleCheckboxChange(client.id)}
                    />
                    <Image
                      src={client.logo?.url}
                      alt={client.name}
                      width={50}
                      height={50}
                      className="ml-4"
                    />
                    <span className="ml-4">{client.name}</span>
                  </div>
                ))}
              </div>
            ) : (
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
              ))
            )}
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