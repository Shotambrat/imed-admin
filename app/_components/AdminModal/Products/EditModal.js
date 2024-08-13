import { useState } from "react";

export default function EditModal({
  product,
  selectedLanguage,
  onSave,
  onClose,
}) {
  const [localData, setLocalData] = useState({
    name: product.name[selectedLanguage],
    shortDescription: product.shortDescription[selectedLanguage],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    const updatedData = {
      ...product,
      name: {
        ...product.name,
        [selectedLanguage]: localData.name,
      },
      shortDescription: {
        ...product.shortDescription,
        [selectedLanguage]: localData.shortDescription,
      },
    };
    onSave(updatedData);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Редактировать {selectedLanguage.toUpperCase()}</h2>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Название</label>
          <input
            type="text"
            name="name"
            value={localData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Краткое описание
          </label>
          <textarea
            name="shortDescription"
            value={localData.shortDescription}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>
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