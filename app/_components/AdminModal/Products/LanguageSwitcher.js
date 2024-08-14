import { useLanguage } from "./LanguageContext";

const languages = ["uz", "ru", "en"];

export default function LanguageSwitcher() {
  const { selectedLanguage, handleLanguageChange } = useLanguage();

  return (
    <div className="flex gap-4 mb-4">
      {languages.map((lang) => (
        <button
          key={lang}
          onClick={() => handleLanguageChange(lang)}
          className={`px-4 py-2 text-sm font-semibold ${
            selectedLanguage === lang ? "bg-redMain text-white" : "bg-white"
          }`}
        >
          {lang.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
