"use client";
import Image from 'next/image';

export default function ClientsTitle({
  activeItem,
  handleFieldChange,
  languages,
  activeLang,
  setActiveLang,
  locations,
  fetchLocations,
}) {
  return (
    <div className="mb-4">
      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Название клиента</label>
        <input
          type="text"
          value={activeItem.name}
          onChange={(e) => handleFieldChange('name', e.target.value)}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Описание</label>
        <textarea
          value={activeItem.description[activeLang]}
          onChange={(e) => handleFieldChange('description', { ...activeItem.description, [activeLang]: e.target.value })}
          className="w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-2">Локация</label>
        <select
          value={activeItem.location?.id || ''}
          onChange={(e) =>
            handleFieldChange('location', locations.find(loc => loc.id === parseInt(e.target.value)))
          }
          className="w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Выберите локацию</option>
          {locations.map((location) => (
            <option key={location.id} value={location.id}>
              {location.city}, {location.country}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}