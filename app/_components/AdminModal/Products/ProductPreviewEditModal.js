import { useState, useEffect } from "react";

export default function ProductPreviewEditModal({
  product,
  onClose,
  onSave,
}) {
  const [currentLanguage, setCurrentLanguage] = useState("uz");
  const [localData, setLocalData] = useState(product);

  useEffect(() => {
    // Обновляем состояние при смене языка
    setLocalData((prevData) => ({
      ...prevData,
      name: {
        ...prevData.name,
        [currentLanguage]: prevData.name[currentLanguage],
      },
      shortDescription: {
        ...prevData.shortDescription,
        [currentLanguage]: prevData.shortDescription[currentLanguage],
      },
      conditions: {
        ...prevData.conditions,
        [currentLanguage]: prevData.conditions[currentLanguage],
      },
    }));
  }, [currentLanguage]);

  const handleLanguageChange = (lang) => {
    setCurrentLanguage(lang);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? e.target.checked : value;
    setLocalData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));
  };

  const handleLocalizedChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prevData) => ({
      ...prevData,
      [name]: {
        ...prevData[name],
        [currentLanguage]: value,
      },
    }));
  };

  const handleSave = () => {
    onSave(localData);
  };

  // Calculating the final price if promotion is active
  const finalPrice =
    localData.sale && localData.discount > 0
      ? Math.round(localData.originalPrice * (1 - localData.discount / 100))
      : localData.originalPrice;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <div className="flex gap-4 mb-4">
          {["uz", "ru", "en"].map((lang) => (
            <button
              key={lang}
              onClick={() => handleLanguageChange(lang)}
              className={`px-4 py-2 text-sm font-semibold ${
                currentLanguage === lang ? "bg-redMain text-white" : "bg-white"
              } border ${
                currentLanguage === lang ? "border-redMain" : "border-gray-300"
              } rounded`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        {/* Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Название</label>
          <input
            type="text"
            name="name"
            value={localData.name[currentLanguage]}
            onChange={handleLocalizedChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Short Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Краткое описание
          </label>
          <textarea
            name="shortDescription"
            value={localData.shortDescription[currentLanguage]}
            onChange={handleLocalizedChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Price Details */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Цена</label>
          <input
            type="number"
            name="originalPrice"
            value={localData.originalPrice}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Discount (shown only if sale is active) */}
        {localData.sale && (
          <>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Скидка (%)</label>
              <input
                type="number"
                name="discount"
                value={localData.discount}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>

            {/* Final Price */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Цена со скидкой</label>
              <input
                type="number"
                value={finalPrice}
                disabled
                className="w-full p-2 border border-gray-300 rounded bg-gray-100"
              />
            </div>
          </>
        )}

        {/* Conditions */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Условия</label>
          <textarea
            name="conditions"
            value={localData.conditions[currentLanguage]}
            onChange={handleLocalizedChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Maintenance */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Техническая поддержка</label>
          <input
            type="checkbox"
            name="maintenance"
            checked={localData.maintenance}
            onChange={handleChange}
            className="w-4 h-4"
          />
        </div>

        {/* Toggles for New, Sale, Technical, Active, Popular */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Настройки</label>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() =>
                setLocalData((prevData) => ({
                  ...prevData,
                  new: !prevData.new,
                }))
              }
              className={`px-4 py-2 text-sm font-semibold rounded ${
                localData.new ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              Новинка
            </button>
            <button
              onClick={() =>
                setLocalData((prevData) => ({
                  ...prevData,
                  sale: !prevData.sale,
                }))
              }
              className={`px-4 py-2 text-sm font-semibold rounded ${
                localData.sale ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              Распродажа
            </button>
            <button
              onClick={() =>
                setLocalData((prevData) => ({
                  ...prevData,
                  technical: !prevData.technical,
                }))
              }
              className={`px-4 py-2 text-sm font-semibold rounded ${
                localData.technical ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              Технический
            </button>
            <button
              onClick={() =>
                setLocalData((prevData) => ({
                  ...prevData,
                  active: !prevData.active,
                }))
              }
              className={`px-4 py-2 text-sm font-semibold rounded ${
                localData.active ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              Активен
            </button>
            <button
              onClick={() =>
                setLocalData((prevData) => ({
                  ...prevData,
                  popular: !prevData.popular,
                }))
              }
              className={`px-4 py-2 text-sm font-semibold rounded ${
                localData.popular ? "bg-green-500 text-white" : "bg-gray-200"
              }`}
            >
              Популярный
            </button>
          </div>
        </div>

        {/* Brand */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Бренд</label>
          <input
            type="number"
            name="brand"
            value={localData.brand.id}
            onChange={(e) =>
              setLocalData((prevData) => ({
                ...prevData,
                brand: { id: e.target.value },
              }))
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Category */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Категория</label>
          <input
            type="number"
            name="category"
            value={localData.category.id}
            onChange={(e) =>
              setLocalData((prevData) => ({
                ...prevData,
                category: { id: e.target.value },
              }))
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Catalog */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Каталог</label>
          <input
            type="number"
            name="catalog"
            value={localData.catalog.id}
            onChange={(e) =>
              setLocalData((prevData) => ({
                ...prevData,
                catalog: { id: e.target.value },
              }))
            }
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Save/Cancel Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={handleSave}
            className="py-2 px-4 bg-blue-500 text-white rounded"
          >
            Сохранить
          </button>
          <button
            onClick={onClose}
            className="py-2 px-4 bg-gray-300 text-black rounded"
          >
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
}