export default function LanguageSwitcher({ currentLang, onLangChange }) {
    return (
      <div className="flex gap-4 mb-4">
        <button
          className={`py-1 px-3 rounded ${currentLang === 'uz' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => onLangChange('uz')}
        >
          Uzbek
        </button>
        <button
          className={`py-1 px-3 rounded ${currentLang === 'ru' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => onLangChange('ru')}
        >
          Russian
        </button>
        <button
          className={`py-1 px-3 rounded ${currentLang === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          onClick={() => onLangChange('en')}
        >
          English
        </button>
      </div>
    );
  }