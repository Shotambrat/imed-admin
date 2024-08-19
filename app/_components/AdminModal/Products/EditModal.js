import { useState, useEffect } from "react";

export default function EditModal({ filtered, activeLang, onSave, onClose }) {
  const [localData, setLocalData] = useState(filtered.data);

  useEffect(() => {
    setLocalData(filtered.data);
  }, [filtered]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocalData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleArrayChange = (index, e) => {
    const { name, value } = e.target;
    const newData = [...localData];
    newData[index][name][activeLang] = value;
    setLocalData(newData);
  };

  const handleClientSelection = (clientId) => {
    const newClients = [...localData];
    const clientIndex = newClients.findIndex((client) => client.id === clientId);

    if (clientIndex >= 0) {
      newClients.splice(clientIndex, 1);
    } else {
      newClients.push({ id: clientId });
    }

    setLocalData(newClients);
  };

  const handleSave = () => {
    // Убедитесь, что вы правильно обновляете состояние в activeItem и setCreatedList
    setCreatedList((prevList) =>
      prevList.map((item) =>
        item.id === localData.id ? { ...item, ...localData } : item
      )
    );
    setActiveItem(localData);
    onClose(); // Закрываем модальное окно после сохранения
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-md h-[90%] overflow-y-scroll">
        <h2 className="text-lg font-semibold mb-4">Редактирование</h2>
        {filtered.category === 'description' ? (
          <textarea
            name="description"
            value={typeof localData === 'string' ? localData : localData[activeLang]}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          />
        ) : filtered.category === 'characteristics' ? (
          localData.map((item, i) => (
            <div key={i} className="mb-4">
              <label className="block text-sm font-medium mb-2">{item.title[activeLang]}</label>
              <input
                type="text"
                name="value"
                value={item.value[activeLang]}
                onChange={(e) => handleArrayChange(i, e)}
                className="w-full p-2 border border-gray-300 rounded"
              />
            </div>
          ))
        ) : (
          <div>
            {localData.map((client) => (
              <div key={client.id} className="mb-4">
                <label className="block text-sm font-medium mb-2">
                  <input
                    type="checkbox"
                    checked={localData.some((c) => c.id === client.id)}
                    onChange={() => handleClientSelection(client.id)}
                  />
                  {client.name}
                </label>
              </div>
            ))}
          </div>
        )}
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