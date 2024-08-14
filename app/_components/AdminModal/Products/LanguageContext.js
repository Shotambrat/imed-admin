import { createContext, useContext, useState } from "react";

// Создаем контекст
const LanguageContext = createContext();

// Хук для использования контекста
export const useLanguage = () => useContext(LanguageContext);

// Провайдер контекста
export const LanguageProvider = ({ children }) => {
  const [selectedLanguage, setSelectedLanguage] = useState("uz");

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
  };

  return (
    <LanguageContext.Provider value={{ selectedLanguage, handleLanguageChange }}>
      {children}
    </LanguageContext.Provider>
  );
};