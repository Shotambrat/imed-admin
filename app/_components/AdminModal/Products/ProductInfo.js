import { useState } from "react";
import ProductPreview from "./ProductPreview";
import ProductCharacteristics from "./ProductCharacteristics";
import Reviews from "./Reviews";

const languages = ["uz", "ru", "en"];

export default function ProductInfo({ product, handleProductChange }) {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const handleLanguageChange = (lang) => {
    setSelectedLanguage(lang);
  };

  return (
    <div className="w-full max-w-[1440px] mx-auto flex flex-col gap-16 px-2">
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
      <ProductPreview
        product={product}
        selectedLanguage={selectedLanguage}
        handleProductChange={handleProductChange}
      />
      <ProductCharacteristics
        product={product}
        selectedLanguage={selectedLanguage}
        handleProductChange={handleProductChange}
      />
      <Reviews
        product={product}
        selectedLanguage={selectedLanguage}
        handleProductChange={handleProductChange}
      />
    </div>
  );
}