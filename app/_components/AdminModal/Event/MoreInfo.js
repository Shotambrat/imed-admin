import { useState } from "react";

export default function MoreInfo({ activeItem, activeLang, setCreatedList, languages }) {
  const [editModal, setEditModal] = useState(false);
  const [formData, setFormData] = useState({
    organizer: activeItem.organizer,
    country: activeItem.country,
    dateFrom: activeItem.dateFrom,
    dateTo: activeItem.dateTo,
    timeFrom: activeItem.timeFrom,
    timeTo: activeItem.timeTo,
    address: activeItem.address,
    participation: activeItem.participation,
    phoneNum: activeItem.phoneNum,
    email: activeItem.email,
  });

  const handleInputChange = (e, field) => {
    const value = e.target.value;
    setFormData((prevData) => ({
      ...prevData,
      [field]: {
        ...prevData[field],
        [activeLang]: value,
      },
    }));
  };

  const handleSave = () => {
    const updatedItem = {
      ...activeItem,
      organizer: formData.organizer,
      country: formData.country,
      dateFrom: formData.dateFrom,
      dateTo: formData.dateTo,
      timeFrom: formData.timeFrom,
      timeTo: formData.timeTo,
      address: formData.address,
      participation: formData.participation,
      phoneNum: formData.phoneNum,
      email: formData.email,
    };

    setCreatedList((prevList) =>
      prevList.map((item) =>
        item.id === activeItem.id ? updatedItem : item
      )
    );
    setEditModal(false);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-4 px-2">
      <div className="xl:flex xl:flex-row xl:gap-2 xl:justify-between">
        <div>
          <h2 className="text-[25px] mdx:text-[33px] xl:text-[39px] font-semibold xl:w-[467px]">
            ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ
          </h2>
        </div>
        <div className="grid grid-cols-2 mt-[30px] gap-x-5 gap-y-5">
          <div className="text-[#808080]">Организатор</div>
          <div>{activeItem.organizer[activeLang]}</div>

          <div className="text-[#808080]">Страна проведения</div>
          <div>{activeItem.country[activeLang]}</div>

          <div className="text-[#808080]">Дата</div>
          <div>
            {activeItem.dateFrom[activeLang]} - {activeItem.dateTo[activeLang]}
          </div>

          <div className="text-[#808080]">Время</div>
          <div>
            {activeItem.timeFrom} - {activeItem.timeTo}
          </div>

          <div className="text-[#808080]">Адрес</div>
          <div>{activeItem.address[activeLang]}</div>

          <div className="text-[#808080]">Стоимость участия</div>
          <div>{activeItem.participation[activeLang]}</div>

          <div className="text-[#808080]">Контактный телефон</div>
          <div>{activeItem.phoneNum}</div>

          <div className="text-[#808080]">Контактный E-mail</div>
          <div>{activeItem.email}</div>
        </div>
      </div>

      <button
        onClick={() => setEditModal(true)}
        className="mt-4 w-full mdx:max-w-[296px] bg-[#E94B50] hover:bg-[#EE787C] py-3 px-4 text-white"
      >
        Редактировать
      </button>

      {editModal && (
        <div className="fixed inset-0 h-screen w-full bg-modalBg flex justify-center items-center z-[999]">
          <div className="w-full max-w-[500px] relative flex flex-col gap-8 px-4 bg-white py-8 h-[90%] overflow-y-scroll no-scrollbar">
            <button
              onClick={() => setEditModal(false)}
              className="absolute top-2 right-2 text-2xl font-bold"
            >
              X
            </button>
            <div className="flex gap-4">
              {languages.map((lang, index) => (
                <button
                  key={index}
                  className={`font-medium border px-4 pt-1 pb-2 rounded-lg text-xl border-red-300 ${
                    lang === activeLang ? "bg-redMain text-white" : ""
                  }`}
                  onClick={() => setActiveLang(lang)}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
            <div className="flex flex-col gap-4">
              <label>
                Организатор
                <input
                  type="text"
                  value={formData.organizer[activeLang]}
                  onChange={(e) => handleInputChange(e, "organizer")}
                  className="border border-gray-300 rounded-md w-full p-2 mt-2"
                />
              </label>
              <label>
                Страна проведения
                <input
                  type="text"
                  value={formData.country[activeLang]}
                  onChange={(e) => handleInputChange(e, "country")}
                  className="border border-gray-300 rounded-md w-full p-2 mt-2"
                />
              </label>
              <label>
                Дата начала
                <input
                  type="text"
                  value={formData.dateFrom[activeLang]}
                  onChange={(e) => handleInputChange(e, "dateFrom")}
                  className="border border-gray-300 rounded-md w-full p-2 mt-2"
                />
              </label>
              <label>
                Дата окончания
                <input
                  type="text"
                  value={formData.dateTo[activeLang]}
                  onChange={(e) => handleInputChange(e, "dateTo")}
                  className="border border-gray-300 rounded-md w-full p-2 mt-2"
                />
              </label>
              <label>
                Время начала
                <input
                  type="text"
                  value={formData.timeFrom}
                  onChange={(e) => setFormData({ ...formData, timeFrom: e.target.value })}
                  className="border border-gray-300 rounded-md w-full p-2 mt-2"
                />
              </label>
              <label>
                Время окончания
                <input
                  type="text"
                  value={formData.timeTo}
                  onChange={(e) => setFormData({ ...formData, timeTo: e.target.value })}
                  className="border border-gray-300 rounded-md w-full p-2 mt-2"
                />
              </label>
              <label>
                Адрес
                <input
                  type="text"
                  value={formData.address[activeLang]}
                  onChange={(e) => handleInputChange(e, "address")}
                  className="border border-gray-300 rounded-md w-full p-2 mt-2"
                />
              </label>
              <label>
                Стоимость участия
                <input
                  type="text"
                  value={formData.participation[activeLang]}
                  onChange={(e) => handleInputChange(e, "participation")}
                  className="border border-gray-300 rounded-md w-full p-2 mt-2"
                />
              </label>
              <label>
                Контактный телефон
                <input
                  type="text"
                  value={formData.phoneNum}
                  onChange={(e) => setFormData({ ...formData, phoneNum: e.target.value })}
                  className="border border-gray-300 rounded-md w-full p-2 mt-2"
                />
              </label>
              <label>
                Контактный E-mail
                <input
                  type="text"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="border border-gray-300 rounded-md w-full p-2 mt-2"
                />
              </label>
            </div>
            <button
              className="px-12 py-3 bg-redMain text-white"
              onClick={handleSave}
            >
              Сохранить
            </button>
          </div>
        </div>
      )}
    </div>
  );
}